import logging
import functools
from django.db.utils import ProgrammingError
from django.conf import settings
from django.contrib.auth import mixins, get_user_model
from django.utils.translation import gettext_lazy as _
from django.utils.functional import SimpleLazyObject
from django.contrib.auth.middleware import (
    AuthenticationMiddleware as BaseAuthenticationMiddleware,
)
from rest_framework import exceptions
from rest_framework.authentication import (
    TokenAuthentication as BaseTokenAuthentication,
)
from rest_framework_simplejwt.authentication import (
    JWTAuthentication as BaseJWTAuthentication,
)
from django_otp.middleware import OTPMiddleware

logger = logging.getLogger(__name__)
UserModel = get_user_model()


class TokenAuthentication(BaseTokenAuthentication):
    def get_model(self):
        if self.model is not None:
            return self.model
        from karrio.server.user.models import Token

        return Token

    def authenticate(self, request):
        auth = super().authenticate(request)

        if auth is not None:
            user, token = auth
            org_id = getattr(token.organization, "id", None)
            request.org = SimpleLazyObject(
                functools.partial(get_request_org, request, user, org_id)
            )

        return auth


class JWTAuthentication(BaseJWTAuthentication):
    def authenticate(self, request):
        auth = super().authenticate(request)

        if auth is not None:
            user, token = auth
            org_id = token.get("org_id")

            request.otp_is_verified = token.get("is_verified") or False
            request.user = user
            request.org = SimpleLazyObject(
                functools.partial(get_request_org, request, user, org_id)
            )
            if not token.get("is_verified"):
                raise exceptions.AuthenticationFailed(
                    _("Authentication token not verified"), code="otp_not_verified"
                )

        return auth


class AccessMixin(mixins.AccessMixin):
    """Verify that the current user is authenticated."""

    def dispatch(self, request, *args, **kwargs):
        try:
            if not request.user.is_authenticated:
                auth = JWTAuthentication().authenticate(
                    request
                ) or TokenAuthentication().authenticate(request)

                if auth is not None:
                    user, _ = auth
                    request.user = user

        finally:
            request.user = SimpleLazyObject(
                functools.partial(get_request_user, request, request.user)
            )
            return super().dispatch(request, *args, **kwargs)


class AuthenticationMiddleware(BaseAuthenticationMiddleware):
    def process_response(self, request, response):
        if getattr(request, "org", None) is not None:
            response.set_cookie("org_id", getattr(request.org, "id", None))
            response["X-Org-Id"] = getattr(request.org, "id", None)

        return response

    def process_request(self, request):
        super().process_request(request)

        if hasattr(request, "user"):
            request.org = self._get_organization(request)

    def _get_organization(self, request):
        """
        Attempts to find and return an organization using the given validated token.
        """
        if settings.MULTI_ORGANIZATIONS:
            try:
                from karrio.server.orgs.models import Organization

                org_id = request.META.get("HTTP_X_ORG_ID")
                orgs = Organization.objects.filter(users__id=request.user.id)
                org = (
                    orgs.filter(id=org_id).first()
                    if org_id is not None
                    else orgs.filter(is_active=True).first()
                )

                # org was found but is not active
                if (org is not None) and (not org.is_active):
                    raise exceptions.AuthenticationFailed(
                        _("Organization is inactive"), code="organization_inactive"
                    )

                # org id has been passed, but org is None and the are no existing org id affiliated with user
                if (
                    (org_id is not None)
                    and (org is None)
                    and (not orgs.filter(id=org_id).exists())
                ):
                    request.COOKIES.pop("org_id")

                return org
            except ProgrammingError as e:
                pass

        return None


def get_request_org(request, user, default_org_id: str = None):
    """
    Attempts to find and return an organization.
    """
    if settings.MULTI_ORGANIZATIONS:
        try:
            from karrio.server.orgs.models import Organization

            org_id = request.META.get("HTTP_X_ORG_ID") or default_org_id
            orgs = Organization.objects.filter(users__id=user.id)
            org = (
                orgs.filter(id=org_id).first()
                if org_id is not None
                else orgs.filter(is_active=True).first()
            )

            if org is not None and not org.is_active:
                raise exceptions.AuthenticationFailed(
                    _("Organization is inactive"), code="organization_inactive"
                )

            if org is None and org_id is not None:
                raise exceptions.AuthenticationFailed(
                    _("No active organization found with the given credentials"),
                    code="organization_invalid",
                )

            return org
        except ProgrammingError as e:
            pass

        return None


def get_request_user(request, user):
    if not getattr(request, "otp_is_verified", True):
        raise exceptions.AuthenticationFailed(
            _("Authentication token not verified"), code="otp_not_verified"
        )

    user.otp_device = None
    user.is_verified = functools.partial(
        lambda _: getattr(request, "otp_is_verified", True), user
    )

    return user


class TwoFactorAuthenticationMiddleware(OTPMiddleware):
    pass
