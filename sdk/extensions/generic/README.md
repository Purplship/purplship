# purplship.generic

This package is a Generic extension of the [purplship](https://pypi.org/project/purplship) multi carrier shipping SDK.

## Requirements

`Python 3.7+`

## Installation

```bash
pip install purplship.generic
```

## Usage

```python
import purplship
from purplship.mappers.generic.settings import Settings


# Initialize a carrier gateway
canadapost = purplship.gateway["generic"].create(
    Settings(
        ...
    )
)
```

Check the [Purplship Mutli-carrier SDK docs](https://sdk.purplship.com) for Shipping API requests
