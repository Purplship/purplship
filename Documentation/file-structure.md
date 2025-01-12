# Karrio Project Structure

This document provides an overview of the Karrio project's file and folder structure, explaining the role of each major component.

## Root Directory Structure

```markdown
karrio/
├── apps/                  # Application implementations
├── bin/                   # Binary and executable scripts
├── docker/               # Docker configuration files
├── Documentation/        # Project documentation
├── modules/              # Backend Python modules
├── packages/             # Frontend TypeScript/JavaScript packages
├── schemas/              # API schemas and definitions
└── ee/                   # Enterprise Edition specific code
```

## Backend Modules (`/modules`)

```
modules/
├── cli/                  # Command-line interface implementation
├── connectors/          # Shipping carrier integration implementations
├── core/                # Core business logic and shared functionality
├── data/                # Data models and database interactions
├── documents/           # Document generation and management
├── events/              # Event handling and processing
├── graph/               # GraphQL API implementation
├── manager/             # Service management and orchestration
├── orders/              # Order processing and management
├── pricing/             # Pricing and rate calculation
├── proxy/               # API proxy and request handling
├── sdk/                 # Software Development Kit
└── soap/                # SOAP protocol implementations
```

### Module Descriptions

- **cli**: Command-line tools for interacting with Karrio
- **connectors**: Integration modules for various shipping carriers
- **core**: Essential business logic and shared utilities
- **data**: Database models, migrations, and data access layer
- **documents**: Shipping label and documentation generation
- **events**: Event-driven architecture implementation
- **graph**: GraphQL API endpoints and resolvers
- **manager**: Service orchestration and management
- **orders**: Order processing and fulfillment logic
- **pricing**: Shipping rate calculation and pricing logic
- **proxy**: API gateway and request routing
- **sdk**: Developer tools and client libraries
- **soap**: SOAP protocol handlers for carrier integrations

## Frontend Packages (`/packages`)

```
packages/
├── admin/               # Admin interface components
├── core/                # Core frontend utilities
├── hooks/               # React hooks and shared logic
├── insiders/            # Premium features implementation
├── karriojs/           # JavaScript client library
├── lib/                # Shared libraries and utilities
├── trpc/               # tRPC API client implementation
├── types/              # TypeScript type definitions
└── ui/                 # Reusable UI components
```

### Package Descriptions

- **admin**: Administrative interface and dashboard
- **core**: Essential frontend utilities and helpers
- **hooks**: Custom React hooks for common functionality
- **insiders**: Premium/Enterprise features
- **karriojs**: JavaScript SDK for Karrio API
- **lib**: Shared frontend utilities and helpers
- **trpc**: Type-safe API client implementation
- **types**: TypeScript definitions and interfaces
- **ui**: Shared UI component library

## Carrier Extensions (`/modules/connectors`)

The `connectors` directory contains all shipping carrier integrations. Each carrier is implemented as a separate Python package following a standardized structure.

### Carrier Extension Structure

Each carrier extension follows this structure:

```
[carrier_name]/
├── setup.py                 # Package setup and metadata
├── generate                # Schema generation script
├── schemas/               # API schema definitions
│   ├── error_response.json
│   ├── rate_response.json
│   ├── rate_request.json
│   └── ...
└── karrio/
    ├── mappers/          # Karrio abstraction implementations
    │   └── [carrier_name]/
    │       ├── __init__.py
    │       ├── mapper.py      # Data mapping implementation
    │       ├── proxy.py       # API client implementation
    │       └── settings.py    # Carrier settings definition
    ├── providers/        # Carrier-specific implementations
    │   └── [carrier_name]/
    │       ├── __init__.py
    │       ├── address.py     # Address handling
    │       ├── error.py       # Error handling
    │       ├── pickup/        # Pickup operations
    │       │   ├── create.py
    │       │   ├── cancel.py
    │       │   └── update.py
    │       ├── rate.py        # Rating implementation
    │       ├── shipment/      # Shipment operations
    │       │   ├── create.py
    │       │   └── cancel.py
    │       ├── tracking.py    # Tracking implementation
    │       ├── units.py       # Carrier-specific units
    │       └── utils.py       # Utility functions
    └── schemas/          # Generated Python data types
        └── [carrier_name]/
            ├── __init__.py
            ├── error_response.py
            ├── rate_request.py
            ├── rate_response.py
            └── ...

```

## Enterprise Edition (`/ee`)

The Enterprise Edition directory contains premium features and extensions divided into two main submodules: `platform` and `insiders`, each with its own specialized focus.

```markdown
ee/
├── LICENSE              # Enterprise Edition license
├── platform/           # Cloud platform and multi-tenant features (this is a git submodule karrio/platform)
└── insiders/          # Premium backend features and modules (this is a git submodule karrio/insiders)
```

### Insiders Structure (`/ee/insiders`)

The insiders submodule contains premium backend features:

```markdown
ee/insiders/
├── docker/           # Docker configurations
└── modules/         # Premium backend modules
    ├── admin/      # Advanced administration
    ├── apps/       # Application management
    ├── audit/      # Audit logging and tracking
    ├── automation/ # Workflow automation
    ├── cloud/      # Cloud infrastructure
    └── orgs/       # Organization management
```

### Platform Structure (`/ee/platform`)

The platform submodule implements cloud and multi-tenant capabilities:

```markdown
ee/platform/
├── apps/
│   └── cloud/                # Cloud platform web application
│       └── src/
│           ├── app/         # Next.js application structure
│           │   ├── (auth)              # Authentication routes
│           │   ├── (dashboard)         # Dashboard components
│           │   ├── (error)            # Error pages
│           │   ├── (landing)          # Landing pages
│           │   ├── (onboarding)       # Onboarding flows
│           │   └── api/               # API routes
├── modules/
│   └── tenants/            # Multi-tenant backend implementation
│       └── karrio/
│           └── server/
│               └── tenants/
│                   ├── graph/         # GraphQL API
│                   ├── management/    # Management commands
│                   └── migrations/    # Database migrations
├── packages/
│   └── console/           # Cloud console frontend
│       ├── apis/         # API integrations
│       ├── components/   # Shared UI components
│       ├── emails/      # Email templates
│       ├── modules/     # Feature modules
│       │   ├── Admin/
│       │   ├── Auth/
│       │   ├── Console/
│       │   ├── Organizations/
│       │   └── Projects/
│       ├── prisma/     # Database schema and migrations
│       └── types/      # TypeScript definitions
└── schemas/           # API schemas and types
```

### Key Features

- **Multi-tenancy**: Complete tenant isolation and management
- **Cloud Platform**: Managed cloud deployment capabilities
- **Advanced Auth**: Enhanced authentication and authorization
- **Workflow Automation**: Custom workflow and task automation
- **Audit Logging**: Comprehensive system auditing
- **Organization Management**: Advanced org and team features

## Documentation

```markdown
Documentation/
├── PRD.md                    # Product Requirements Document
├── file-structure.md         # This file
└── folder-structure.md       # Detailed folder organization
```

## Notes

- The project follows a modular architecture separating frontend and backend concerns
- Backend modules are Python-based and follow a service-oriented architecture
- Frontend packages are TypeScript/JavaScript-based using React
- Configuration is separated by environment (development, production, etc.)
- Enterprise Edition (ee/) contains premium features and extensions
- Enterprise Edition requires a separate license
- Modules are designed for cloud and multi-tenant deployments
- Integrates with core functionality while maintaining separation
- Includes both backend services and frontend components
- Uses Next.js for the cloud platform interface
- Implements GraphQL APIs for advanced features
