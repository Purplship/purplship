"""karrio.server tenant module URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.urls import path, include
from karrio.server.tenants import admin as tenants_admin


BASE_PATH = getattr(settings, "BASE_PATH", "")
tenants_admin.site.site_url = f"/{BASE_PATH}"

urlpatterns = [
    path(
        BASE_PATH,
        include(
            [
                path("", include("karrio.server.tenants.graph")),
                path("", include("karrio.server.user.views")),
                path("status/", include("health_check.urls")),
                *[path("", include(urls)) for urls in settings.TENANT_ADMIN_API_URLS],
                path("", tenants_admin.site.urls, name="tenants_admin"),
            ]
        ),
        name="karrio:tenants:index",
    ),
]

if "debug_toolbar" in settings.INSTALLED_APPS:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]
