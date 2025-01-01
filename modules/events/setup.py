from setuptools import setup, find_namespace_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="karrio_server_events",
    version="2024.2.15",
    description="Multi-carrier shipping API Events module",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/karrioapi/karrio",
    author="karrio",
    author_email="hello@karrio.io",
    license="Apache-2.0",
    packages=find_namespace_packages(exclude=["tests.*", "tests"]),
    install_requires=["karrio.server.core", "huey"],
    classifiers=[
        "Programming Language :: Python :: 3",
    ],
    zip_safe=False,
)
