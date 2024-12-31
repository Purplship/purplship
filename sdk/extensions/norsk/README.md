
# karrio.norsk

This package is a Norsk Global extension of the [karrio](https://pypi.org/project/karrio) multi carrier shipping SDK.

## Requirements

`Python 3.7+`

## Installation

```bash
pip install karrio.norsk
```

## Usage

```python
import karrio
from karrio.mappers.norsk.settings import Settings


# Initialize a carrier gateway
norsk = karrio.gateway["norsk"].create(
    Settings(
        ...
    )
)
```

Check the [Karrio Mutli-carrier SDK docs](https://docs.karrio.io) for Shipping API requests
