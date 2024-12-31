
"""Warning: This setup.py is only there for git install until poetry support git subdirectory"""
from setuptools import setup, find_namespace_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="karrio.transglobal",
    version="2023.5",
    description="Karrio - Transglobal Express Shipping Extension",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/karrioapi/karrio",
    author="karrio",
    author_email="hello@karrio.io",
    license="Apache-2.0",
    packages=find_namespace_packages(exclude=["tests.*", "tests"]),
    install_requires=["karrio"],
    classifiers=[
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
    ],
    zip_safe=False,
    include_package_data=True,
)
