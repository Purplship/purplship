
# karrio.transglobal

This package is a Transglobal Express extension of the [karrio](https://pypi.org/project/karrio) multi carrier shipping SDK.

## Requirements

`Python 3.7+`

## Installation

```bash
pip install karrio.transglobal
```

## Usage

```python
import karrio
from karrio.mappers.transglobal.settings import Settings


# Initialize a carrier gateway
transglobal = karrio.gateway["transglobal"].create(
    Settings(
        ...
    )
)
```

Check the [Karrio Mutli-carrier SDK docs](https://docs.karrio.io) for Shipping API requests
