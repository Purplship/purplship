
# karrio.morneau

This package is a Groupe Morneau extension of the [karrio](https://pypi.org/project/karrio) multi carrier shipping SDK.

## Requirements

`Python 3.7+`

## Installation

```bash
pip install karrio.morneau
```

## Usage

```python
import karrio
from karrio.mappers.morneau.settings import Settings


# Initialize a carrier gateway
morneau = karrio.gateway["morneau"].create(
    Settings(
        ...
    )
)
```

Check the [Karrio Mutli-carrier SDK docs](https://docs.karrio.io) for Shipping API requests
