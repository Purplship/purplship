
# karrio.freightcomv2

This package is a freightcom v2 extension of the [karrio](https://pypi.org/project/karrio) multi carrier shipping SDK.

## Requirements

`Python 3.7+`

## Installation

```bash
pip install karrio.freightcomv2
```

## Usage

```python
import karrio
from karrio.mappers.freightcomv2.settings import Settings


# Initialize a carrier gateway
freightcomv2 = karrio.gateway["freightcomv2"].create(
    Settings(
        ...
    )
)
```

Check the [Karrio Mutli-carrier SDK docs](https://docs.karrio.io) for Shipping API requests
