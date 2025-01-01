from setuptools import setup, find_namespace_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

with open("karrio/server/VERSION", "r") as v:
    version = v.read().strip()

setup(
    name="karrio_server",
    version=version,
    description="Multi-carrier shipping API",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/karrioapi/karrio-server",
    author="karrio",
    author_email="hello@karrio.io",
    license="Apache-2.0",
    packages=find_namespace_packages("."),
    install_requires=[
        "django",
        "djangorestframework",
        "djangorestframework-simplejwt",
        "django-constance",
        "django-filter",
        "django-picklefield",
        "django-email-verification",
        "django-cors-headers",
        "django-redis",
        "django-two-factor-auth",
        "django-oauth-toolkit",
        "drf-api-tracking",
        "drf-spectacular",
        "dj-database-url",
        "gunicorn",
        "hiredis",
        "uvicorn",
        "jsonfield",
        "more-itertools",
        "requests",
        "posthog",
        "python-decouple",
        "karrio.server.core",
        "sentry-sdk",
        "whitenoise",
    ],
    entry_points={"console_scripts": ["karrio = karrio.server.__main__:main"]},
    classifiers=[
        "Programming Language :: Python :: 3",
    ],
    zip_safe=False,
    include_package_data=True,
)
