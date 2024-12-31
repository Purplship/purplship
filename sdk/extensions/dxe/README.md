
# karrio.dxe

This package is a DX Express extension of the [karrio](https://pypi.org/project/karrio) multi carrier shipping SDK.

## Requirements

`Python 3.7+`

## Installation

```bash
pip install karrio.dxe
```

## Usage

```python
import karrio
from karrio.mappers.dxe.settings import Settings


# Initialize a carrier gateway
dxe = karrio.gateway["dxe"].create(
    Settings(
        ...
    )
)
```

Check the [Karrio Mutli-carrier SDK docs](https://docs.karrio.io) for Shipping API requests
