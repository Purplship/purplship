.
├── .coveragerc
├── .editorconfig
├── .env
├── .github
│   ├── FUNDING.yml
│   ├── ISSUE_TEMPLATE
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── workflows
│       ├── build.yml
│       ├── insiders-build.yml
│       └── tests.yml
├── .gitignore
├── .gitmodules
├── .npmrc
├── .postman
│   └── api
├── .vscode
│   ├── launch.json
│   └── workspace.code-workspace
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── README.md
├── SECURITY.md
├── apps
│   ├── api
│   │   ├── MANIFEST.in
│   │   ├── README.md
│   │   ├── gunicorn-cfg.py
│   │   ├── karrio
│   │   │   └── server
│   │   │       ├── VERSION
│   │   │       ├── __init__.py
│   │   │       ├── __main__.py
│   │   │       ├── asgi.py
│   │   │       ├── settings
│   │   │       │   ├── __init__.py
│   │   │       │   ├── apm.py
│   │   │       │   ├── base.py
│   │   │       │   ├── cache.py
│   │   │       │   ├── constance.py
│   │   │       │   ├── debug.py
│   │   │       │   ├── email.py
│   │   │       │   └── workers.py
│   │   │       ├── static
│   │   │       │   ├── extra
│   │   │       │   │   └── branding
│   │   │       │   │       ├── android-chrome-192x192.png
│   │   │       │   │       ├── android-chrome-512x512.png
│   │   │       │   │       ├── favicon-16x16.png
│   │   │       │   │       ├── favicon-32x32.png
│   │   │       │   │       ├── favicon.ico
│   │   │       │   │       ├── favicon.svg
│   │   │       │   │       ├── icon-inverted.svg
│   │   │       │   │       ├── icon.png
│   │   │       │   │       ├── icon.svg
│   │   │       │   │       ├── logo-inverted.svg
│   │   │       │   │       ├── logo.svg
│   │   │       │   │       └── manifest.json
│   │   │       │   └── karrio
│   │   │       │       ├── carriers
│   │   │       │       │   ├── aramex_icon.svg
│   │   │       │       │   ├── aramex_logo.svg
│   │   │       │       │   ├── australiapost_icon.svg
│   │   │       │       │   ├── australiapost_logo.svg
│   │   │       │       │   ├── canadapost_icon.svg
│   │   │       │       │   ├── canadapost_logo.svg
│   │   │       │       │   ├── canpar_icon.svg
│   │   │       │       │   ├── canpar_logo.svg
│   │   │       │       │   ├── dhl_express_icon.svg
│   │   │       │       │   ├── dhl_express_logo.svg
│   │   │       │       │   ├── dhl_universal_icon.svg
│   │   │       │       │   ├── dhl_universal_logo.svg
│   │   │       │       │   ├── dicom_icon.svg
│   │   │       │       │   ├── dicom_logo.svg
│   │   │       │       │   ├── eshipper_logo.svg
│   │   │       │       │   ├── fedex_icon.svg
│   │   │       │       │   ├── fedex_logo.svg
│   │   │       │       │   ├── freightcom_logo.svg
│   │   │       │       │   ├── purolator_icon.svg
│   │   │       │       │   ├── purolator_logo.svg
│   │   │       │       │   ├── royalmail_icon.svg
│   │   │       │       │   ├── royalmail_logo.svg
│   │   │       │       │   ├── sendle_icon.svg
│   │   │       │       │   ├── sendle_logo.svg
│   │   │       │       │   ├── sf_express_icon.svg
│   │   │       │       │   ├── sf_express_logo.svg
│   │   │       │       │   ├── tnt_icon.svg
│   │   │       │       │   ├── tnt_logo.svg
│   │   │       │       │   ├── ups_icon.svg
│   │   │       │       │   ├── ups_logo.svg
│   │   │       │       │   ├── usps_icon.svg
│   │   │       │       │   ├── usps_international_icon.svg
│   │   │       │       │   ├── usps_international_logo.svg
│   │   │       │       │   ├── usps_logo.svg
│   │   │       │       │   ├── yanwen_icon.svg
│   │   │       │       │   ├── yanwen_logo.svg
│   │   │       │       │   ├── yunexpress_icon.svg
│   │   │       │       │   └── yunexpress_logo.svg
│   │   │       │       ├── css
│   │   │       │       │   ├── login.css
│   │   │       │       │   └── purplship.theme.min.css
│   │   │       │       ├── img
│   │   │       │       │   ├── dashboard.svg
│   │   │       │       │   └── settings.svg
│   │   │       │       └── js
│   │   │       │           ├── karrio.js
│   │   │       │           └── karrio.js.map
│   │   │       ├── templates
│   │   │       │   ├── admin
│   │   │       │   │   └── base_site.html
│   │   │       │   └── openapi
│   │   │       │       └── openapi.html
│   │   │       ├── urls
│   │   │       │   ├── __init__.py
│   │   │       │   └── jwt.py
│   │   │       ├── workers.py
│   │   │       └── wsgi.py
│   │   ├── package.json
│   │   └── setup.py
│   ├── dashboard
│   │   ├── .editorconfig
│   │   ├── .env.sample
│   │   ├── .eslintrc
│   │   ├── .gitattributes
│   │   ├── .gitignore
│   │   ├── next-env.d.ts
│   │   ├── next.config.mjs
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── public
│   │   │   ├── android-chrome-192x192.png
│   │   │   ├── android-chrome-512x512.png
│   │   │   ├── browserconfig.xml
│   │   │   ├── carriers
│   │   │   │   ├── aramex_icon.svg
│   │   │   │   ├── aramex_logo.svg
│   │   │   │   ├── australiapost_icon.svg
│   │   │   │   ├── australiapost_logo.svg
│   │   │   │   ├── bokknight_icon.svg
│   │   │   │   ├── boxknight_logo.svg
│   │   │   │   ├── canadapost_icon.svg
│   │   │   │   ├── canadapost_logo.svg
│   │   │   │   ├── canpar_icon.svg
│   │   │   │   ├── canpar_logo.svg
│   │   │   │   ├── dhl_express_icon.svg
│   │   │   │   ├── dhl_express_logo.svg
│   │   │   │   ├── dhl_poland_icon.svg
│   │   │   │   ├── dhl_poland_logo.svg
│   │   │   │   ├── dhl_universal_icon.svg
│   │   │   │   ├── dhl_universal_logo.svg
│   │   │   │   ├── dicom_icon.svg
│   │   │   │   ├── dicom_logo.svg
│   │   │   │   ├── dpd_icon.svg
│   │   │   │   ├── dpd_logo.svg
│   │   │   │   ├── dpdhl_icon.svg
│   │   │   │   ├── dpdhl_logo.svg
│   │   │   │   ├── easypost_icon.svg
│   │   │   │   ├── easypost_logo.svg
│   │   │   │   ├── eshipper_logo.svg
│   │   │   │   ├── fedex_icon.svg
│   │   │   │   ├── fedex_logo.svg
│   │   │   │   ├── freightcom_logo.svg
│   │   │   │   ├── generic_icon.svg
│   │   │   │   ├── generic_logo.svg
│   │   │   │   ├── geodis_icon.svg
│   │   │   │   ├── geodis_logo.svg
│   │   │   │   ├── gls_icon.svg
│   │   │   │   ├── laposte_icon.svg
│   │   │   │   ├── laposte_logo.svg
│   │   │   │   ├── nationex_icon.svg
│   │   │   │   ├── nationex_logo.svg
│   │   │   │   ├── purolator_icon.svg
│   │   │   │   ├── purolator_logo.svg
│   │   │   │   ├── roadie_icon.svg
│   │   │   │   ├── roadie_logo.svg
│   │   │   │   ├── royalmail_icon.svg
│   │   │   │   ├── royalmail_logo.svg
│   │   │   │   ├── seko_icon.svg
│   │   │   │   ├── sendle_icon.svg
│   │   │   │   ├── sendle_logo.svg
│   │   │   │   ├── sf_express_icon.svg
│   │   │   │   ├── sf_express_logo.svg
│   │   │   │   ├── tnt_icon.svg
│   │   │   │   ├── tnt_logo.svg
│   │   │   │   ├── ups_icon.svg
│   │   │   │   ├── ups_logo.svg
│   │   │   │   ├── usps_icon.svg
│   │   │   │   ├── usps_international_icon.svg
│   │   │   │   ├── usps_international_logo.svg
│   │   │   │   ├── usps_logo.svg
│   │   │   │   ├── yanwen_icon.svg
│   │   │   │   ├── yanwen_logo.svg
│   │   │   │   ├── yunexpress_icon.svg
│   │   │   │   └── yunexpress_logo.svg
│   │   │   ├── favicon-16x16.png
│   │   │   ├── favicon-32x32.png
│   │   │   ├── favicon.ico
│   │   │   ├── favicon.svg
│   │   │   ├── icon-inverted.svg
│   │   │   ├── icon.svg
│   │   │   ├── logo-inverted.svg
│   │   │   ├── logo.png
│   │   │   ├── logo.svg
│   │   │   ├── manifest.json
│   │   │   └── unfold.svg
│   │   ├── sentry.client.config.js
│   │   ├── sentry.edge.config.js
│   │   ├── sentry.server.config.js
│   │   ├── src
│   │   │   ├── app
│   │   │   │   ├── (base)
│   │   │   │   │   ├── (dashboard)
│   │   │   │   │   │   ├── connections
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   ├── rate-sheets
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   └── system
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   ├── create_label
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── developers
│   │   │   │   │   │   │   ├── api
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── apikeys
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── events
│   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── logs
│   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   └── webhooks
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   ├── draft_orders
│   │   │   │   │   │   │   └── [id]
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   ├── manifests
│   │   │   │   │   │   │   ├── create_manifests
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── orders
│   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── create_label
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── create_labels
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── create_shipment
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── settings
│   │   │   │   │   │   │   ├── account
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── addresses
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── organization
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── parcels
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── profile
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── template
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   └── templates
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   ├── shipments
│   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── create_labels
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── trackers
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── workflows
│   │   │   │   │   │       ├── [id]
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       ├── events
│   │   │   │   │   │       │   ├── [id]
│   │   │   │   │   │       │   │   └── page.tsx
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── (embed)
│   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   └── resources
│   │   │   │   │   │       ├── graphiql
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       └── reference
│   │   │   │   │   │           └── page.tsx
│   │   │   │   │   ├── (public)
│   │   │   │   │   │   ├── accept-invite
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── email
│   │   │   │   │   │   │   ├── [token]
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   └── change
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   ├── password
│   │   │   │   │   │   │   └── reset
│   │   │   │   │   │   │       ├── done
│   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │       ├── page.tsx
│   │   │   │   │   │   │       ├── request
│   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │       └── sent
│   │   │   │   │   │   │           └── page.tsx
│   │   │   │   │   │   ├── signin
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── signup
│   │   │   │   │   │       ├── page.tsx
│   │   │   │   │   │       └── success
│   │   │   │   │   │           └── page.tsx
│   │   │   │   │   ├── [domain]
│   │   │   │   │   │   ├── (dashboard)
│   │   │   │   │   │   │   ├── connections
│   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   ├── rate-sheets
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── system
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── create_label
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── developers
│   │   │   │   │   │   │   │   ├── api
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── apikeys
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── events
│   │   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── logs
│   │   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   └── webhooks
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── draft_orders
│   │   │   │   │   │   │   │   └── [id]
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   │   ├── manifests
│   │   │   │   │   │   │   │   ├── create_manifests
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── orders
│   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── create_label
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── create_labels
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── create_shipment
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   ├── settings
│   │   │   │   │   │   │   │   ├── account
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── addresses
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── organization
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── parcels
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── profile
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── template
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── templates
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── shipments
│   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── create_labels
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── trackers
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   └── workflows
│   │   │   │   │   │   │       ├── [id]
│   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │       ├── events
│   │   │   │   │   │   │       │   ├── [id]
│   │   │   │   │   │   │       │   │   └── page.tsx
│   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   ├── (embed)
│   │   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   │   └── resources
│   │   │   │   │   │   │       ├── graphiql
│   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │       └── reference
│   │   │   │   │   │   │           └── page.tsx
│   │   │   │   │   │   ├── (public)
│   │   │   │   │   │   │   ├── accept-invite
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── email
│   │   │   │   │   │   │   │   ├── [token]
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── change
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   │   ├── password
│   │   │   │   │   │   │   │   └── reset
│   │   │   │   │   │   │   │       ├── done
│   │   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │   │       ├── page.tsx
│   │   │   │   │   │   │   │       ├── request
│   │   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │   │       └── sent
│   │   │   │   │   │   │   │           └── page.tsx
│   │   │   │   │   │   │   ├── signin
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   └── signup
│   │   │   │   │   │   │       ├── page.tsx
│   │   │   │   │   │   │       └── success
│   │   │   │   │   │   │           └── page.tsx
│   │   │   │   │   │   ├── api
│   │   │   │   │   │   │   ├── auth
│   │   │   │   │   │   │   │   └── [...nextauth]
│   │   │   │   │   │   │   │       └── route.ts
│   │   │   │   │   │   │   └── images
│   │   │   │   │   │   │       └── [name]
│   │   │   │   │   │   │           └── route.ts
│   │   │   │   │   │   ├── test
│   │   │   │   │   │   │   ├── (dashboard)
│   │   │   │   │   │   │   │   ├── connections
│   │   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   │   ├── rate-sheets
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── system
│   │   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   │   ├── create_label
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── developers
│   │   │   │   │   │   │   │   │   ├── api
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── apikeys
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── events
│   │   │   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── logs
│   │   │   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   │   └── webhooks
│   │   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   │   ├── draft_orders
│   │   │   │   │   │   │   │   │   └── [id]
│   │   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   │   ├── email
│   │   │   │   │   │   │   │   │   ├── [token]
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── change
│   │   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   │   │   ├── manifests
│   │   │   │   │   │   │   │   │   ├── create_manifests
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── orders
│   │   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── create_label
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── create_labels
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── create_shipment
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   ├── password
│   │   │   │   │   │   │   │   │   └── reset
│   │   │   │   │   │   │   │   │       ├── done
│   │   │   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │   │   │       ├── page.tsx
│   │   │   │   │   │   │   │   │       ├── request
│   │   │   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │   │   │       └── sent
│   │   │   │   │   │   │   │   │           └── page.tsx
│   │   │   │   │   │   │   │   ├── settings
│   │   │   │   │   │   │   │   │   ├── account
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── addresses
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── organization
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── parcels
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── profile
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── template
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── templates
│   │   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   │   ├── shipments
│   │   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   ├── create_labels
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── trackers
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── workflows
│   │   │   │   │   │   │   │       ├── [id]
│   │   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │   │       ├── events
│   │   │   │   │   │   │   │       │   ├── [id]
│   │   │   │   │   │   │   │       │   │   └── page.tsx
│   │   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── (embed)
│   │   │   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   │   │   └── resources
│   │   │   │   │   │   │   │       ├── graphiql
│   │   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │   │       └── reference
│   │   │   │   │   │   │   │           └── page.tsx
│   │   │   │   │   │   │   └── tracking
│   │   │   │   │   │   │       └── [id]
│   │   │   │   │   │   │           └── page.tsx
│   │   │   │   │   │   └── tracking
│   │   │   │   │   │       └── [id]
│   │   │   │   │   │           └── page.tsx
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── test
│   │   │   │   │   │   ├── (dashboard)
│   │   │   │   │   │   │   ├── connections
│   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   ├── rate-sheets
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── system
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── create_label
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── developers
│   │   │   │   │   │   │   │   ├── api
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── apikeys
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── events
│   │   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── logs
│   │   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   └── webhooks
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── draft_orders
│   │   │   │   │   │   │   │   └── [id]
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── email
│   │   │   │   │   │   │   │   ├── [token]
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── change
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   │   ├── manifests
│   │   │   │   │   │   │   │   ├── create_manifests
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── orders
│   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── create_label
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── create_labels
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── create_shipment
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   ├── password
│   │   │   │   │   │   │   │   └── reset
│   │   │   │   │   │   │   │       ├── done
│   │   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │   │       ├── page.tsx
│   │   │   │   │   │   │   │       ├── request
│   │   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │   │       └── sent
│   │   │   │   │   │   │   │           └── page.tsx
│   │   │   │   │   │   │   ├── settings
│   │   │   │   │   │   │   │   ├── account
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── addresses
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── organization
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── parcels
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── profile
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── template
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── templates
│   │   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   │   ├── shipments
│   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   ├── create_labels
│   │   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   ├── trackers
│   │   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   │   └── workflows
│   │   │   │   │   │   │       ├── [id]
│   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │       ├── events
│   │   │   │   │   │   │       │   ├── [id]
│   │   │   │   │   │   │       │   │   └── page.tsx
│   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   ├── (embed)
│   │   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   │   └── resources
│   │   │   │   │   │   │       ├── graphiql
│   │   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │   │       └── reference
│   │   │   │   │   │   │           └── page.tsx
│   │   │   │   │   │   └── tracking
│   │   │   │   │   │       └── [id]
│   │   │   │   │   │           └── page.tsx
│   │   │   │   │   └── tracking
│   │   │   │   │       └── [id]
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── (ee)
│   │   │   │   │   └── (admin)
│   │   │   │   │       ├── [domain]
│   │   │   │   │       │   ├── admin
│   │   │   │   │       │   │   ├── carrier-connections
│   │   │   │   │       │   │   │   └── page.tsx
│   │   │   │   │       │   │   ├── layout.tsx
│   │   │   │   │       │   │   ├── organization-accounts
│   │   │   │   │       │   │   │   └── page.tsx
│   │   │   │   │       │   │   ├── page.tsx
│   │   │   │   │       │   │   ├── surcharges
│   │   │   │   │       │   │   │   └── page.tsx
│   │   │   │   │       │   │   └── users-permissions
│   │   │   │   │       │   │       └── page.tsx
│   │   │   │   │       │   └── test
│   │   │   │   │       │       └── admin
│   │   │   │   │       │           ├── carrier-connections
│   │   │   │   │       │           │   └── page.tsx
│   │   │   │   │       │           ├── layout.tsx
│   │   │   │   │       │           ├── organization-accounts
│   │   │   │   │       │           │   └── page.tsx
│   │   │   │   │       │           ├── page.tsx
│   │   │   │   │       │           ├── surcharges
│   │   │   │   │       │           │   └── page.tsx
│   │   │   │   │       │           └── users-permissions
│   │   │   │   │       │               └── page.tsx
│   │   │   │   │       ├── admin
│   │   │   │   │       │   ├── carrier-connections
│   │   │   │   │       │   │   └── page.tsx
│   │   │   │   │       │   ├── layout.tsx
│   │   │   │   │       │   ├── organization-accounts
│   │   │   │   │       │   │   └── page.tsx
│   │   │   │   │       │   ├── page.tsx
│   │   │   │   │       │   ├── surcharges
│   │   │   │   │       │   │   └── page.tsx
│   │   │   │   │       │   └── users-permissions
│   │   │   │   │       │       └── page.tsx
│   │   │   │   │       ├── layout.tsx
│   │   │   │   │       └── test
│   │   │   │   │           └── admin
│   │   │   │   │               ├── carrier-connections
│   │   │   │   │               │   └── page.tsx
│   │   │   │   │               ├── layout.tsx
│   │   │   │   │               ├── organization-accounts
│   │   │   │   │               │   └── page.tsx
│   │   │   │   │               ├── page.tsx
│   │   │   │   │               ├── surcharges
│   │   │   │   │               │   └── page.tsx
│   │   │   │   │               └── users-permissions
│   │   │   │   │                   └── page.tsx
│   │   │   │   ├── api
│   │   │   │   │   ├── auth
│   │   │   │   │   │   └── [...nextauth]
│   │   │   │   │   │       └── route.ts
│   │   │   │   │   ├── images
│   │   │   │   │   │   └── [name]
│   │   │   │   │   │       └── route.ts
│   │   │   │   │   └── trpc
│   │   │   │   │       └── [trpc]
│   │   │   │   │           └── route.ts
│   │   │   │   ├── error.tsx
│   │   │   │   └── global-error.tsx
│   │   │   ├── middleware.ts
│   │   │   └── styles
│   │   │       ├── dashboard.scss
│   │   │       ├── globals.css
│   │   │       ├── plex
│   │   │       │   ├── abstracts
│   │   │       │   │   ├── _mixins.scss
│   │   │       │   │   └── _variables.scss
│   │   │       │   ├── base
│   │   │       │   │   ├── _base.scss
│   │   │       │   │   ├── _helpers.scss
│   │   │       │   │   └── _utils.scss
│   │   │       │   ├── components
│   │   │       │   │   ├── _alert.scss
│   │   │       │   │   ├── _buttons.scss
│   │   │       │   │   ├── _cards.scss
│   │   │       │   │   ├── _dropdowns.scss
│   │   │       │   │   ├── _forms.scss
│   │   │       │   │   ├── _modals.scss
│   │   │       │   │   ├── _pageloader.scss
│   │   │       │   │   └── _switch.scss
│   │   │       │   ├── layout
│   │   │       │   │   ├── _layout.scss
│   │   │       │   │   ├── _navbar.scss
│   │   │       │   │   └── _responsive.scss
│   │   │       │   ├── main.scss
│   │   │       │   └── pages
│   │   │       │       └── _dashboard.scss
│   │   │       └── theme.scss
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   └── www
│       ├── .gitignore
│       ├── README.md
│       ├── babel.config.js
│       ├── docs
│       │   ├── carriers
│       │   │   ├── integrations
│       │   │   │   ├── allied_express.mdx
│       │   │   │   ├── allied_express_local.mdx
│       │   │   │   ├── amazon_shipping.mdx
│       │   │   │   ├── aramex.mdx
│       │   │   │   ├── asendia_us.mdx
│       │   │   │   ├── australiapost.mdx
│       │   │   │   ├── boxknight.mdx
│       │   │   │   ├── bpost.mdx
│       │   │   │   ├── canadapost.mdx
│       │   │   │   ├── canpar.mdx
│       │   │   │   ├── chronopost.mdx
│       │   │   │   ├── colissimo.mdx
│       │   │   │   ├── dhl_express.mdx
│       │   │   │   ├── dhl_parcel_post.mdx
│       │   │   │   ├── dhl_poland.mdx
│       │   │   │   ├── dhl_universal.mdx
│       │   │   │   ├── dicom.mdx
│       │   │   │   ├── dpdhl.mdx
│       │   │   │   ├── fedex.mdx
│       │   │   │   ├── generic.mdx
│       │   │   │   ├── geodis.mdx
│       │   │   │   ├── laposte.mdx
│       │   │   │   ├── nationex.mdx
│       │   │   │   ├── purolator.mdx
│       │   │   │   ├── roadie.mdx
│       │   │   │   ├── royalmail.mdx
│       │   │   │   ├── sendle.mdx
│       │   │   │   ├── tnt.mdx
│       │   │   │   ├── ups.mdx
│       │   │   │   ├── usps.mdx
│       │   │   │   └── usps_international.mdx
│       │   │   ├── integrations.json
│       │   │   └── sdk
│       │   │       ├── architecture.mdx
│       │   │       ├── debugging.mdx
│       │   │       ├── extension.mdx
│       │   │       ├── gateways.mdx
│       │   │       ├── pickup.mdx
│       │   │       ├── rating.mdx
│       │   │       ├── shipping.mdx
│       │   │       └── tracking.mdx
│       │   ├── index.mdx
│       │   ├── insiders
│       │   │   └── index.mdx
│       │   ├── integrations.mdx
│       │   ├── product
│       │   │   ├── connections.mdx
│       │   │   ├── events.mdx
│       │   │   ├── local-development.mdx
│       │   │   ├── logs.mdx
│       │   │   ├── orders.mdx
│       │   │   ├── quick-start.mdx
│       │   │   ├── resources
│       │   │   │   ├── contributing.mdx
│       │   │   │   ├── development.mdx
│       │   │   │   ├── faq.mdx
│       │   │   │   ├── privacy.mdx
│       │   │   │   ├── support.mdx
│       │   │   │   └── terms.mdx
│       │   │   ├── self-hosting
│       │   │   │   ├── admin.mdx
│       │   │   │   ├── environment.mdx
│       │   │   │   ├── insiders.mdx
│       │   │   │   └── oss.mdx
│       │   │   ├── self-hosting.mdx
│       │   │   ├── shipments.mdx
│       │   │   ├── templates.mdx
│       │   │   ├── trackers.mdx
│       │   │   ├── webhooks.mdx
│       │   │   └── workflows.mdx
│       │   ├── product.mdx
│       │   ├── reference
│       │   │   ├── api
│       │   │   │   ├── add-carrier-connection.api.mdx
│       │   │   │   ├── add-tracker.api.mdx
│       │   │   │   ├── addresses.tag.mdx
│       │   │   │   ├── api.tag.mdx
│       │   │   │   ├── auth.tag.mdx
│       │   │   │   ├── authenticate.api.mdx
│       │   │   │   ├── batches.tag.mdx
│       │   │   │   ├── buy-label.api.mdx
│       │   │   │   ├── cancel-order.api.mdx
│       │   │   │   ├── cancel-pickup.api.mdx
│       │   │   │   ├── cancel-shipment.api.mdx
│       │   │   │   ├── carriers.tag.mdx
│       │   │   │   ├── connections.tag.mdx
│       │   │   │   ├── create-address.api.mdx
│       │   │   │   ├── create-document-template.api.mdx
│       │   │   │   ├── create-manifest.api.mdx
│       │   │   │   ├── create-order.api.mdx
│       │   │   │   ├── create-orders.api.mdx
│       │   │   │   ├── create-parcel.api.mdx
│       │   │   │   ├── create-shipment.api.mdx
│       │   │   │   ├── create-shipments.api.mdx
│       │   │   │   ├── create-tracker.api.mdx
│       │   │   │   ├── create-trackers.api.mdx
│       │   │   │   ├── create-webhook.api.mdx
│       │   │   │   ├── data.api.mdx
│       │   │   │   ├── discard-address.api.mdx
│       │   │   │   ├── discard-document-template.api.mdx
│       │   │   │   ├── discard-parcel.api.mdx
│       │   │   │   ├── dismiss-order.api.mdx
│       │   │   │   ├── documents.tag.mdx
│       │   │   │   ├── fetch-rates.api.mdx
│       │   │   │   ├── generate-document.api.mdx
│       │   │   │   ├── generate-manifest.api.mdx
│       │   │   │   ├── get-services.api.mdx
│       │   │   │   ├── get-tracking.api.mdx
│       │   │   │   ├── get-verified-token.api.mdx
│       │   │   │   ├── import-file.api.mdx
│       │   │   │   ├── karrio-api.info.mdx
│       │   │   │   ├── list-addresses.api.mdx
│       │   │   │   ├── list-batch-operations.api.mdx
│       │   │   │   ├── list-carrier-connections.api.mdx
│       │   │   │   ├── list-carriers.api.mdx
│       │   │   │   ├── list-document-templates.api.mdx
│       │   │   │   ├── list-manifests.api.mdx
│       │   │   │   ├── list-orders.api.mdx
│       │   │   │   ├── list-parcels.api.mdx
│       │   │   │   ├── list-pickups.api.mdx
│       │   │   │   ├── list-shipments.api.mdx
│       │   │   │   ├── list-trackers.api.mdx
│       │   │   │   ├── list-webhooks.api.mdx
│       │   │   │   ├── manifests.tag.mdx
│       │   │   │   ├── orders.tag.mdx
│       │   │   │   ├── parcels.tag.mdx
│       │   │   │   ├── pickup-cancel.api.mdx
│       │   │   │   ├── pickup-schedule.api.mdx
│       │   │   │   ├── pickup-update.api.mdx
│       │   │   │   ├── pickups.tag.mdx
│       │   │   │   ├── ping.api.mdx
│       │   │   │   ├── proxy.tag.mdx
│       │   │   │   ├── purchase.api.mdx
│       │   │   │   ├── rates.api.mdx
│       │   │   │   ├── refresh-token.api.mdx
│       │   │   │   ├── remove-carrier-connection.api.mdx
│       │   │   │   ├── remove-tracker.api.mdx
│       │   │   │   ├── remove-webhook.api.mdx
│       │   │   │   ├── retrieve-address.api.mdx
│       │   │   │   ├── retrieve-batch-operation.api.mdx
│       │   │   │   ├── retrieve-carrier-connection.api.mdx
│       │   │   │   ├── retrieve-document-template.api.mdx
│       │   │   │   ├── retrieve-manifest.api.mdx
│       │   │   │   ├── retrieve-order.api.mdx
│       │   │   │   ├── retrieve-parcel.api.mdx
│       │   │   │   ├── retrieve-pickup.api.mdx
│       │   │   │   ├── retrieve-shipment.api.mdx
│       │   │   │   ├── retrieve-tracker.api.mdx
│       │   │   │   ├── retrieve-upload.api.mdx
│       │   │   │   ├── retrieve-webhook.api.mdx
│       │   │   │   ├── schedule-pickup.api.mdx
│       │   │   │   ├── shipments.tag.mdx
│       │   │   │   ├── sidebar.js
│       │   │   │   ├── test-webhook.api.mdx
│       │   │   │   ├── track-shipment.api.mdx
│       │   │   │   ├── trackers.tag.mdx
│       │   │   │   ├── update-address.api.mdx
│       │   │   │   ├── update-carrier-connection.api.mdx
│       │   │   │   ├── update-document-template.api.mdx
│       │   │   │   ├── update-order.api.mdx
│       │   │   │   ├── update-parcel.api.mdx
│       │   │   │   ├── update-pickup.api.mdx
│       │   │   │   ├── update-shipment.api.mdx
│       │   │   │   ├── update-tracker.api.mdx
│       │   │   │   ├── update-webhook.api.mdx
│       │   │   │   ├── upload.api.mdx
│       │   │   │   ├── uploads.api.mdx
│       │   │   │   ├── verify-token.api.mdx
│       │   │   │   ├── void-label.api.mdx
│       │   │   │   └── webhooks.tag.mdx
│       │   │   ├── guides
│       │   │   │   ├── addresses.mdx
│       │   │   │   ├── authentication.mdx
│       │   │   │   ├── batches.mdx
│       │   │   │   ├── carriers.mdx
│       │   │   │   ├── documents.mdx
│       │   │   │   ├── error-codes.mdx
│       │   │   │   ├── metadata.mdx
│       │   │   │   ├── orders.mdx
│       │   │   │   ├── pagination.mdx
│       │   │   │   ├── parcels.mdx
│       │   │   │   ├── shipments.mdx
│       │   │   │   ├── trackers.mdx
│       │   │   │   └── webhooks.mdx
│       │   │   └── management
│       │   │       ├── connections.mdx
│       │   │       ├── data.mdx
│       │   │       ├── organizations.mdx
│       │   │       ├── overview.mdx
│       │   │       └── users.mdx
│       │   └── sdk.mdx
│       ├── docusaurus.config.js
│       ├── netlify.toml
│       ├── openapi.yml
│       ├── package.json
│       ├── plugins
│       │   └── tailwind-loader
│       │       └── index.js
│       ├── sidebars.js
│       ├── src
│       │   ├── components
│       │   │   ├── CardGrid
│       │   │   │   ├── index.jsx
│       │   │   │   └── styles.module.css
│       │   │   ├── CarrierIntegrationDetails
│       │   │   │   ├── index.jsx
│       │   │   │   ├── references.json
│       │   │   │   └── styles.module.css
│       │   │   └── VideoWrapper
│       │   │       ├── index.jsx
│       │   │       └── styles.module.css
│       │   ├── css
│       │   │   └── custom.css
│       │   ├── pages
│       │   │   └── landing.jsx
│       │   └── theme
│       │       └── SearchBar.js
│       ├── static
│       │   ├── .nojekyll
│       │   └── img
│       │       ├── assets
│       │       │   ├── api-key.png
│       │       │   ├── carriers.png
│       │       │   ├── doc-template.png
│       │       │   ├── enable-system-carrier.mp4
│       │       │   ├── events.png
│       │       │   ├── graphiQL.png
│       │       │   ├── insomnia.png
│       │       │   ├── karrio-apps-architecture.svg
│       │       │   ├── karrio-class-diagram.svg
│       │       │   ├── karrio-sequence-diagram.svg
│       │       │   ├── log-request.png
│       │       │   ├── log-response.png
│       │       │   ├── log-timeline.png
│       │       │   ├── logs.png
│       │       │   ├── openapi.png
│       │       │   ├── order-fulfillment
│       │       │   │   ├── create-shipment.png
│       │       │   │   ├── fulfilled-orders.png
│       │       │   │   ├── fulfillment-api-logs.png
│       │       │   │   ├── fulfillment-lifecycle-events.png
│       │       │   │   ├── purchased-label.png
│       │       │   │   └── unfulfilled-orders.png
│       │       │   ├── quick-start
│       │       │   │   ├── carriers.png
│       │       │   │   ├── create-a-tracker.png
│       │       │   │   ├── create-shipment-action.png
│       │       │   │   ├── fetch-rates.png
│       │       │   │   ├── label-preview.png
│       │       │   │   ├── print-label.png
│       │       │   │   ├── register-carrier.png
│       │       │   │   ├── shipment-details.png
│       │       │   │   ├── shipments.png
│       │       │   │   ├── system-accounts.png
│       │       │   │   ├── test-mode.png
│       │       │   │   ├── track-a-shipment.png
│       │       │   │   ├── trackers.png
│       │       │   │   └── your-accounts.png
│       │       │   ├── register-carrier.gif
│       │       │   ├── shipments.png
│       │       │   ├── shipping-flow.svg
│       │       │   ├── trackers.png
│       │       │   ├── user-registration-flow.svg
│       │       │   ├── webhook.png
│       │       │   ├── webhooks.png
│       │       │   ├── workflow-new.png
│       │       │   ├── workflow.png
│       │       │   └── workflows.png
│       │       ├── bubble.svg
│       │       ├── carriers
│       │       │   ├── aramex_icon.svg
│       │       │   ├── aramex_logo.svg
│       │       │   ├── australiapost_icon.svg
│       │       │   ├── australiapost_logo.svg
│       │       │   ├── canadapost_icon.svg
│       │       │   ├── canadapost_logo.svg
│       │       │   ├── canpar_icon.svg
│       │       │   ├── canpar_logo.svg
│       │       │   ├── dhl_express_icon.svg
│       │       │   ├── dhl_express_logo.svg
│       │       │   ├── dhl_universal_icon.svg
│       │       │   ├── dhl_universal_logo.svg
│       │       │   ├── dicom_icon.svg
│       │       │   ├── dicom_logo.svg
│       │       │   ├── eshipper_logo.svg
│       │       │   ├── fedex_icon.svg
│       │       │   ├── fedex_logo.svg
│       │       │   ├── freightcom_logo.svg
│       │       │   ├── purolator_icon.svg
│       │       │   ├── purolator_logo.svg
│       │       │   ├── royalmail_icon.svg
│       │       │   ├── royalmail_logo.svg
│       │       │   ├── sendle_icon.svg
│       │       │   ├── sendle_logo.svg
│       │       │   ├── sf_express_icon.svg
│       │       │   ├── sf_express_logo.svg
│       │       │   ├── tnt_icon.svg
│       │       │   ├── tnt_logo.svg
│       │       │   ├── ups_icon.svg
│       │       │   ├── ups_logo.svg
│       │       │   ├── usps_icon.svg
│       │       │   ├── usps_international_icon.svg
│       │       │   ├── usps_international_logo.svg
│       │       │   ├── usps_logo.svg
│       │       │   ├── yanwen_icon.svg
│       │       │   ├── yanwen_logo.svg
│       │       │   ├── yunexpress_icon.svg
│       │       │   └── yunexpress_logo.svg
│       │       ├── favicon.ico
│       │       ├── icon-inverted.svg
│       │       ├── icon.svg
│       │       ├── illustrations
│       │       │   ├── ecommerce.svg
│       │       │   ├── erp.svg
│       │       │   ├── platform.svg
│       │       │   └── wms.svg
│       │       ├── karrio.png
│       │       ├── logo-inverted.svg
│       │       └── logo.svg
│       └── tailwind.config.js
├── bin
│   ├── _env
│   ├── activate-env
│   ├── build-dashboard-image
│   ├── build-insiders-image
│   ├── build-nginx-image
│   ├── build-package-wheel
│   ├── build-server-image
│   ├── build-server-image-from-source
│   ├── build-tool-image
│   ├── cli
│   ├── create-default-user
│   ├── create-new-env
│   ├── deploy
│   ├── deploy-hobby
│   ├── deploy-insiders
│   ├── deploy-light
│   ├── docker-env
│   ├── generate-api-docs
│   ├── generate-graphql-admin-types
│   ├── generate-graphql-ee-types
│   ├── generate-graphql-platform-types
│   ├── generate-graphql-types
│   ├── generate-openapi-types
│   ├── install-binaries
│   ├── migrate
│   ├── publish-wheels
│   ├── run-generate-on
│   ├── run-sdk-tests
│   ├── run-sdk-typecheck
│   ├── run-server-tests
│   ├── sdk
│   ├── server
│   ├── setup-sdk-env
│   ├── setup-server-env
│   ├── start
│   ├── start-server
│   ├── start-worker
│   ├── update-source-version-freeze
│   ├── update-version
│   ├── update-version-freeze
│   ├── upgrade-hobby
│   └── upgrade-insiders
├── docker
│   ├── .env
│   ├── api
│   │   ├── .dockerignore
│   │   ├── Dockerfile
│   │   ├── entrypoint
│   │   └── worker
│   ├── dashboard
│   │   ├── .dockerignore
│   │   ├── Dockerfile
│   │   └── entrypoint
│   ├── dev.Dockerfile
│   ├── dev.tool.Dockerfile
│   ├── docker-compose.hobby.yml
│   ├── docker-compose.insiders.yml
│   ├── docker-compose.yml
│   ├── insiders
│   │   ├── .dockerignore
│   │   ├── Dockerfile
│   │   ├── entrypoint
│   │   └── worker
│   └── nginx
│       ├── Dockerfile
│       ├── karrio.conf.template
│       └── nginx.conf
├── docker-compose.yml
├── ee
│   ├── LICENSE
│   ├── insiders
│   │   ├── .editorconfig
│   │   ├── .gitignore
│   │   ├── README.md
│   │   ├── docker
│   │   │   ├── .env
│   │   │   └── docker-compose.yml
│   │   └── modules
│   │       ├── admin
│   │       │   ├── README.md
│   │       │   ├── karrio
│   │       │   │   └── server
│   │       │   │       ├── admin
│   │       │   │       │   ├── __init__.py
│   │       │   │       │   ├── admin.py
│   │       │   │       │   ├── apps.py
│   │       │   │       │   ├── forms.py
│   │       │   │       │   ├── migrations
│   │       │   │       │   │   └── __init__.py
│   │       │   │       │   ├── models.py
│   │       │   │       │   ├── schema.py
│   │       │   │       │   ├── schemas
│   │       │   │       │   │   ├── __init__.py
│   │       │   │       │   │   └── base
│   │       │   │       │   │       ├── __init__.py
│   │       │   │       │   │       ├── inputs.py
│   │       │   │       │   │       ├── mutations.py
│   │       │   │       │   │       └── types.py
│   │       │   │       │   ├── serializers.py
│   │       │   │       │   ├── signals.py
│   │       │   │       │   ├── tests.py
│   │       │   │       │   ├── urls.py
│   │       │   │       │   ├── utils.py
│   │       │   │       │   └── views.py
│   │       │   │       └── settings
│   │       │   │           └── admin.py
│   │       │   └── setup.py
│   │       ├── apps
│   │       │   ├── README.md
│   │       │   ├── karrio
│   │       │   │   └── server
│   │       │   │       ├── apps
│   │       │   │       │   ├── __init__.py
│   │       │   │       │   ├── admin.py
│   │       │   │       │   ├── apps.py
│   │       │   │       │   ├── filters.py
│   │       │   │       │   ├── migrations
│   │       │   │       │   │   ├── 0001_initial.py
│   │       │   │       │   │   └── __init__.py
│   │       │   │       │   ├── models.py
│   │       │   │       │   ├── serializers.py
│   │       │   │       │   ├── tests.py
│   │       │   │       │   └── views.py
│   │       │   │       └── graph
│   │       │   │           └── schemas
│   │       │   │               ├── __init__.py
│   │       │   │               └── apps
│   │       │   │                   ├── __init__.py
│   │       │   │                   ├── inputs.py
│   │       │   │                   ├── mutations.py
│   │       │   │                   └── types.py
│   │       │   └── setup.py
│   │       ├── audit
│   │       │   ├── README.md
│   │       │   ├── karrio
│   │       │   │   └── server
│   │       │   │       ├── audit
│   │       │   │       │   ├── __init__.py
│   │       │   │       │   ├── admin.py
│   │       │   │       │   ├── apps.py
│   │       │   │       │   ├── filters.py
│   │       │   │       │   ├── hooks.py
│   │       │   │       │   ├── middleware.py
│   │       │   │       │   ├── migrations
│   │       │   │       │   │   ├── 0001_initial.py
│   │       │   │       │   │   ├── 0002_alter_auditlogentry_options.py
│   │       │   │       │   │   └── __init__.py
│   │       │   │       │   ├── models.py
│   │       │   │       │   ├── serializers.py
│   │       │   │       │   ├── signals.py
│   │       │   │       │   ├── tests.py
│   │       │   │       │   └── views.py
│   │       │   │       ├── graph
│   │       │   │       │   └── schemas
│   │       │   │       │       ├── __init__.py
│   │       │   │       │       └── audit
│   │       │   │       │           ├── __init__.py
│   │       │   │       │           ├── inputs.py
│   │       │   │       │           └── types.py
│   │       │   │       └── settings
│   │       │   │           └── audit.py
│   │       │   └── setup.py
│   │       ├── automation
│   │       │   ├── README.md
│   │       │   ├── karrio
│   │       │   │   └── server
│   │       │   │       ├── automation
│   │       │   │       │   ├── __init__.py
│   │       │   │       │   ├── admin.py
│   │       │   │       │   ├── apps.py
│   │       │   │       │   ├── filters.py
│   │       │   │       │   ├── migrations
│   │       │   │       │   │   ├── 0001_initial.py
│   │       │   │       │   │   ├── 0001_initial_squashed_0004_alter_workflowaction_action_type_and_more.py
│   │       │   │       │   │   ├── 0002_auto_20231227_2008.py
│   │       │   │       │   │   ├── 0003_workflow_is_active_workflowtrigger_name_and_more.py
│   │       │   │       │   │   ├── 0004_alter_workflowaction_action_type_and_more.py
│   │       │   │       │   │   └── __init__.py
│   │       │   │       │   ├── models.py
│   │       │   │       │   ├── router.py
│   │       │   │       │   ├── serializers
│   │       │   │       │   │   ├── __init__.py
│   │       │   │       │   │   └── models.py
│   │       │   │       │   ├── signals.py
│   │       │   │       │   ├── tests
│   │       │   │       │   │   ├── __init__.py
│   │       │   │       │   │   ├── base.py
│   │       │   │       │   │   ├── test_workflow_actions.py
│   │       │   │       │   │   ├── test_workflow_events.py
│   │       │   │       │   │   └── test_workflows.py
│   │       │   │       │   ├── urls.py
│   │       │   │       │   ├── utils.py
│   │       │   │       │   └── views
│   │       │   │       │       ├── __init__.py
│   │       │   │       │       └── workflow.py
│   │       │   │       ├── events
│   │       │   │       │   └── task_definitions
│   │       │   │       │       ├── __init__.py
│   │       │   │       │       └── automation
│   │       │   │       │           ├── __init__.py
│   │       │   │       │           └── workflow.py
│   │       │   │       ├── graph
│   │       │   │       │   └── schemas
│   │       │   │       │       ├── __init__.py
│   │       │   │       │       └── automation
│   │       │   │       │           ├── __init__.py
│   │       │   │       │           ├── inputs.py
│   │       │   │       │           ├── mutations.py
│   │       │   │       │           └── types.py
│   │       │   │       └── settings
│   │       │   │           └── automation.py
│   │       │   └── setup.py
│   │       ├── cloud
│   │       │   ├── README.md
│   │       │   ├── karrio
│   │       │   │   └── server
│   │       │   │       ├── cloud
│   │       │   │       │   └── __init__.py
│   │       │   │       └── settings
│   │       │   │           └── main.py
│   │       │   └── setup.py
│   │       └── orgs
│   │           ├── MANIFEST.in
│   │           ├── README.md
│   │           ├── karrio
│   │           │   └── server
│   │           │       ├── admin
│   │           │       │   └── schemas
│   │           │       │       ├── __init__.py
│   │           │       │       └── orgs
│   │           │       │           ├── __init__.py
│   │           │       │           ├── inputs.py
│   │           │       │           ├── mutations.py
│   │           │       │           └── types.py
│   │           │       ├── events
│   │           │       │   └── task_definitions
│   │           │       │       ├── __init__.py
│   │           │       │       └── orgs
│   │           │       │           └── __init__.py
│   │           │       ├── graph
│   │           │       │   └── schemas
│   │           │       │       ├── __init__.py
│   │           │       │       └── orgs
│   │           │       │           ├── __init__.py
│   │           │       │           ├── inputs.py
│   │           │       │           ├── mutations.py
│   │           │       │           └── types.py
│   │           │       ├── orgs
│   │           │       │   ├── __init__.py
│   │           │       │   ├── admin.py
│   │           │       │   ├── apps.py
│   │           │       │   ├── backends.py
│   │           │       │   ├── filters.py
│   │           │       │   ├── middleware.py
│   │           │       │   ├── migrations
│   │           │       │   │   ├── 0001_initial.py
│   │           │       │   │   ├── 0002_organization_surcharges.py
│   │           │       │   │   ├── 0003_organization_system_carriers.py
│   │           │       │   │   ├── 0004_auto_20211113_1338.py
│   │           │       │   │   ├── 0005_auto_20211231_2353.py
│   │           │       │   │   ├── 0006_auto_20220624_1450.py
│   │           │       │   │   ├── 0007_auto_20220628_0044.py
│   │           │       │   │   ├── 0008_auto_20220817_0107.py
│   │           │       │   │   ├── 0009_auto_20220903_1256.py
│   │           │       │   │   ├── 0010_appinstallationlink_applink_batchoperationlink_and_more.py
│   │           │       │   │   ├── 0011_documenttemplatelink_organization_document_templates.py
│   │           │       │   │   ├── 0012_auto_20221130_0304.py
│   │           │       │   │   ├── 0013_carrierconfiglink_organization_carrier_configs.py
│   │           │       │   │   ├── 0014_ratesheetlink_organization_rate_sheets.py
│   │           │       │   │   ├── 0015_workflowtriggerlink_workflowlink_workfloweventlink_and_more.py
│   │           │       │   │   ├── 0016_organization_metafields.py
│   │           │       │   │   ├── 0017_organization_config.py
│   │           │       │   │   ├── 0018_manifestlink_organization_manifests.py
│   │           │       │   │   ├── 0019_organizationinvitation_is_owner_and_more.py
│   │           │       │   │   └── __init__.py
│   │           │       │   ├── models.py
│   │           │       │   ├── permissions.py
│   │           │       │   ├── serializers
│   │           │       │   │   ├── __init__.py
│   │           │       │   │   └── organization.py
│   │           │       │   ├── signals.py
│   │           │       │   ├── templates
│   │           │       │   │   └── karrio
│   │           │       │   │       ├── invitation_email.html
│   │           │       │   │       ├── invitation_email.txt
│   │           │       │   │       └── organization_ownership_email.html
│   │           │       │   ├── tests.py
│   │           │       │   ├── urls.py
│   │           │       │   └── utils.py
│   │           │       └── settings
│   │           │           └── orgs.py
│   │           └── setup.py
│   └── platform
│       ├── .gitignore
│       ├── README.md
│       ├── apps
│       │   └── cloud
│       │       ├── .env.sample
│       │       ├── .eslintrc.js
│       │       ├── .gitignore
│       │       ├── README.md
│       │       ├── next-env.d.ts
│       │       ├── next.config.mjs
│       │       ├── package.json
│       │       ├── postcss.config.mjs
│       │       ├── public
│       │       │   ├── android-chrome-192x192.png
│       │       │   ├── android-chrome-512x512.png
│       │       │   ├── apple-touch-icon.png
│       │       │   ├── favicon-16x16.png
│       │       │   ├── favicon-32x32.png
│       │       │   ├── favicon.ico
│       │       │   ├── favicon.png
│       │       │   ├── favicon.svg
│       │       │   ├── icon-light.png
│       │       │   ├── icon-light.svg
│       │       │   ├── icon.png
│       │       │   ├── icon.svg
│       │       │   ├── logo-light.svg
│       │       │   ├── logo.svg
│       │       │   ├── placeholder-dark.svg
│       │       │   └── placeholder.svg
│       │       ├── sentry.client.config.js
│       │       ├── sentry.edge.config.js
│       │       ├── sentry.server.config.js
│       │       ├── src
│       │       │   ├── app
│       │       │   │   ├── (auth)
│       │       │   │   │   ├── forgot-password
│       │       │   │   │   │   └── page.tsx
│       │       │   │   │   ├── layout.tsx
│       │       │   │   │   ├── signin
│       │       │   │   │   │   └── page.tsx
│       │       │   │   │   └── signup
│       │       │   │   │       └── page.tsx
│       │       │   │   ├── (dashboard)
│       │       │   │   │   └── orgs
│       │       │   │   │       ├── [orgId]
│       │       │   │   │       │   ├── billing
│       │       │   │   │       │   │   └── page.tsx
│       │       │   │   │       │   ├── page.tsx
│       │       │   │   │       │   ├── projects
│       │       │   │   │       │   │   ├── [projectId]
│       │       │   │   │       │   │   │   ├── accounts
│       │       │   │   │       │   │   │   │   └── page.tsx
│       │       │   │   │       │   │   │   ├── page.tsx
│       │       │   │   │       │   │   │   └── settings
│       │       │   │   │       │   │   │       └── page.tsx
│       │       │   │   │       │   │   └── create
│       │       │   │   │       │   │       └── page.tsx
│       │       │   │   │       │   └── settings
│       │       │   │   │       │       └── page.tsx
│       │       │   │   │       ├── layout.tsx
│       │       │   │   │       └── page.tsx
│       │       │   │   ├── (error)
│       │       │   │   │   ├── 404
│       │       │   │   │   │   └── page.tsx
│       │       │   │   │   ├── 500
│       │       │   │   │   │   └── page.tsx
│       │       │   │   │   └── maintenance
│       │       │   │   │       └── page.tsx
│       │       │   │   ├── (landing)
│       │       │   │   │   └── page.tsx
│       │       │   │   ├── (onboarding)
│       │       │   │   │   ├── layout.tsx
│       │       │   │   │   └── orgs
│       │       │   │   │       └── create
│       │       │   │   │           └── page.tsx
│       │       │   │   ├── api
│       │       │   │   │   ├── auth
│       │       │   │   │   │   └── [...nextauth]
│       │       │   │   │   │       └── route.ts
│       │       │   │   │   └── trpc
│       │       │   │   │       └── [trpc]
│       │       │   │   │           └── route.ts
│       │       │   │   ├── error.tsx
│       │       │   │   ├── global-error.tsx
│       │       │   │   ├── layout.tsx
│       │       │   │   ├── not-found.tsx
│       │       │   │   └── page.tsx
│       │       │   └── styles
│       │       │       └── globals.css
│       │       ├── tailwind.config.ts
│       │       └── tsconfig.json
│       ├── modules
│       │   └── tenants
│       │       ├── README.md
│       │       ├── karrio
│       │       │   └── server
│       │       │       ├── settings
│       │       │       │   └── tenants.py
│       │       │       └── tenants
│       │       │           ├── __init__.py
│       │       │           ├── admin.py
│       │       │           ├── apps.py
│       │       │           ├── filters.py
│       │       │           ├── graph
│       │       │           │   ├── __init__.py
│       │       │           │   └── schema
│       │       │           │       ├── __init__.py
│       │       │           │       ├── inputs.py
│       │       │           │       ├── mutations.py
│       │       │           │       └── types.py
│       │       │           ├── management
│       │       │           │   ├── __init__.py
│       │       │           │   └── commands
│       │       │           │       ├── __init__.py
│       │       │           │       └── verify_tenant_setup.py
│       │       │           ├── middleware.py
│       │       │           ├── migrations
│       │       │           │   ├── 0001_initial.py
│       │       │           │   ├── 0002_client_feature_flags.py
│       │       │           │   ├── 0003_alter_client_feature_flags.py
│       │       │           │   ├── 0004_auto_20220830_1045.py
│       │       │           │   ├── 0005_remove_client_feature_flags.py
│       │       │           │   ├── 0006_rename_features_client_feature_flags.py
│       │       │           │   ├── 0007_client_app_domains.py
│       │       │           │   ├── 0008_client_website.py
│       │       │           │   └── __init__.py
│       │       │           ├── models.py
│       │       │           ├── serializers.py
│       │       │           ├── signals.py
│       │       │           ├── tests.py
│       │       │           ├── urls.py
│       │       │           ├── utils.py
│       │       │           └── views.py
│       │       └── setup.py
│       ├── packages
│       │   └── console
│       │       ├── .eslintrc.js
│       │       ├── .gitignore
│       │       ├── apis
│       │       │   ├── auth.ts
│       │       │   ├── middleware.ts
│       │       │   ├── stripe-webhook.ts
│       │       │   └── trpc.ts
│       │       ├── components
│       │       │   ├── calendar-date-range-picker.tsx
│       │       │   ├── card-grid.tsx
│       │       │   ├── code-preview.tsx
│       │       │   ├── cta-section.tsx
│       │       │   ├── dashboard-header.tsx
│       │       │   ├── dashboard-sidebar.tsx
│       │       │   ├── feature-showcase.tsx
│       │       │   ├── feature-tabs.tsx
│       │       │   ├── features-illustrations
│       │       │   │   └── carrier-network.tsx
│       │       │   ├── forgot-password-form.tsx
│       │       │   ├── karrio-logo.tsx
│       │       │   ├── nav-main.tsx
│       │       │   ├── nav-projects.tsx
│       │       │   ├── nav-user.tsx
│       │       │   ├── org-switcher.tsx
│       │       │   ├── page-header.tsx
│       │       │   ├── payment-method-form.tsx
│       │       │   ├── plan-selection.tsx
│       │       │   ├── pricing-table.tsx
│       │       │   ├── project-overview.tsx
│       │       │   ├── recent-sales.tsx
│       │       │   ├── user-nav.tsx
│       │       │   └── user-profile.tsx
│       │       ├── emails
│       │       │   └── invite-member.tsx
│       │       ├── hooks
│       │       │   ├── providers.tsx
│       │       │   └── use-media-query.ts
│       │       ├── index.tsx
│       │       ├── layouts
│       │       │   ├── auth-layout.tsx
│       │       │   ├── dashboard-layout.tsx
│       │       │   ├── plain-layout.tsx
│       │       │   └── root-layout.tsx
│       │       ├── modules
│       │       │   ├── Admin
│       │       │   │   └── index.tsx
│       │       │   ├── Auth
│       │       │   │   ├── ForgotPassword
│       │       │   │   │   └── index.tsx
│       │       │   │   ├── Invites
│       │       │   │   │   └── index.tsx
│       │       │   │   ├── SignIn
│       │       │   │   │   └── index.tsx
│       │       │   │   ├── SignInClient.tsx
│       │       │   │   ├── SignUp
│       │       │   │   │   └── index.tsx
│       │       │   │   └── SignUpClient.tsx
│       │       │   ├── Console
│       │       │   │   ├── Billing
│       │       │   │   │   ├── Cancel
│       │       │   │   │   │   └── index.tsx
│       │       │   │   │   ├── Success
│       │       │   │   │   │   └── index.tsx
│       │       │   │   │   └── index.tsx
│       │       │   │   └── Profile
│       │       │   │       └── index.tsx
│       │       │   ├── Error
│       │       │   │   ├── 404
│       │       │   │   │   └── index.tsx
│       │       │   │   ├── 500
│       │       │   │   │   └── index.tsx
│       │       │   │   ├── Maintenance
│       │       │   │   │   └── index.tsx
│       │       │   │   └── index.ts
│       │       │   ├── Landing
│       │       │   │   └── index.tsx
│       │       │   ├── Maintainance
│       │       │   │   └── index.tsx
│       │       │   ├── Organizations
│       │       │   │   ├── Billing
│       │       │   │   │   └── index.tsx
│       │       │   │   ├── Create
│       │       │   │   │   └── index.tsx
│       │       │   │   ├── Settings
│       │       │   │   │   └── index.tsx
│       │       │   │   └── index.tsx
│       │       │   └── Projects
│       │       │       ├── Accounts
│       │       │       │   └── index.tsx
│       │       │       ├── Create
│       │       │       │   └── index.tsx
│       │       │       ├── Dashboard
│       │       │       │   └── index.tsx
│       │       │       ├── Settings
│       │       │       │   └── index.tsx
│       │       │       └── index.tsx
│       │       ├── package.json
│       │       ├── prisma
│       │       │   ├── client.ts
│       │       │   ├── migrations
│       │       │   │   ├── 20241220231237_initial
│       │       │   │   │   └── migration.sql
│       │       │   │   ├── 20241221151844_add_project_status
│       │       │   │   │   └── migration.sql
│       │       │   │   └── migration_lock.toml
│       │       │   └── schema.prisma
│       │       ├── shared
│       │       │   ├── constants.ts
│       │       │   ├── karrio.ts
│       │       │   ├── resend.ts
│       │       │   ├── stripe.ts
│       │       │   └── utils.ts
│       │       ├── trpc
│       │       │   ├── _app.ts
│       │       │   ├── client.ts
│       │       │   ├── context.ts
│       │       │   ├── index.ts
│       │       │   ├── middleware.ts
│       │       │   ├── router.ts
│       │       │   └── server.ts
│       │       ├── tsconfig.json
│       │       ├── tsconfig.lint.json
│       │       ├── types
│       │       │   ├── api.ts
│       │       │   ├── graphql
│       │       │   │   └── platform
│       │       │   │       ├── index.ts
│       │       │   │       ├── queries.ts
│       │       │   │       └── types.ts
│       │       │   ├── index.ts
│       │       │   └── next-auth.d.ts
│       │       └── utils.ts
│       ├── schemas
│       │   └── graphql-platform.json
│       └── turbo.json
├── modules
│   ├── cli
│   │   ├── __init__.py
│   │   ├── __main__.py
│   │   ├── commands
│   │   │   ├── __init__.py
│   │   │   ├── docs.py
│   │   │   ├── login.py
│   │   │   ├── sdk.py
│   │   │   └── templates.py
│   │   ├── resources
│   │   │   ├── __init__.py
│   │   │   ├── logs.py
│   │   │   ├── orders.py
│   │   │   ├── shipments.py
│   │   │   └── trackers.py
│   │   └── utils.py
│   ├── connectors
│   │   ├── README.md
│   │   ├── allied_express
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── allied_express
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── allied_express
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── allied_express
│   │   │   │           ├── __init__.py
│   │   │   │           ├── label_request.py
│   │   │   │           ├── label_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           ├── tracking_response.py
│   │   │   │           ├── void_request.py
│   │   │   │           └── void_response.py
│   │   │   ├── schemas
│   │   │   │   ├── label_request.json
│   │   │   │   ├── label_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   ├── tracking_response.json
│   │   │   │   ├── void_request.json
│   │   │   │   └── void_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── allied_express
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── allied_express_local
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── allied_express_local
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── allied_express_local
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── allied_express_local
│   │   │   │           ├── __init__.py
│   │   │   │           ├── label_request.py
│   │   │   │           ├── label_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           ├── tracking_response.py
│   │   │   │           ├── void_request.py
│   │   │   │           └── void_response.py
│   │   │   ├── schemas
│   │   │   │   ├── label_request.json
│   │   │   │   ├── label_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   ├── tracking_response.json
│   │   │   │   ├── void_request.json
│   │   │   │   └── void_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── allied_express_local
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── amazon_shipping
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── amazon_shipping
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── amazon_shipping
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── amazon_shipping
│   │   │   │           ├── __init__.py
│   │   │   │           ├── create_shipment_request.py
│   │   │   │           ├── create_shipment_response.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── purchase_label_request.py
│   │   │   │           ├── purchase_label_response.py
│   │   │   │           ├── purchase_shipment_request.py
│   │   │   │           ├── purchase_shipment_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── shipping_label.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── create_shipment_request.json
│   │   │   │   ├── create_shipment_response.json
│   │   │   │   ├── error_response.json
│   │   │   │   ├── purchase_label_request.json
│   │   │   │   ├── purchase_label_response.json
│   │   │   │   ├── purchase_shipment_request.json
│   │   │   │   ├── purchase_shipment_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── shipping_label.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── amazon_shipping
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_login.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── aramex
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── aramex
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── aramex
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── aramex
│   │   │   │           ├── __init__.py
│   │   │   │           ├── array_of_string.py
│   │   │   │           ├── datatypes.py
│   │   │   │           ├── location.py
│   │   │   │           ├── rates.py
│   │   │   │           ├── shipping.py
│   │   │   │           └── tracking.py
│   │   │   ├── schemas
│   │   │   │   ├── array_of_string.xsd
│   │   │   │   ├── datatypes.xsd
│   │   │   │   ├── location.xsd
│   │   │   │   ├── rates.xsd
│   │   │   │   ├── shipping.xsd
│   │   │   │   └── tracking.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── aramex
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           └── test_tracking.py
│   │   ├── asendia_us
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── asendia_us
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── asendia_us
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── asendia_us
│   │   │   │           ├── __init__.py
│   │   │   │           ├── cancel_request.py
│   │   │   │           ├── cancel_response.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── shipping_request.py
│   │   │   │           ├── shipping_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── cancel_request.json
│   │   │   │   ├── cancel_response.json
│   │   │   │   ├── error_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── shipping_request.json
│   │   │   │   ├── shipping_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── asendia_us
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── australiapost
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── australiapost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── australiapost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── manifest.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── australiapost
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── label_request.py
│   │   │   │           ├── label_response.py
│   │   │   │           ├── manifest_request.py
│   │   │   │           ├── manifest_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── shipment_request.py
│   │   │   │           ├── shipment_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── label_request.json
│   │   │   │   ├── label_response.json
│   │   │   │   ├── manifest_request.json
│   │   │   │   ├── manifest_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── shipment_request.json
│   │   │   │   ├── shipment_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── australiapost
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_manifest.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── boxknight
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── boxknight
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── boxknight
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── boxknight
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error.py
│   │   │   │           ├── order_request.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error.json
│   │   │   │   ├── order_request.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── boxknight
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── bpost
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── bpost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── bpost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── bpost
│   │   │   │           ├── __init__.py
│   │   │   │           ├── announcement_common_v1.py
│   │   │   │           ├── business_exception.py
│   │   │   │           ├── common_v5.py
│   │   │   │           ├── international_v5.py
│   │   │   │           ├── national_v5.py
│   │   │   │           ├── shm_deep_integration_v5.py
│   │   │   │           ├── system_exception.py
│   │   │   │           └── tracking_info_v1.py
│   │   │   ├── schemas
│   │   │   │   ├── announcement_common_v1.xsd
│   │   │   │   ├── business_exception.xsd
│   │   │   │   ├── common_v5.xsd
│   │   │   │   ├── international_v5.xsd
│   │   │   │   ├── national_v5.xsd
│   │   │   │   ├── shm_deep_integration_v5.xsd
│   │   │   │   ├── system_exception.xsd
│   │   │   │   └── tracking_info_v1.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── bpost
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── canadapost
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── canadapost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── canadapost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── manifest.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── canadapost
│   │   │   │           ├── __init__.py
│   │   │   │           ├── authreturn.py
│   │   │   │           ├── common.py
│   │   │   │           ├── customerinfo.py
│   │   │   │           ├── discovery.py
│   │   │   │           ├── manifest.py
│   │   │   │           ├── merchantregistration.py
│   │   │   │           ├── messages.py
│   │   │   │           ├── ncshipment.py
│   │   │   │           ├── openreturn.py
│   │   │   │           ├── pickup.py
│   │   │   │           ├── pickuprequest.py
│   │   │   │           ├── postoffice.py
│   │   │   │           ├── rating.py
│   │   │   │           ├── serviceinfo.py
│   │   │   │           ├── shipment.py
│   │   │   │           └── track.py
│   │   │   ├── schemas
│   │   │   │   ├── authreturn.xsd
│   │   │   │   ├── common.xsd
│   │   │   │   ├── customerinfo.xsd
│   │   │   │   ├── discovery.xsd
│   │   │   │   ├── manifest.xsd
│   │   │   │   ├── merchantregistration.xsd
│   │   │   │   ├── messages.xsd
│   │   │   │   ├── ncshipment.xsd
│   │   │   │   ├── openreturn.xsd
│   │   │   │   ├── pickup.xsd
│   │   │   │   ├── pickuprequest.xsd
│   │   │   │   ├── postoffice.xsd
│   │   │   │   ├── rating.xsd
│   │   │   │   ├── serviceinfo.xsd
│   │   │   │   ├── shipment.xsd
│   │   │   │   └── track.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── canadapost
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_manifest.py
│   │   │           ├── test_pickup.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── canpar
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── canpar
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── canpar
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── address.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── label.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── canpar
│   │   │   │           ├── CanparAddonsService.py
│   │   │   │           ├── CanparRatingService.py
│   │   │   │           ├── CanshipBusinessService.py
│   │   │   │           └── __init__.py
│   │   │   ├── schemas
│   │   │   │   ├── CanparAddonsService.xsd
│   │   │   │   ├── CanparRatingService.xsd
│   │   │   │   └── CanshipBusinessService.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── canpar
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_address.py
│   │   │           ├── test_pickup.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── chronopost
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── chronopost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── chronopost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── chronopost
│   │   │   │           ├── __init__.py
│   │   │   │           ├── quickcostservice.py
│   │   │   │           ├── shippingservice.py
│   │   │   │           └── trackingservice.py
│   │   │   ├── schemas
│   │   │   │   ├── QuickcostServiceWS.xsd
│   │   │   │   ├── ShippingServiceWS.xsd
│   │   │   │   └── TrackingServiceWS.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── chronopost
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── colissimo
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── colissimo
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── colissimo
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── colissimo
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── label_request.py
│   │   │   │           ├── label_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── label_request.json
│   │   │   │   ├── label_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── colissimo
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── dhl_express
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── dhl_express
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── dhl_express
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── address.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── dhl_express
│   │   │   │           ├── __init__.py
│   │   │   │           ├── book_pickup_global_req_3_0.py
│   │   │   │           ├── book_pickup_global_res_3_0.py
│   │   │   │           ├── cancel_pickup_global_req_3_0.py
│   │   │   │           ├── cancel_pickup_global_res.py
│   │   │   │           ├── datatypes.py
│   │   │   │           ├── datatypes_global.py
│   │   │   │           ├── datatypes_global_v10.py
│   │   │   │           ├── datatypes_global_v62.py
│   │   │   │           ├── datatypes_global_v62b.py
│   │   │   │           ├── dct_req_global_3_0.py
│   │   │   │           ├── dct_requestdatatypes.py
│   │   │   │           ├── dct_requestdatatypes_global.py
│   │   │   │           ├── dct_response_global_3_0.py
│   │   │   │           ├── dct_responsedatatypes_global.py
│   │   │   │           ├── err_res.py
│   │   │   │           ├── modify_pickup_global_req_3_0.py
│   │   │   │           ├── modify_pickup_global_res_3_0.py
│   │   │   │           ├── pickup_err_res.py
│   │   │   │           ├── pickup_res.py
│   │   │   │           ├── pickupdatatypes_global.py
│   │   │   │           ├── pickupdatatypes_global_3_0.py
│   │   │   │           ├── routing_global_req_2_0.py
│   │   │   │           ├── routing_global_res.py
│   │   │   │           ├── ship_val_err_res.py
│   │   │   │           ├── ship_val_global_req_10_0.py
│   │   │   │           ├── ship_val_global_res_10_0.py
│   │   │   │           ├── track_err_res.py
│   │   │   │           ├── tracking_request_known_1_0.py
│   │   │   │           ├── tracking_request_unknown_1_0.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── DCT-Response_global-3.0.xsd
│   │   │   │   ├── DCT-req_global-3.0.xsd
│   │   │   │   ├── DCTRequestdatatypes.xsd
│   │   │   │   ├── DCTRequestdatatypes_global.xsd
│   │   │   │   ├── DCTResponsedatatypes_global.xsd
│   │   │   │   ├── TrackingRequestKnown-1.0.xsd
│   │   │   │   ├── TrackingRequestUnknown-1.0.xsd
│   │   │   │   ├── TrackingResponse.xsd
│   │   │   │   ├── book-pickup-global-req-3.0.xsd
│   │   │   │   ├── book-pickup-global-res-3.0.xsd
│   │   │   │   ├── cancel-pickup-global-req-3.0.xsd
│   │   │   │   ├── cancel-pickup-global-res.xsd
│   │   │   │   ├── datatypes.xsd
│   │   │   │   ├── datatypes_global.xsd
│   │   │   │   ├── datatypes_global_v10.xsd
│   │   │   │   ├── datatypes_global_v62.xsd
│   │   │   │   ├── datatypes_global_v62b.xsd
│   │   │   │   ├── err-res.xsd
│   │   │   │   ├── modify-pickup-global-req-3.0.xsd
│   │   │   │   ├── modify-pickup-global-res-3.0.xsd
│   │   │   │   ├── pickup-err-res.xsd
│   │   │   │   ├── pickup-res.xsd
│   │   │   │   ├── pickupdatatypes_global-3.0.xsd
│   │   │   │   ├── pickupdatatypes_global.xsd
│   │   │   │   ├── routing-global-req-2.0.xsd
│   │   │   │   ├── routing-global-res.xsd
│   │   │   │   ├── ship-val-err-res.xsd
│   │   │   │   ├── ship-val-global-req-10.0.xsd
│   │   │   │   ├── ship-val-global-res-10.0.xsd
│   │   │   │   └── track-err-res.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── dhl_express
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_address.py
│   │   │           ├── test_pickup.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── dhl_parcel_de
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── dhl_parcel_de
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── dhl_parcel_de
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── dhl_parcel_de
│   │   │   │           ├── __init__.py
│   │   │   │           ├── cancel_response.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── shipping_request.py
│   │   │   │           ├── shipping_response.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── cancel_response.json
│   │   │   │   ├── error_response.json
│   │   │   │   ├── shipping_request.json
│   │   │   │   ├── shipping_response.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── dhl_parcel_de
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── dhl_poland
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── dhl_poland
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── dhl_poland
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── dhl_poland
│   │   │   │           ├── __init__.py
│   │   │   │           └── services.py
│   │   │   ├── schemas
│   │   │   │   └── webapi2.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── dhl_poland
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── dhl_universal
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── dhl_universal
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── dhl_universal
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── dhl_universal
│   │   │   │           ├── __init__.py
│   │   │   │           └── tracking.py
│   │   │   ├── schemas
│   │   │   │   └── tracking.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── dhl_universal
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           └── test_tracking.py
│   │   ├── dicom
│   │   │   ├── README.md
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── dicom
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── dicom
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── dicom
│   │   │   │           ├── __init__.py
│   │   │   │           ├── pickups.py
│   │   │   │           ├── rates.py
│   │   │   │           ├── shipments.py
│   │   │   │           └── tracking.py
│   │   │   ├── schemas
│   │   │   │   ├── pickups.json
│   │   │   │   ├── rates.json
│   │   │   │   ├── shipments.json
│   │   │   │   └── tracking.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── dicom
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           └── test_tracking.py
│   │   ├── dpd
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── dpd
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── dpd
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── dpd
│   │   │   │           ├── Authentication20.py
│   │   │   │           ├── EndOfDayServiceV10.py
│   │   │   │           ├── LoginServiceV21.py
│   │   │   │           ├── ParcelLifecycleServiceV20.py
│   │   │   │           ├── ParcelShopFinderServiceV50.py
│   │   │   │           ├── ShipmentServiceV33.py
│   │   │   │           └── __init__.py
│   │   │   ├── schemas
│   │   │   │   ├── Authentication20.xsd
│   │   │   │   ├── EndOfDayServiceV10.xsd
│   │   │   │   ├── LoginServiceV21.xsd
│   │   │   │   ├── ParcelLifecycleServiceV20.xsd
│   │   │   │   ├── ParcelShopFinderServiceV50.xsd
│   │   │   │   └── ShipmentServiceV33.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── dpd
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_login.py
│   │   │           ├── test_rating.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── dpdhl
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── dpdhl
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── dpdhl
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── dpdhl
│   │   │   │           ├── __init__.py
│   │   │   │           ├── business_interface.py
│   │   │   │           ├── customer_interface.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── geschaeftskundenversand-api-3.4.0-schema-bcs_base.xsd
│   │   │   │   ├── geschaeftskundenversand-api-3.4.0-schema-cis_base.xsd
│   │   │   │   ├── tracking-request.xsd
│   │   │   │   └── tracking-response.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── dpdhl
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── easypost
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── easypost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── easypost
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── easypost
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── shipment_purchase.py
│   │   │   │           ├── shipment_request.py
│   │   │   │           ├── shipments_response.py
│   │   │   │           └── trackers_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── shipment_purchase.json
│   │   │   │   ├── shipment_request.json
│   │   │   │   ├── shipments_response.json
│   │   │   │   └── trackers_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── easypost
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── easyship
│   │   │   ├── MANIFEST.in
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── easyship
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── easyship
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── manifest.py
│   │   │   │   │       ├── metadata.json
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── easyship
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── manifest_request.py
│   │   │   │           ├── manifest_response.py
│   │   │   │           ├── pickup_cancel_response.py
│   │   │   │           ├── pickup_request.py
│   │   │   │           ├── pickup_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── shipment_cancel_response.py
│   │   │   │           ├── shipment_request.py
│   │   │   │           ├── shipment_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── label_request.json
│   │   │   │   ├── label_response.json
│   │   │   │   ├── manifest_request.json
│   │   │   │   ├── manifest_response.json
│   │   │   │   ├── pickup_cancel_response.json
│   │   │   │   ├── pickup_request.json
│   │   │   │   ├── pickup_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── shipment_cancel_response.json
│   │   │   │   ├── shipment_request.json
│   │   │   │   ├── shipment_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── easyship
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_manifest.py
│   │   │           ├── test_pickup.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── eshipper
│   │   │   ├── MANIFEST.in
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── eshipper
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── eshipper
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── metadata.json
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── eshipper
│   │   │   │           ├── __init__.py
│   │   │   │           ├── cancel_request.py
│   │   │   │           ├── cancel_response.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── pickup_cancel_response.py
│   │   │   │           ├── pickup_request.py
│   │   │   │           ├── pickup_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── shipping_request.py
│   │   │   │           ├── shipping_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── cancel_request.json
│   │   │   │   ├── cancel_response.json
│   │   │   │   ├── error_response.json
│   │   │   │   ├── pickup_cancel_response.json
│   │   │   │   ├── pickup_request.json
│   │   │   │   ├── pickup_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── shipping_request.json
│   │   │   │   ├── shipping_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── eshipper
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── fedex
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── fedex
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── fedex
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── document.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── fedex
│   │   │   │           ├── __init__.py
│   │   │   │           ├── cancel_pickup_request.py
│   │   │   │           ├── cancel_pickup_response.py
│   │   │   │           ├── cancel_request.py
│   │   │   │           ├── cancel_response.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── paperless_request.py
│   │   │   │           ├── paperless_response.py
│   │   │   │           ├── pickup_request.py
│   │   │   │           ├── pickup_response.py
│   │   │   │           ├── rating_request.py
│   │   │   │           ├── rating_responses.py
│   │   │   │           ├── shipping_request.py
│   │   │   │           ├── shipping_responses.py
│   │   │   │           ├── tracking_document_request.py
│   │   │   │           ├── tracking_document_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── cancel_pickup_request.json
│   │   │   │   ├── cancel_pickup_response.json
│   │   │   │   ├── cancel_request.json
│   │   │   │   ├── cancel_response.json
│   │   │   │   ├── error_response.json
│   │   │   │   ├── paperless_request.json
│   │   │   │   ├── paperless_response.json
│   │   │   │   ├── pickup_request.json
│   │   │   │   ├── pickup_response.json
│   │   │   │   ├── rating_request.json
│   │   │   │   ├── rating_responses.json
│   │   │   │   ├── shipping_request.json
│   │   │   │   ├── shipping_responses.json
│   │   │   │   ├── tracking_document_request.json
│   │   │   │   ├── tracking_document_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── fedex
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_document.py
│   │   │           ├── test_pickup.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── fedex_ws
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── fedex_ws
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── fedex_ws
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── address.py
│   │   │   │   │       ├── document.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── availability.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── fedex_ws
│   │   │   │           ├── __init__.py
│   │   │   │           ├── address_validation_service_v4.py
│   │   │   │           ├── async_service_v4.py
│   │   │   │           ├── close_service_v5.py
│   │   │   │           ├── dgds_service_v5.py
│   │   │   │           ├── dgld_service_v1.py
│   │   │   │           ├── in_flight_shipment_service_v1.py
│   │   │   │           ├── location_service_v12.py
│   │   │   │           ├── open_ship_service_v18.py
│   │   │   │           ├── pickup_service_v22.py
│   │   │   │           ├── rate_service_v28.py
│   │   │   │           ├── ship_service_v26.py
│   │   │   │           ├── track_service_v19.py
│   │   │   │           ├── upload_document_service_v17.py
│   │   │   │           └── validation_availability_and_commitment_service_v15.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── paperless_request.json
│   │   │   │   ├── paperless_response.json
│   │   │   │   ├── rating_request.json
│   │   │   │   ├── rating_response.json
│   │   │   │   ├── shipping_cancel_request.json
│   │   │   │   ├── shipping_cancel_response.json
│   │   │   │   ├── shipping_request.json
│   │   │   │   ├── shipping_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── fedex_ws
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_address.py
│   │   │           ├── test_document.py
│   │   │           ├── test_pickup.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── freightcom
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── freightcom
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── freightcom
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── quote.py
│   │   │   │   │       ├── shipping.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       ├── utils.py
│   │   │   │   │       └── void_shipment.py
│   │   │   │   └── schemas
│   │   │   │       └── freightcom
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error.py
│   │   │   │           ├── quote_reply.py
│   │   │   │           ├── quote_request.py
│   │   │   │           ├── shipment_cancel_reply.py
│   │   │   │           ├── shipment_cancel_request.py
│   │   │   │           ├── shipping_reply.py
│   │   │   │           └── shipping_request.py
│   │   │   ├── setup.py
│   │   │   ├── tests
│   │   │   │   ├── __init__.py
│   │   │   │   └── freightcom
│   │   │   │       ├── __init__.py
│   │   │   │       ├── fixture.py
│   │   │   │       ├── test_rate.py
│   │   │   │       └── test_shipment.py
│   │   │   └── vendor
│   │   │       ├── documentation
│   │   │       │   └── Freightcom API v3.2.3.pdf
│   │   │       ├── sample
│   │   │       │   ├── sample_quote_reply.xml
│   │   │       │   ├── sample_quote_request.xml
│   │   │       │   ├── sample_shipment_cancel_reply.xml
│   │   │       │   ├── sample_shipment_cancel_request.xml
│   │   │       │   ├── sample_shipping_reply.xml
│   │   │       │   └── sample_shipping_request.xml
│   │   │       └── schemas
│   │   │           ├── error.xsd
│   │   │           ├── quote_reply.xsd
│   │   │           ├── quote_request.xsd
│   │   │           ├── shipment_cancel_reply.xsd
│   │   │           ├── shipment_cancel_request.xsd
│   │   │           ├── shipping_reply.xsd
│   │   │           └── shipping_request.xsd
│   │   ├── generic
│   │   │   ├── README.md
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── generic
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   └── providers
│   │   │   │       └── generic
│   │   │   │           ├── __init__.py
│   │   │   │           ├── units.py
│   │   │   │           └── utils.py
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── generic
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           └── test_shipment.py
│   │   ├── geodis
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── geodis
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── geodis
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── geodis
│   │   │   │           ├── __init__.py
│   │   │   │           ├── cancel_request.py
│   │   │   │           ├── cancel_response.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── shipping_request.py
│   │   │   │           ├── shipping_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── cancel_request.json
│   │   │   │   ├── cancel_response.json
│   │   │   │   ├── error_response.json
│   │   │   │   ├── shipping_request.json
│   │   │   │   ├── shipping_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── geodis
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── hay_post
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── hay_post
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── hay_post
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── hay_post
│   │   │   │           ├── __init__.py
│   │   │   │           ├── auth_request.py
│   │   │   │           ├── auth_response.py
│   │   │   │           ├── error.py
│   │   │   │           ├── order_create_request.py
│   │   │   │           ├── order_create_response.py
│   │   │   │           ├── order_tracking_request.py
│   │   │   │           ├── order_tracking_response.py
│   │   │   │           └── tariff_request.py
│   │   │   ├── schemas
│   │   │   │   ├── auth_request.json
│   │   │   │   ├── auth_response.json
│   │   │   │   ├── error.json
│   │   │   │   ├── order_create_request.json
│   │   │   │   ├── order_create_response.json
│   │   │   │   ├── order_tracking_request.json
│   │   │   │   ├── order_tracking_response.json
│   │   │   │   └── tariff_request.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── hay_post
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── laposte
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── laposte
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── laposte
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── laposte
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── laposte
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           └── test_tracking.py
│   │   ├── locate2u
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── locate2u
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── locate2u
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── locate2u
│   │   │   │           ├── __init__.py
│   │   │   │           ├── shipping_request.py
│   │   │   │           ├── shipping_response.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── shipping_request.json
│   │   │   │   ├── shipping_response.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── locate2u
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_login.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── mydhl
│   │   │   ├── README.md
│   │   │   ├── _tests
│   │   │   │   ├── __init__.py
│   │   │   │   └── mydhl
│   │   │   │       ├── __init__.py
│   │   │   │       ├── fixture.py
│   │   │   │       ├── test_document.py
│   │   │   │       ├── test_pickup.py
│   │   │   │       ├── test_rate.py
│   │   │   │       ├── test_shipment.py
│   │   │   │       └── test_tracking.py
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── mydhl
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── mydhl
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── document.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── mydhl
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── pickup_cancel_request.py
│   │   │   │           ├── pickup_request.py
│   │   │   │           ├── pickup_response.py
│   │   │   │           ├── pickup_update.py
│   │   │   │           ├── pickup_update_response.py
│   │   │   │           ├── rating_request.py
│   │   │   │           ├── rating_response.py
│   │   │   │           ├── shipping_requests.py
│   │   │   │           ├── shipping_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           ├── tracking_response.py
│   │   │   │           └── upload_request.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── pickup_cancel_request.json
│   │   │   │   ├── pickup_request.json
│   │   │   │   ├── pickup_response.json
│   │   │   │   ├── pickup_update.json
│   │   │   │   ├── pickup_update_response.json
│   │   │   │   ├── rating_request.json
│   │   │   │   ├── rating_response.json
│   │   │   │   ├── shipping_requests.json
│   │   │   │   ├── shipping_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   ├── tracking_response.json
│   │   │   │   └── upload_request.json
│   │   │   └── setup.py
│   │   ├── nationex
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── nationex
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── nationex
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── nationex
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── shipment_request.py
│   │   │   │           ├── shipment_response.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── shipment_request.json
│   │   │   │   ├── shipment_response.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── nationex
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── purolator
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── purolator
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── purolator
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── address.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   ├── update.py
│   │   │   │   │       │   └── validate.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── documents.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── purolator
│   │   │   │           ├── __init__.py
│   │   │   │           ├── array_ofstring.py
│   │   │   │           ├── data_types.py
│   │   │   │           ├── estimate_service_2_1_2.py
│   │   │   │           ├── freight_data_types.py
│   │   │   │           ├── freight_estimate_service_1_1_0.py
│   │   │   │           ├── freight_pickup_service_1_1_0.py
│   │   │   │           ├── freight_shipment_service_1_1_0.py
│   │   │   │           ├── freight_tracking_service_1_1_0.py
│   │   │   │           ├── freight_validation_detail.py
│   │   │   │           ├── freight_validation_fault.py
│   │   │   │           ├── locator_service_1_0_2.py
│   │   │   │           ├── pickup_service_1_2_1.py
│   │   │   │           ├── returns_management_service_2_0.py
│   │   │   │           ├── service_availability_service_2_0_2.py
│   │   │   │           ├── shipping_documents_service_1_3_0.py
│   │   │   │           ├── shipping_service_2_1_3.py
│   │   │   │           ├── tracking_service_1_2_2.py
│   │   │   │           ├── validation_detail.py
│   │   │   │           └── validation_fault.py
│   │   │   ├── schemas
│   │   │   │   ├── ArrayOfstring.xsd
│   │   │   │   ├── DataTypes.xsd
│   │   │   │   ├── EstimateService.xsd
│   │   │   │   ├── FreightDataTypes.xsd
│   │   │   │   ├── FreightEstimateService.xsd
│   │   │   │   ├── FreightPickupService.xsd
│   │   │   │   ├── FreightShipmentService.xsd
│   │   │   │   ├── FreightTrackingService.xsd
│   │   │   │   ├── FreightValidationDetail.xsd
│   │   │   │   ├── FreightValidationFault.xsd
│   │   │   │   ├── LocatorService.xsd
│   │   │   │   ├── PickupService.xsd
│   │   │   │   ├── ReturnsManagementService.xsd
│   │   │   │   ├── ServiceAvailabilityService.xsd
│   │   │   │   ├── ShippingDocumentsService.xsd
│   │   │   │   ├── ShippingService.xsd
│   │   │   │   ├── TrackingService.xsd
│   │   │   │   ├── ValidationDetail.xsd
│   │   │   │   └── ValidationFault.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── purolator
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_address.py
│   │   │           ├── test_pickup.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── roadie
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── roadie
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── roadie
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── roadie
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── shipment_request.py
│   │   │   │           ├── shipment_response.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── shipment_request.json
│   │   │   │   ├── shipment_response.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── roadie
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── royalmail
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── royalmail
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── royalmail
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── royalmail
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error.py
│   │   │   │           └── tracking.py
│   │   │   ├── schemas
│   │   │   │   ├── errors.json
│   │   │   │   └── tracking.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── royalmail
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           └── test_tracking.py
│   │   ├── sapient
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── sapient
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── sapient
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── sapient
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── pickup_request.py
│   │   │   │           ├── pickup_response.py
│   │   │   │           ├── shipment_requests.py
│   │   │   │           └── shipment_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── pickup_request.json
│   │   │   │   ├── pickup_response.json
│   │   │   │   ├── shipment_requests.json
│   │   │   │   └── shipment_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── sapient
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_pickup.py
│   │   │           └── test_shipment.py
│   │   ├── seko
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── seko
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── seko
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── manifest.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── seko
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── manifest_response.py
│   │   │   │           ├── rating_request.py
│   │   │   │           ├── rating_response.py
│   │   │   │           ├── shipping_request.py
│   │   │   │           ├── shipping_response.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── manifest_response.json
│   │   │   │   ├── rating_request.json
│   │   │   │   ├── rating_response.json
│   │   │   │   ├── shipping_request.json
│   │   │   │   ├── shipping_response.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── seko
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_manifest.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── sendle
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── sendle
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── sendle
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── sendle
│   │   │   │           ├── __init__.py
│   │   │   │           ├── cancel_request.py
│   │   │   │           ├── cancel_response.py
│   │   │   │           ├── error_responses.py
│   │   │   │           ├── order_request.py
│   │   │   │           ├── order_response.py
│   │   │   │           ├── product_request.py
│   │   │   │           ├── product_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── cancel_request.json
│   │   │   │   ├── cancel_response.json
│   │   │   │   ├── error_responses.json
│   │   │   │   ├── order_request.json
│   │   │   │   ├── order_response.json
│   │   │   │   ├── product_request.json
│   │   │   │   ├── product_response.json
│   │   │   │   ├── tracking_request.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── sendle
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── tge
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── tge
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── tge
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── manifest.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── tge
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── label_request.py
│   │   │   │           ├── label_response.py
│   │   │   │           ├── manifest_request.py
│   │   │   │           ├── manifest_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           └── rate_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── label_request.json
│   │   │   │   ├── label_response.json
│   │   │   │   ├── manifest_request.json
│   │   │   │   ├── manifest_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   └── rate_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── tge
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_manifest.py
│   │   │           ├── test_rate.py
│   │   │           └── test_shipment.py
│   │   ├── tnt
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── tnt
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── tnt
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── tnt
│   │   │   │           ├── __init__.py
│   │   │   │           ├── label_common_definitions.py
│   │   │   │           ├── label_request.py
│   │   │   │           ├── label_response.py
│   │   │   │           ├── rating_common_definitions.py
│   │   │   │           ├── rating_request.py
│   │   │   │           ├── rating_response.py
│   │   │   │           ├── shipping_common_definitions.py
│   │   │   │           ├── shipping_request.py
│   │   │   │           ├── shipping_response.py
│   │   │   │           ├── tracking_request.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── label_common_definitions.xsd
│   │   │   │   ├── label_request.xsd
│   │   │   │   ├── label_response.xsd
│   │   │   │   ├── rating_common_definitions.xsd
│   │   │   │   ├── rating_request.xsd
│   │   │   │   ├── rating_response.xsd
│   │   │   │   ├── shipping_common_definitions.xsd
│   │   │   │   ├── shipping_request.xsd
│   │   │   │   ├── shipping_response.xsd
│   │   │   │   ├── tracking_request.xsd
│   │   │   │   └── tracking_response.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── tnt
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── tnt_it
│   │   │   ├── Manuale-ExpressConnect-FedEx compliant .pdf
│   │   │   ├── README.md
│   │   │   ├── _setup.py
│   │   │   ├── _tests
│   │   │   │   ├── __init__.py
│   │   │   │   └── tnt_it
│   │   │   │       ├── __init__.py
│   │   │   │       ├── fixture.py
│   │   │   │       ├── test_rate.py
│   │   │   │       ├── test_shipment.py
│   │   │   │       └── test_tracking.py
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── tnt_it
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── tnt_it
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── tnt_it
│   │   │   │           ├── __init__.py
│   │   │   │           ├── rating.py
│   │   │   │           ├── routinglabel.py
│   │   │   │           └── tracking.py
│   │   │   └── schemas
│   │   │       ├── rating.xsd
│   │   │       ├── routinglabel.xsd
│   │   │       └── tracking.xsd
│   │   ├── ups
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── ups
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── ups
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── document.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── ups
│   │   │   │           ├── __init__.py
│   │   │   │           ├── document_upload_request.py
│   │   │   │           ├── document_upload_response.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── rating_request.py
│   │   │   │           ├── rating_response.py
│   │   │   │           ├── shipping_cancel_response.py
│   │   │   │           ├── shipping_request.py
│   │   │   │           ├── shipping_response.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── document_upload_request.json
│   │   │   │   ├── document_upload_response.json
│   │   │   │   ├── error_response.json
│   │   │   │   ├── rating_request.json
│   │   │   │   ├── rating_responses.json
│   │   │   │   ├── shipping_cancel_response.json
│   │   │   │   ├── shipping_request.json
│   │   │   │   ├── shipping_response.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── ups
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_document.py
│   │   │           ├── test_login.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── usps
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── usps
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── usps
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── manifest.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── usps
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── label_request.py
│   │   │   │           ├── label_response.py
│   │   │   │           ├── pickup_request.py
│   │   │   │           ├── pickup_response.py
│   │   │   │           ├── pickup_update_request.py
│   │   │   │           ├── pickup_update_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── scan_form_request.py
│   │   │   │           ├── scan_form_response.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── label_request.json
│   │   │   │   ├── label_response.json
│   │   │   │   ├── pickup_request.json
│   │   │   │   ├── pickup_response.json
│   │   │   │   ├── pickup_update_request.json
│   │   │   │   ├── pickup_update_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── scan_form_request.json
│   │   │   │   ├── scan_form_response.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── usps
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_manifest.py
│   │   │           ├── test_pickup.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── usps_international
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── usps_international
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── usps_international
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── manifest.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── usps_international
│   │   │   │           ├── __init__.py
│   │   │   │           ├── error_response.py
│   │   │   │           ├── label_request.py
│   │   │   │           ├── label_response.py
│   │   │   │           ├── pickup_request.py
│   │   │   │           ├── pickup_response.py
│   │   │   │           ├── pickup_update_request.py
│   │   │   │           ├── pickup_update_response.py
│   │   │   │           ├── rate_request.py
│   │   │   │           ├── rate_response.py
│   │   │   │           ├── scan_form_request.py
│   │   │   │           ├── scan_form_response.py
│   │   │   │           └── tracking_response.py
│   │   │   ├── schemas
│   │   │   │   ├── error_response.json
│   │   │   │   ├── label_request.json
│   │   │   │   ├── label_response.json
│   │   │   │   ├── pickup_request.json
│   │   │   │   ├── pickup_response.json
│   │   │   │   ├── pickup_update_request.json
│   │   │   │   ├── pickup_update_response.json
│   │   │   │   ├── rate_request.json
│   │   │   │   ├── rate_response.json
│   │   │   │   ├── scan_form_request.json
│   │   │   │   ├── scan_form_response.json
│   │   │   │   └── tracking_response.json
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── usps_international
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_manifest.py
│   │   │           ├── test_pickup.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── usps_wt
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── usps_wt
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── usps_wt
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   └── create.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── usps_wt
│   │   │   │           ├── __init__.py
│   │   │   │           ├── address_validate_request.py
│   │   │   │           ├── address_validate_response.py
│   │   │   │           ├── carrier_pickup_availability_request.py
│   │   │   │           ├── carrier_pickup_availability_response.py
│   │   │   │           ├── carrier_pickup_cancel_request.py
│   │   │   │           ├── carrier_pickup_cancel_response.py
│   │   │   │           ├── carrier_pickup_change_request.py
│   │   │   │           ├── carrier_pickup_change_response.py
│   │   │   │           ├── carrier_pickup_inquiry_request.py
│   │   │   │           ├── carrier_pickup_inquiry_response.py
│   │   │   │           ├── carrier_pickup_schedule_request.py
│   │   │   │           ├── carrier_pickup_schedule_response.py
│   │   │   │           ├── city_state_lookup_request.py
│   │   │   │           ├── city_state_lookup_response.py
│   │   │   │           ├── emrsv4_0_bulk_request.py
│   │   │   │           ├── error.py
│   │   │   │           ├── evs_cancel_request.py
│   │   │   │           ├── evs_cancel_response.py
│   │   │   │           ├── evs_express_mail_intl_request.py
│   │   │   │           ├── evs_express_mail_intl_response.py
│   │   │   │           ├── evs_first_class_mail_intl_request.py
│   │   │   │           ├── evs_first_class_mail_intl_response.py
│   │   │   │           ├── evs_gxg_get_label_request.py
│   │   │   │           ├── evs_gxg_get_label_response.py
│   │   │   │           ├── evs_priority_mail_intl_request.py
│   │   │   │           ├── evs_priority_mail_intl_response.py
│   │   │   │           ├── evs_request.py
│   │   │   │           ├── evs_response.py
│   │   │   │           ├── evsi_cancel_request.py
│   │   │   │           ├── evsi_cancel_response.py
│   │   │   │           ├── express_mail_commitment_request.py
│   │   │   │           ├── express_mail_commitment_response.py
│   │   │   │           ├── first_class_mail_request.py
│   │   │   │           ├── first_class_mail_response.py
│   │   │   │           ├── hfp_facility_info_request.py
│   │   │   │           ├── hfp_facility_info_response.py
│   │   │   │           ├── intl_rate_v2_request.py
│   │   │   │           ├── intl_rate_v2_response.py
│   │   │   │           ├── mrsv4_0_request.py
│   │   │   │           ├── priority_mail_request.py
│   │   │   │           ├── priority_mail_response.py
│   │   │   │           ├── pts_email_request.py
│   │   │   │           ├── pts_emailresult.py
│   │   │   │           ├── ptspod_result.py
│   │   │   │           ├── ptsrre_result.py
│   │   │   │           ├── ptstpod_request.py
│   │   │   │           ├── ptstpod_result.py
│   │   │   │           ├── rate_v4_request.py
│   │   │   │           ├── rate_v4_response.py
│   │   │   │           ├── scan_request.py
│   │   │   │           ├── scan_response.py
│   │   │   │           ├── sdc_get_locations_request.py
│   │   │   │           ├── sdc_get_locations_response.py
│   │   │   │           ├── standard_b_request.py
│   │   │   │           ├── standard_b_response.py
│   │   │   │           ├── track_field_request.py
│   │   │   │           ├── track_request.py
│   │   │   │           ├── track_response.py
│   │   │   │           ├── zip_code_lookup_request.py
│   │   │   │           └── zip_code_lookup_response.py
│   │   │   ├── schemas
│   │   │   │   ├── AddressValidateRequest.xsd
│   │   │   │   ├── AddressValidateResponse.xsd
│   │   │   │   ├── CarrierPickupAvailabilityRequest.xsd
│   │   │   │   ├── CarrierPickupAvailabilityResponse.xsd
│   │   │   │   ├── CarrierPickupCancelRequest.xsd
│   │   │   │   ├── CarrierPickupCancelResponse.xsd
│   │   │   │   ├── CarrierPickupChangeRequest.xsd
│   │   │   │   ├── CarrierPickupChangeResponse.xsd
│   │   │   │   ├── CarrierPickupInquiryRequest.xsd
│   │   │   │   ├── CarrierPickupInquiryResponse.xsd
│   │   │   │   ├── CarrierPickupScheduleRequest.xsd
│   │   │   │   ├── CarrierPickupScheduleResponse.xsd
│   │   │   │   ├── CityStateLookupRequest.xsd
│   │   │   │   ├── CityStateLookupResponse.xsd
│   │   │   │   ├── EMRSV4.0BulkRequest.xsd
│   │   │   │   ├── Error.xsd
│   │   │   │   ├── ExpressMailCommitmentRequest.xsd
│   │   │   │   ├── ExpressMailCommitmentResponse.xsd
│   │   │   │   ├── FirstClassMailRequest.xsd
│   │   │   │   ├── FirstClassMailResponse.xsd
│   │   │   │   ├── HFPFacilityInfoRequest.xsd
│   │   │   │   ├── HFPFacilityInfoResponse.xsd
│   │   │   │   ├── IntlRateV2Request.xsd
│   │   │   │   ├── IntlRateV2Response.xsd
│   │   │   │   ├── MRSV4.0Request.xsd
│   │   │   │   ├── PTSEmailRequest.xsd
│   │   │   │   ├── PTSEmailResult.xsd
│   │   │   │   ├── PTSPODRequest.xsd
│   │   │   │   ├── PTSPODResult.xsd
│   │   │   │   ├── PTSRRERequest.xsd
│   │   │   │   ├── PTSRREResult.xsd
│   │   │   │   ├── PTSTPODResult.xsd
│   │   │   │   ├── PTSTPodRequest.xsd
│   │   │   │   ├── PriorityMailRequest.xsd
│   │   │   │   ├── PriorityMailResponse.xsd
│   │   │   │   ├── RateV4Request.xsd
│   │   │   │   ├── RateV4Response.xsd
│   │   │   │   ├── SCANRequest.xsd
│   │   │   │   ├── SCANResponse.xsd
│   │   │   │   ├── SDCGetLocationsRequest.xsd
│   │   │   │   ├── SDCGetLocationsResponse.xsd
│   │   │   │   ├── StandardBRequest.xsd
│   │   │   │   ├── StandardBResponse.xsd
│   │   │   │   ├── TrackFieldRequest.xsd
│   │   │   │   ├── TrackRequest.xsd
│   │   │   │   ├── TrackResponse.xsd
│   │   │   │   ├── ZipCodeLookupRequest.xsd
│   │   │   │   ├── ZipCodeLookupResponse.xsd
│   │   │   │   ├── eVSCancelRequest.xsd
│   │   │   │   ├── eVSCancelResponse.xsd
│   │   │   │   ├── eVSExpressMailIntlRequest.xsd
│   │   │   │   ├── eVSExpressMailIntlResponse.xsd
│   │   │   │   ├── eVSFirstClassMailIntlRequest.xsd
│   │   │   │   ├── eVSFirstClassMailIntlResponse.xsd
│   │   │   │   ├── eVSGXGGetLabelRequest.xsd
│   │   │   │   ├── eVSGXGGetLabelResponse.xsd
│   │   │   │   ├── eVSICancelRequest.xsd
│   │   │   │   ├── eVSICancelResponse.xsd
│   │   │   │   ├── eVSPriorityMailIntlRequest.xsd
│   │   │   │   ├── eVSPriorityMailIntlResponse.xsd
│   │   │   │   ├── eVSRequest.xsd
│   │   │   │   └── eVSResponse.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── usps_wt
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment.py
│   │   │           └── test_tracking.py
│   │   ├── usps_wt_international
│   │   │   ├── README.md
│   │   │   ├── generate
│   │   │   ├── karrio
│   │   │   │   ├── mappers
│   │   │   │   │   └── usps_wt_international
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── mapper.py
│   │   │   │   │       ├── proxy.py
│   │   │   │   │       └── settings.py
│   │   │   │   ├── providers
│   │   │   │   │   └── usps_wt_international
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── error.py
│   │   │   │   │       ├── pickup
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   └── update.py
│   │   │   │   │       ├── rate.py
│   │   │   │   │       ├── shipment
│   │   │   │   │       │   ├── __init__.py
│   │   │   │   │       │   ├── cancel.py
│   │   │   │   │       │   ├── create.py
│   │   │   │   │       │   ├── first_class_mail.py
│   │   │   │   │       │   ├── global_express_guaranteed.py
│   │   │   │   │       │   ├── priority_express.py
│   │   │   │   │       │   └── priority_mail.py
│   │   │   │   │       ├── tracking.py
│   │   │   │   │       ├── units.py
│   │   │   │   │       └── utils.py
│   │   │   │   └── schemas
│   │   │   │       └── usps_wt_international
│   │   │   │           ├── __init__.py
│   │   │   │           ├── address_validate_request.py
│   │   │   │           ├── address_validate_response.py
│   │   │   │           ├── carrier_pickup_availability_request.py
│   │   │   │           ├── carrier_pickup_availability_response.py
│   │   │   │           ├── carrier_pickup_cancel_request.py
│   │   │   │           ├── carrier_pickup_cancel_response.py
│   │   │   │           ├── carrier_pickup_change_request.py
│   │   │   │           ├── carrier_pickup_change_response.py
│   │   │   │           ├── carrier_pickup_inquiry_request.py
│   │   │   │           ├── carrier_pickup_inquiry_response.py
│   │   │   │           ├── carrier_pickup_schedule_request.py
│   │   │   │           ├── carrier_pickup_schedule_response.py
│   │   │   │           ├── city_state_lookup_request.py
│   │   │   │           ├── city_state_lookup_response.py
│   │   │   │           ├── emrsv4_0_bulk_request.py
│   │   │   │           ├── error.py
│   │   │   │           ├── evs_cancel_request.py
│   │   │   │           ├── evs_cancel_response.py
│   │   │   │           ├── evs_express_mail_intl_request.py
│   │   │   │           ├── evs_express_mail_intl_response.py
│   │   │   │           ├── evs_first_class_mail_intl_request.py
│   │   │   │           ├── evs_first_class_mail_intl_response.py
│   │   │   │           ├── evs_gxg_get_label_request.py
│   │   │   │           ├── evs_gxg_get_label_response.py
│   │   │   │           ├── evs_priority_mail_intl_request.py
│   │   │   │           ├── evs_priority_mail_intl_response.py
│   │   │   │           ├── evs_request.py
│   │   │   │           ├── evs_response.py
│   │   │   │           ├── evsi_cancel_request.py
│   │   │   │           ├── evsi_cancel_response.py
│   │   │   │           ├── express_mail_commitment_request.py
│   │   │   │           ├── express_mail_commitment_response.py
│   │   │   │           ├── first_class_mail_request.py
│   │   │   │           ├── first_class_mail_response.py
│   │   │   │           ├── hfp_facility_info_request.py
│   │   │   │           ├── hfp_facility_info_response.py
│   │   │   │           ├── intl_rate_v2_request.py
│   │   │   │           ├── intl_rate_v2_response.py
│   │   │   │           ├── mrsv4_0_request.py
│   │   │   │           ├── priority_mail_request.py
│   │   │   │           ├── priority_mail_response.py
│   │   │   │           ├── pts_email_request.py
│   │   │   │           ├── pts_emailresult.py
│   │   │   │           ├── ptspod_result.py
│   │   │   │           ├── ptsrre_result.py
│   │   │   │           ├── ptstpod_request.py
│   │   │   │           ├── ptstpod_result.py
│   │   │   │           ├── rate_v4_request.py
│   │   │   │           ├── rate_v4_response.py
│   │   │   │           ├── scan_request.py
│   │   │   │           ├── scan_response.py
│   │   │   │           ├── sdc_get_locations_request.py
│   │   │   │           ├── sdc_get_locations_response.py
│   │   │   │           ├── standard_b_request.py
│   │   │   │           ├── standard_b_response.py
│   │   │   │           ├── track_field_request.py
│   │   │   │           ├── track_request.py
│   │   │   │           ├── track_response.py
│   │   │   │           ├── zip_code_lookup_request.py
│   │   │   │           └── zip_code_lookup_response.py
│   │   │   ├── schemas
│   │   │   │   ├── AddressValidateRequest.xsd
│   │   │   │   ├── AddressValidateResponse.xsd
│   │   │   │   ├── CarrierPickupAvailabilityRequest.xsd
│   │   │   │   ├── CarrierPickupAvailabilityResponse.xsd
│   │   │   │   ├── CarrierPickupCancelRequest.xsd
│   │   │   │   ├── CarrierPickupCancelResponse.xsd
│   │   │   │   ├── CarrierPickupChangeRequest.xsd
│   │   │   │   ├── CarrierPickupChangeResponse.xsd
│   │   │   │   ├── CarrierPickupInquiryRequest.xsd
│   │   │   │   ├── CarrierPickupInquiryResponse.xsd
│   │   │   │   ├── CarrierPickupScheduleRequest.xsd
│   │   │   │   ├── CarrierPickupScheduleResponse.xsd
│   │   │   │   ├── CityStateLookupRequest.xsd
│   │   │   │   ├── CityStateLookupResponse.xsd
│   │   │   │   ├── EMRSV4.0BulkRequest.xsd
│   │   │   │   ├── Error.xsd
│   │   │   │   ├── ExpressMailCommitmentRequest.xsd
│   │   │   │   ├── ExpressMailCommitmentResponse.xsd
│   │   │   │   ├── FirstClassMailRequest.xsd
│   │   │   │   ├── FirstClassMailResponse.xsd
│   │   │   │   ├── HFPFacilityInfoRequest.xsd
│   │   │   │   ├── HFPFacilityInfoResponse.xsd
│   │   │   │   ├── IntlRateV2Request.xsd
│   │   │   │   ├── IntlRateV2Response.xsd
│   │   │   │   ├── MRSV4.0Request.xsd
│   │   │   │   ├── PTSEmailRequest.xsd
│   │   │   │   ├── PTSEmailResult.xsd
│   │   │   │   ├── PTSPODRequest.xsd
│   │   │   │   ├── PTSPODResult.xsd
│   │   │   │   ├── PTSRRERequest.xsd
│   │   │   │   ├── PTSRREResult.xsd
│   │   │   │   ├── PTSTPODResult.xsd
│   │   │   │   ├── PTSTPodRequest.xsd
│   │   │   │   ├── PriorityMailRequest.xsd
│   │   │   │   ├── PriorityMailResponse.xsd
│   │   │   │   ├── RateV4Request.xsd
│   │   │   │   ├── RateV4Response.xsd
│   │   │   │   ├── SCANRequest.xsd
│   │   │   │   ├── SCANResponse.xsd
│   │   │   │   ├── SDCGetLocationsRequest.xsd
│   │   │   │   ├── SDCGetLocationsResponse.xsd
│   │   │   │   ├── StandardBRequest.xsd
│   │   │   │   ├── StandardBResponse.xsd
│   │   │   │   ├── TrackFieldRequest.xsd
│   │   │   │   ├── TrackRequest.xsd
│   │   │   │   ├── TrackResponse.xsd
│   │   │   │   ├── ZipCodeLookupRequest.xsd
│   │   │   │   ├── ZipCodeLookupResponse.xsd
│   │   │   │   ├── eVSCancelRequest.xsd
│   │   │   │   ├── eVSCancelResponse.xsd
│   │   │   │   ├── eVSExpressMailIntlRequest.xsd
│   │   │   │   ├── eVSExpressMailIntlResponse.xsd
│   │   │   │   ├── eVSFirstClassMailIntlRequest.xsd
│   │   │   │   ├── eVSFirstClassMailIntlResponse.xsd
│   │   │   │   ├── eVSGXGGetLabelRequest.xsd
│   │   │   │   ├── eVSGXGGetLabelResponse.xsd
│   │   │   │   ├── eVSICancelRequest.xsd
│   │   │   │   ├── eVSICancelResponse.xsd
│   │   │   │   ├── eVSPriorityMailIntlRequest.xsd
│   │   │   │   ├── eVSPriorityMailIntlResponse.xsd
│   │   │   │   ├── eVSRequest.xsd
│   │   │   │   └── eVSResponse.xsd
│   │   │   ├── setup.py
│   │   │   └── tests
│   │   │       ├── __init__.py
│   │   │       └── usps_wt_international
│   │   │           ├── __init__.py
│   │   │           ├── fixture.py
│   │   │           ├── test_rate.py
│   │   │           ├── test_shipment
│   │   │           │   ├── __init__.py
│   │   │           │   ├── test_first_class.py
│   │   │           │   ├── test_global_express_guaranteed.py
│   │   │           │   ├── test_priority_express.py
│   │   │           │   └── test_priority_mail.py
│   │   │           └── test_tracking.py
│   │   └── zoom2u
│   │       ├── README.md
│   │       ├── generate
│   │       ├── karrio
│   │       │   ├── mappers
│   │       │   │   └── zoom2u
│   │       │   │       ├── __init__.py
│   │       │   │       ├── mapper.py
│   │       │   │       ├── proxy.py
│   │       │   │       └── settings.py
│   │       │   ├── providers
│   │       │   │   └── zoom2u
│   │       │   │       ├── __init__.py
│   │       │   │       ├── error.py
│   │       │   │       ├── rate.py
│   │       │   │       ├── shipment
│   │       │   │       │   ├── __init__.py
│   │       │   │       │   ├── cancel.py
│   │       │   │       │   └── create.py
│   │       │   │       ├── tracking.py
│   │       │   │       ├── units.py
│   │       │   │       └── utils.py
│   │       │   └── schemas
│   │       │       └── zoom2u
│   │       │           ├── __init__.py
│   │       │           ├── error_response.py
│   │       │           ├── rate_request.py
│   │       │           ├── rate_response.py
│   │       │           ├── shipping_request.py
│   │       │           ├── shipping_response.py
│   │       │           └── tracking_response.py
│   │       ├── schemas
│   │       │   ├── error_response.json
│   │       │   ├── rate_request.json
│   │       │   ├── rate_response.json
│   │       │   ├── shipping_request.json
│   │       │   ├── shipping_response.json
│   │       │   └── tracking_response.json
│   │       ├── setup.py
│   │       └── tests
│   │           ├── __init__.py
│   │           └── zoom2u
│   │               ├── __init__.py
│   │               ├── fixture.py
│   │               ├── test_rate.py
│   │               ├── test_shipment.py
│   │               └── test_tracking.py
│   ├── core
│   │   ├── MANIFEST.in
│   │   ├── README.md
│   │   ├── karrio
│   │   │   └── server
│   │   │       ├── conf.py
│   │   │       ├── core
│   │   │       │   ├── __init__.py
│   │   │       │   ├── admin.py
│   │   │       │   ├── apps.py
│   │   │       │   ├── authentication.py
│   │   │       │   ├── context_processors.py
│   │   │       │   ├── datatypes.py
│   │   │       │   ├── dataunits.py
│   │   │       │   ├── exceptions.py
│   │   │       │   ├── fields.py
│   │   │       │   ├── filters.py
│   │   │       │   ├── gateway.py
│   │   │       │   ├── middleware.py
│   │   │       │   ├── migrations
│   │   │       │   │   ├── 0001_initial.py
│   │   │       │   │   ├── 0002_apilogindex.py
│   │   │       │   │   ├── 0003_apilogindex_test_mode.py
│   │   │       │   │   ├── 0004_metafield.py
│   │   │       │   │   └── __init__.py
│   │   │       │   ├── models
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   ├── base.py
│   │   │       │   │   ├── entity.py
│   │   │       │   │   ├── metafield.py
│   │   │       │   │   └── third_party.py
│   │   │       │   ├── oauth_validators.py
│   │   │       │   ├── permissions.py
│   │   │       │   ├── renderers.py
│   │   │       │   ├── router.py
│   │   │       │   ├── serializers.py
│   │   │       │   ├── signals.py
│   │   │       │   ├── tests.py
│   │   │       │   ├── urls.py
│   │   │       │   ├── utils.py
│   │   │       │   ├── validators.py
│   │   │       │   └── views
│   │   │       │       ├── __init__.py
│   │   │       │       ├── api.py
│   │   │       │       ├── metadata.py
│   │   │       │       ├── references.py
│   │   │       │       └── schema.py
│   │   │       ├── filters
│   │   │       │   ├── __init__.py
│   │   │       │   └── abstract.py
│   │   │       ├── iam
│   │   │       │   ├── __init__.py
│   │   │       │   ├── admin.py
│   │   │       │   ├── apps.py
│   │   │       │   ├── migrations
│   │   │       │   │   ├── 0001_initial.py
│   │   │       │   │   └── __init__.py
│   │   │       │   ├── models.py
│   │   │       │   ├── permissions.py
│   │   │       │   ├── serializers.py
│   │   │       │   ├── signals.py
│   │   │       │   ├── tests.py
│   │   │       │   └── views.py
│   │   │       ├── openapi.py
│   │   │       ├── providers
│   │   │       │   ├── __init__.py
│   │   │       │   ├── admin.py
│   │   │       │   ├── apps.py
│   │   │       │   ├── extension
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   └── models
│   │   │       │   │       ├── __init__.py
│   │   │       │   │       ├── allied_express.py
│   │   │       │   │       ├── allied_express_local.py
│   │   │       │   │       ├── amazon_shipping.py
│   │   │       │   │       ├── aramex.py
│   │   │       │   │       ├── asendia_us.py
│   │   │       │   │       ├── australiapost.py
│   │   │       │   │       ├── boxknight.py
│   │   │       │   │       ├── bpost.py
│   │   │       │   │       ├── canadapost.py
│   │   │       │   │       ├── canpar.py
│   │   │       │   │       ├── chronopost.py
│   │   │       │   │       ├── colissimo.py
│   │   │       │   │       ├── dhl_express.py
│   │   │       │   │       ├── dhl_parcel_de.py
│   │   │       │   │       ├── dhl_poland.py
│   │   │       │   │       ├── dhl_universal.py
│   │   │       │   │       ├── dicom.py
│   │   │       │   │       ├── dpd.py
│   │   │       │   │       ├── dpdhl.py
│   │   │       │   │       ├── easypost.py
│   │   │       │   │       ├── eshipper.py
│   │   │       │   │       ├── fedex.py
│   │   │       │   │       ├── fedex_ws.py
│   │   │       │   │       ├── freightcom.py
│   │   │       │   │       ├── generic.py
│   │   │       │   │       ├── geodis.py
│   │   │       │   │       ├── hay_post.py
│   │   │       │   │       ├── laposte.py
│   │   │       │   │       ├── locate2u.py
│   │   │       │   │       ├── nationex.py
│   │   │       │   │       ├── purolator.py
│   │   │       │   │       ├── roadie.py
│   │   │       │   │       ├── royalmail.py
│   │   │       │   │       ├── sendle.py
│   │   │       │   │       ├── tge.py
│   │   │       │   │       ├── tnt.py
│   │   │       │   │       ├── ups.py
│   │   │       │   │       ├── usps.py
│   │   │       │   │       ├── usps_international.py
│   │   │       │   │       ├── usps_wt.py
│   │   │       │   │       ├── usps_wt_international.py
│   │   │       │   │       └── zoom2u.py
│   │   │       │   ├── migrations
│   │   │       │   │   ├── 0001_initial.py
│   │   │       │   │   ├── 0002_carrier_active.py
│   │   │       │   │   ├── 0003_auto_20201230_0820.py
│   │   │       │   │   ├── 0004_auto_20210212_0554.py
│   │   │       │   │   ├── 0005_auto_20210212_0555.py
│   │   │       │   │   ├── 0006_australiapostsettings.py
│   │   │       │   │   ├── 0007_auto_20210213_0206.py
│   │   │       │   │   ├── 0008_auto_20210214_0409.py
│   │   │       │   │   ├── 0009_auto_20210308_0302.py
│   │   │       │   │   ├── 0010_auto_20210409_0852.py
│   │   │       │   │   ├── 0011_auto_20210409_0853.py
│   │   │       │   │   ├── 0012_alter_carrier_options.py
│   │   │       │   │   ├── 0013_tntsettings.py
│   │   │       │   │   ├── 0014_auto_20210612_1608.py
│   │   │       │   │   ├── 0015_auto_20210615_1601.py
│   │   │       │   │   ├── 0016_alter_purolatorsettings_user_token.py
│   │   │       │   │   ├── 0017_auto_20210805_0359.py
│   │   │       │   │   ├── 0018_alter_fedexsettings_user_key.py
│   │   │       │   │   ├── 0019_dhlpolandsettings_servicelevel.py
│   │   │       │   │   ├── 0020_genericsettings_labeltemplate.py
│   │   │       │   │   ├── 0021_auto_20211231_2353.py
│   │   │       │   │   ├── 0022_carrier_metadata.py
│   │   │       │   │   ├── 0023_auto_20220124_1916.py
│   │   │       │   │   ├── 0024_alter_genericsettings_custom_carrier_name.py
│   │   │       │   │   ├── 0025_alter_servicelevel_service_code.py
│   │   │       │   │   ├── 0026_auto_20220208_0132.py
│   │   │       │   │   ├── 0027_auto_20220304_1340.py
│   │   │       │   │   ├── 0028_auto_20220323_1500.py
│   │   │       │   │   ├── 0029_easypostsettings.py
│   │   │       │   │   ├── 0030_amazonmwssettings.py
│   │   │       │   │   ├── 0031_delete_amazonmwssettings.py
│   │   │       │   │   ├── 0032_alter_carrier_test.py
│   │   │       │   │   ├── 0033_auto_20220708_1350.py
│   │   │       │   │   ├── 0034_amazonmwssettings_dpdhlsettings.py
│   │   │       │   │   ├── 0035_alter_carrier_capabilities.py
│   │   │       │   │   ├── 0036_upsfreightsettings.py
│   │   │       │   │   ├── 0037_chronopostsettings.py
│   │   │       │   │   ├── 0038_alter_genericsettings_label_template.py
│   │   │       │   │   ├── 0039_auto_20220906_0612.py
│   │   │       │   │   ├── 0040_dpdhlsettings_services.py
│   │   │       │   │   ├── 0041_auto_20221105_0705.py
│   │   │       │   │   ├── 0042_auto_20221215_1642.py
│   │   │       │   │   ├── 0043_alter_genericsettings_account_number_and_more.py
│   │   │       │   │   ├── 0044_carrier_carrier_capabilities.py
│   │   │       │   │   ├── 0045_alter_carrier_active_alter_carrier_carrier_id.py
│   │   │       │   │   ├── 0046_remove_dpdhlsettings_signature_and_more.py
│   │   │       │   │   ├── 0047_dpdsettings.py
│   │   │       │   │   ├── 0048_servicelevel_min_weight_servicelevel_transit_days_and_more.py
│   │   │       │   │   ├── 0049_boxknightsettings_geodissettings_lapostesettings_and_more.py
│   │   │       │   │   ├── 0050_carrier_is_system_alter_carrier_metadata_and_more.py
│   │   │       │   │   ├── 0051_rename_username_upssettings_client_id_and_more.py
│   │   │       │   │   ├── 0052_alter_upssettings_account_number_and_more.py
│   │   │       │   │   ├── 0053_locate2usettings.py
│   │   │       │   │   ├── 0054_zoom2usettings.py
│   │   │       │   │   ├── 0055_rename_amazonmwssettings_amazonshippingsettings_and_more.py
│   │   │       │   │   ├── 0056_asendiaussettings_geodissettings_code_client_and_more.py
│   │   │       │   │   ├── 0057_alter_servicelevel_weight_unit_belgianpostsettings.py
│   │   │       │   │   ├── 0058_alliedexpresssettings.py
│   │   │       │   │   ├── 0059_ratesheet.py
│   │   │       │   │   ├── 0060_belgianpostsettings_rate_sheet_and_more.py
│   │   │       │   │   ├── 0061_alliedexpresssettings_service_type.py
│   │   │       │   │   ├── 0062_sendlesettings_account_country_code.py
│   │   │       │   │   ├── 0063_servicelevel_metadata.py
│   │   │       │   │   ├── 0064_alliedexpresslocalsettings.py
│   │   │       │   │   ├── 0065_servicelevel_carrier_service_code_and_more.py
│   │   │       │   │   ├── 0066_rename_fedexsettings_fedexwssettings_and_more.py
│   │   │       │   │   ├── 0067_fedexsettings.py
│   │   │       │   │   ├── 0068_fedexsettings_track_api_key_and_more.py
│   │   │       │   │   ├── 0069_alter_canadapostsettings_contract_id_and_more.py
│   │   │       │   │   ├── 0070_tgesettings_alter_carrier_capabilities.py
│   │   │       │   │   ├── 0071_alter_tgesettings_my_toll_token.py
│   │   │       │   │   ├── 0072_rename_eshippersettings_eshipperxmlsettings_and_more.py
│   │   │       │   │   ├── 0073_delete_eshipperxmlsettings.py
│   │   │       │   │   ├── 0074_eshippersettings.py
│   │   │       │   │   ├── 0075_haypostsettings.py
│   │   │       │   │   ├── 0076_rename_customer_registration_id_uspsinternationalsettings_account_number_and_more.py
│   │   │       │   │   ├── 0077_uspswtinternationalsettings_uspswtsettings_and_more.py
│   │   │       │   │   ├── 0078_auto_20240813_1552.py
│   │   │       │   │   ├── 0079_alter_carrier_options_alter_ratesheet_created_by.py
│   │   │       │   │   ├── 0080_alter_aramexsettings_account_country_code_and_more.py
│   │   │       │   │   └── __init__.py
│   │   │       │   ├── models
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   ├── carrier.py
│   │   │       │   │   ├── config.py
│   │   │       │   │   ├── service.py
│   │   │       │   │   ├── sheet.py
│   │   │       │   │   ├── template.py
│   │   │       │   │   └── utils.py
│   │   │       │   ├── router.py
│   │   │       │   ├── serializers
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   └── base.py
│   │   │       │   ├── signals.py
│   │   │       │   ├── tests.py
│   │   │       │   ├── urls.py
│   │   │       │   └── views
│   │   │       │       ├── __init__.py
│   │   │       │       ├── carriers.py
│   │   │       │       └── connections.py
│   │   │       ├── samples.py
│   │   │       ├── serializers
│   │   │       │   ├── __init__.py
│   │   │       │   └── abstract.py
│   │   │       ├── tracing
│   │   │       │   ├── __init__.py
│   │   │       │   ├── admin.py
│   │   │       │   ├── apps.py
│   │   │       │   ├── migrations
│   │   │       │   │   ├── 0001_initial.py
│   │   │       │   │   ├── 0002_auto_20220710_1307.py
│   │   │       │   │   ├── 0003_auto_20221105_0317.py
│   │   │       │   │   ├── 0004_tracingrecord_carrier_account_idx.py
│   │   │       │   │   ├── 0005_optimise_tracingrecord_request_log_idx.py
│   │   │       │   │   ├── 0006_alter_tracingrecord_options_and_more.py
│   │   │       │   │   └── __init__.py
│   │   │       │   ├── models.py
│   │   │       │   ├── tests.py
│   │   │       │   └── utils.py
│   │   │       └── user
│   │   │           ├── __init__.py
│   │   │           ├── admin.py
│   │   │           ├── apps.py
│   │   │           ├── forms.py
│   │   │           ├── migrations
│   │   │           │   ├── 0001_initial.py
│   │   │           │   ├── 0002_token.py
│   │   │           │   ├── 0003_token_test_mode.py
│   │   │           │   ├── 0004_group.py
│   │   │           │   ├── 0005_token_label.py
│   │   │           │   ├── 0006_workspaceconfig.py
│   │   │           │   └── __init__.py
│   │   │           ├── models.py
│   │   │           ├── serializers.py
│   │   │           ├── templates
│   │   │           │   └── registration
│   │   │           │       ├── login.html
│   │   │           │       ├── registration_confirm_email.html
│   │   │           │       └── registration_confirm_email.txt
│   │   │           ├── tests.py
│   │   │           ├── urls.py
│   │   │           ├── utils.py
│   │   │           └── views.py
│   │   └── setup.py
│   ├── data
│   │   ├── README.md
│   │   ├── karrio
│   │   │   └── server
│   │   │       ├── data
│   │   │       │   ├── __init__.py
│   │   │       │   ├── admin.py
│   │   │       │   ├── apps.py
│   │   │       │   ├── filters.py
│   │   │       │   ├── migrations
│   │   │       │   │   ├── 0001_initial.py
│   │   │       │   │   ├── 0002_alter_batchoperation_resource_type_and_more.py
│   │   │       │   │   ├── 0003_datatemplate_metadata_alter_batchoperation_resources.py
│   │   │       │   │   └── __init__.py
│   │   │       │   ├── models.py
│   │   │       │   ├── resources
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   ├── orders.py
│   │   │       │   │   ├── shipments.py
│   │   │       │   │   └── trackers.py
│   │   │       │   ├── serializers
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   ├── base.py
│   │   │       │   │   ├── batch.py
│   │   │       │   │   ├── batch_orders.py
│   │   │       │   │   ├── batch_shipments.py
│   │   │       │   │   ├── batch_trackers.py
│   │   │       │   │   └── data.py
│   │   │       │   ├── signals.py
│   │   │       │   ├── tests.py
│   │   │       │   ├── urls.py
│   │   │       │   └── views
│   │   │       │       ├── __init__.py
│   │   │       │       ├── batch.py
│   │   │       │       ├── batch_order.py
│   │   │       │       ├── batch_shipment.py
│   │   │       │       ├── batch_tracking.py
│   │   │       │       └── data.py
│   │   │       ├── events
│   │   │       │   └── task_definitions
│   │   │       │       ├── __init__.py
│   │   │       │       └── data
│   │   │       │           ├── __init__.py
│   │   │       │           ├── batch.py
│   │   │       │           └── shipments.py
│   │   │       ├── graph
│   │   │       │   └── schemas
│   │   │       │       ├── __init__.py
│   │   │       │       └── data
│   │   │       │           ├── __init__.py
│   │   │       │           ├── inputs.py
│   │   │       │           ├── mutations.py
│   │   │       │           └── types.py
│   │   │       └── settings
│   │   │           └── data.py
│   │   └── setup.py
│   ├── documents
│   │   ├── README.md
│   │   ├── karrio
│   │   │   └── server
│   │   │       ├── documents
│   │   │       │   ├── __init__.py
│   │   │       │   ├── admin.py
│   │   │       │   ├── apps.py
│   │   │       │   ├── filters.py
│   │   │       │   ├── generator.py
│   │   │       │   ├── migrations
│   │   │       │   │   ├── 0001_initial.py
│   │   │       │   │   ├── 0002_alter_documenttemplate_related_objects.py
│   │   │       │   │   ├── 0003_rename_related_objects_documenttemplate_related_object.py
│   │   │       │   │   ├── 0004_documenttemplate_active.py
│   │   │       │   │   ├── 0005_alter_documenttemplate_description_and_more.py
│   │   │       │   │   ├── 0006_documenttemplate_metadata.py
│   │   │       │   │   ├── 0007_alter_documenttemplate_related_object.py
│   │   │       │   │   ├── 0008_documenttemplate_options.py
│   │   │       │   │   └── __init__.py
│   │   │       │   ├── models.py
│   │   │       │   ├── serializers
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   ├── base.py
│   │   │       │   │   └── documents.py
│   │   │       │   ├── signals.py
│   │   │       │   ├── tests.py
│   │   │       │   ├── urls.py
│   │   │       │   ├── utils.py
│   │   │       │   └── views
│   │   │       │       ├── __init__.py
│   │   │       │       ├── printers.py
│   │   │       │       └── templates.py
│   │   │       └── graph
│   │   │           └── schemas
│   │   │               ├── __init__.py
│   │   │               └── documents
│   │   │                   ├── __init__.py
│   │   │                   ├── inputs.py
│   │   │                   ├── mutations.py
│   │   │                   └── types.py
│   │   └── setup.py
│   ├── events
│   │   ├── README.md
│   │   ├── karrio
│   │   │   └── server
│   │   │       ├── events
│   │   │       │   ├── __init__.py
│   │   │       │   ├── admin.py
│   │   │       │   ├── apps.py
│   │   │       │   ├── filters.py
│   │   │       │   ├── migrations
│   │   │       │   │   ├── 0001_initial.py
│   │   │       │   │   ├── 0002_event.py
│   │   │       │   │   ├── 0003_auto_20220303_1210.py
│   │   │       │   │   ├── 0004_custom_migration_2022_4.py
│   │   │       │   │   ├── 0005_event_event_object_idx.py
│   │   │       │   │   ├── 0006_webhook_events_alter_event_data.py
│   │   │       │   │   ├── 0007_auto_20221130_0255.py
│   │   │       │   │   ├── 0008_alter_event_type.py
│   │   │       │   │   ├── 0009_alter_webhook_enabled_events.py
│   │   │       │   │   └── __init__.py
│   │   │       │   ├── models.py
│   │   │       │   ├── router.py
│   │   │       │   ├── serializers
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   ├── base.py
│   │   │       │   │   ├── event.py
│   │   │       │   │   └── webhook.py
│   │   │       │   ├── signals.py
│   │   │       │   ├── task_definitions
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   └── base
│   │   │       │   │       ├── __init__.py
│   │   │       │   │       ├── archiving.py
│   │   │       │   │       ├── tracking.py
│   │   │       │   │       └── webhook.py
│   │   │       │   ├── tasks.py
│   │   │       │   ├── tests
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   ├── test_events.py
│   │   │       │   │   ├── test_tracking_tasks.py
│   │   │       │   │   └── test_webhooks.py
│   │   │       │   ├── tests.py
│   │   │       │   ├── urls.py
│   │   │       │   └── views
│   │   │       │       ├── __init__.py
│   │   │       │       └── webhooks.py
│   │   │       └── graph
│   │   │           └── schemas
│   │   │               ├── __init__.py
│   │   │               └── events
│   │   │                   ├── __init__.py
│   │   │                   ├── inputs.py
│   │   │                   ├── mutations.py
│   │   │                   └── types.py
│   │   └── setup.py
│   ├── graph
│   │   ├── MANIFEST.in
│   │   ├── README.md
│   │   ├── karrio
│   │   │   └── server
│   │   │       ├── graph
│   │   │       │   ├── __init__.py
│   │   │       │   ├── admin.py
│   │   │       │   ├── apps.py
│   │   │       │   ├── forms.py
│   │   │       │   ├── management
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   └── commands
│   │   │       │   │       ├── __init__.py
│   │   │       │   │       └── export_schema.py
│   │   │       │   ├── migrations
│   │   │       │   │   ├── 0001_initial.py
│   │   │       │   │   ├── 0002_auto_20210512_1353.py
│   │   │       │   │   └── __init__.py
│   │   │       │   ├── models.py
│   │   │       │   ├── schema.py
│   │   │       │   ├── schemas
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   └── base
│   │   │       │   │       ├── __init__.py
│   │   │       │   │       ├── inputs.py
│   │   │       │   │       ├── mutations.py
│   │   │       │   │       └── types.py
│   │   │       │   ├── serializers.py
│   │   │       │   ├── templates
│   │   │       │   │   ├── graphql
│   │   │       │   │   │   └── graphiql.html
│   │   │       │   │   └── karrio
│   │   │       │   │       ├── email_change_email.html
│   │   │       │   │       ├── email_change_email.txt
│   │   │       │   │       └── password_reset_email.html
│   │   │       │   ├── tests
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   ├── base.py
│   │   │       │   │   ├── test_carrier_connections.py
│   │   │       │   │   ├── test_rate_sheets.py
│   │   │       │   │   ├── test_templates.py
│   │   │       │   │   └── test_user_info.py
│   │   │       │   ├── urls.py
│   │   │       │   ├── utils.py
│   │   │       │   └── views.py
│   │   │       └── settings
│   │   │           └── graph.py
│   │   └── setup.py
│   ├── manager
│   │   ├── README.md
│   │   ├── karrio
│   │   │   └── server
│   │   │       └── manager
│   │   │           ├── __init__.py
│   │   │           ├── admin.py
│   │   │           ├── apps.py
│   │   │           ├── migrations
│   │   │           │   ├── 0001_initial.py
│   │   │           │   ├── 0002_auto_20201127_0721.py
│   │   │           │   ├── 0003_auto_20201230_0820.py
│   │   │           │   ├── 0004_auto_20210125_2125.py
│   │   │           │   ├── 0005_auto_20210216_0758.py
│   │   │           │   ├── 0006_auto_20210307_0438.py
│   │   │           │   ├── 0006_auto_20210308_0302.py
│   │   │           │   ├── 0007_merge_20210311_1428.py
│   │   │           │   ├── 0008_remove_shipment_doc_images.py
│   │   │           │   ├── 0009_auto_20210326_1425.py
│   │   │           │   ├── 0010_auto_20210403_1404.py
│   │   │           │   ├── 0011_auto_20210426_1924.py
│   │   │           │   ├── 0012_auto_20210427_1319.py
│   │   │           │   ├── 0013_customs_invoice_date.py
│   │   │           │   ├── 0014_auto_20210515_0928.py
│   │   │           │   ├── 0015_auto_20210601_0340.py
│   │   │           │   ├── 0016_shipment_archived.py
│   │   │           │   ├── 0017_auto_20210629_1650.py
│   │   │           │   ├── 0018_auto_20210705_1049.py
│   │   │           │   ├── 0019_auto_20210722_1131.py
│   │   │           │   ├── 0020_tracking_messages.py
│   │   │           │   ├── 0021_tracking_estimated_delivery.py
│   │   │           │   ├── 0022_auto_20211122_2100.py
│   │   │           │   ├── 0023_auto_20211227_2141.py
│   │   │           │   ├── 0024_alter_parcel_items.py
│   │   │           │   ├── 0025_auto_20220113_1158.py
│   │   │           │   ├── 0026_parcel_reference_number.py
│   │   │           │   ├── 0027_custom_migration_2021_1.py
│   │   │           │   ├── 0028_auto_20220303_1153.py
│   │   │           │   ├── 0029_auto_20220303_1249.py
│   │   │           │   ├── 0030_alter_shipment_status.py
│   │   │           │   ├── 0031_shipment_invoice.py
│   │   │           │   ├── 0032_custom_migration_2022_3.py
│   │   │           │   ├── 0033_auto_20220504_1335.py
│   │   │           │   ├── 0034_commodity_hs_code.py
│   │   │           │   ├── 0035_parcel_options.py
│   │   │           │   ├── 0036_alter_tracking_shipment.py
│   │   │           │   ├── 0037_auto_20220710_1350.py
│   │   │           │   ├── 0038_alter_tracking_status.py
│   │   │           │   ├── 0039_documentuploadrecord.py
│   │   │           │   ├── 0040_parcel_freight_class.py
│   │   │           │   ├── 0041_alter_commodity_options_alter_parcel_options.py
│   │   │           │   ├── 0042_remove_shipment_shipment_tracking_number_idx_and_more.py
│   │   │           │   ├── 0043_customs_duty_billing_address_and_more.py
│   │   │           │   ├── 0044_address_address_line1_temp_and_more.py
│   │   │           │   ├── 0045_alter_customs_duty_billing_address_and_more.py
│   │   │           │   ├── 0046_auto_20230114_0930.py
│   │   │           │   ├── 0047_remove_shipment_shipment_tracking_number_idx_and_more.py
│   │   │           │   ├── 0048_commodity_title_alter_commodity_description_and_more.py
│   │   │           │   ├── 0049_auto_20230318_0708.py
│   │   │           │   ├── 0050_address_street_number_tracking_account_number_and_more.py
│   │   │           │   ├── 0051_auto_20230330_0556.py
│   │   │           │   ├── 0052_auto_20230520_0811.py
│   │   │           │   ├── 0053_alter_commodity_weight_unit_alter_parcel_weight_unit.py
│   │   │           │   ├── 0054_alter_address_company_name_alter_address_person_name.py
│   │   │           │   ├── 0055_alter_tracking_status.py
│   │   │           │   ├── 0056_tracking_delivery_image_tracking_signature_image.py
│   │   │           │   ├── 0057_alter_customs_invoice_date.py
│   │   │           │   ├── 0058_manifest_shipment_manifest.py
│   │   │           │   ├── 0059_shipment_return_address.py
│   │   │           │   ├── 0060_pickup_meta_alter_address_country_code_and_more.py
│   │   │           │   ├── 0061_alter_customs_incoterm.py
│   │   │           │   └── __init__.py
│   │   │           ├── models.py
│   │   │           ├── router.py
│   │   │           ├── serializers
│   │   │           │   ├── __init__.py
│   │   │           │   ├── address.py
│   │   │           │   ├── commodity.py
│   │   │           │   ├── customs.py
│   │   │           │   ├── document.py
│   │   │           │   ├── manifest.py
│   │   │           │   ├── parcel.py
│   │   │           │   ├── pickup.py
│   │   │           │   ├── rate.py
│   │   │           │   ├── shipment.py
│   │   │           │   └── tracking.py
│   │   │           ├── signals.py
│   │   │           ├── tests
│   │   │           │   ├── __init__.py
│   │   │           │   ├── test_addresses.py
│   │   │           │   ├── test_custom_infos.py
│   │   │           │   ├── test_parcels.py
│   │   │           │   ├── test_pickups.py
│   │   │           │   ├── test_shipments.py
│   │   │           │   └── test_trackers.py
│   │   │           ├── urls.py
│   │   │           └── views
│   │   │               ├── __init__.py
│   │   │               ├── addresses.py
│   │   │               ├── customs.py
│   │   │               ├── documents.py
│   │   │               ├── manifests.py
│   │   │               ├── parcels.py
│   │   │               ├── pickups.py
│   │   │               ├── shipments.py
│   │   │               └── trackers.py
│   │   └── setup.py
│   ├── orders
│   │   ├── README.md
│   │   ├── karrio
│   │   │   └── server
│   │   │       ├── graph
│   │   │       │   └── schemas
│   │   │       │       ├── __init__.py
│   │   │       │       └── orders
│   │   │       │           ├── __init__.py
│   │   │       │           ├── inputs.py
│   │   │       │           ├── mutations.py
│   │   │       │           └── types.py
│   │   │       ├── orders
│   │   │       │   ├── __init__.py
│   │   │       │   ├── admin.py
│   │   │       │   ├── apps.py
│   │   │       │   ├── filters.py
│   │   │       │   ├── migrations
│   │   │       │   │   ├── 0001_initial.py
│   │   │       │   │   ├── 0002_auto_20211231_2353.py
│   │   │       │   │   ├── 0003_alter_order_shipping_address.py
│   │   │       │   │   ├── 0004_alter_order_status.py
│   │   │       │   │   ├── 0005_auto_20220303_1153.py
│   │   │       │   │   ├── 0006_alter_order_shipping_to.py
│   │   │       │   │   ├── 0007_alter_order_line_items.py
│   │   │       │   │   ├── 0008_alter_order_status.py
│   │   │       │   │   ├── 0009_auto_20220321_1535.py
│   │   │       │   │   ├── 0010_auto_20220324_2031.py
│   │   │       │   │   ├── 0011_order_billing_address.py
│   │   │       │   │   ├── 0012_order_order_id_idx.py
│   │   │       │   │   ├── 0014_order_meta.py
│   │   │       │   │   ├── 0015_remove_order_order_id_idx_alter_order_order_id_and_more.py
│   │   │       │   │   ├── 0016_order_shipments.py
│   │   │       │   │   └── __init__.py
│   │   │       │   ├── models.py
│   │   │       │   ├── router.py
│   │   │       │   ├── serializers
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   ├── base.py
│   │   │       │   │   └── order.py
│   │   │       │   ├── signals.py
│   │   │       │   ├── tests
│   │   │       │   │   ├── __init__.py
│   │   │       │   │   └── test_orders.py
│   │   │       │   ├── urls.py
│   │   │       │   └── views.py
│   │   │       └── settings
│   │   │           └── orders.py
│   │   └── setup.py
│   ├── pricing
│   │   ├── README.md
│   │   ├── karrio
│   │   │   └── server
│   │   │       └── pricing
│   │   │           ├── __init__.py
│   │   │           ├── admin.py
│   │   │           ├── apps.py
│   │   │           ├── migrations
│   │   │           │   ├── 0001_initial.py
│   │   │           │   ├── 0002_auto_20201127_0721.py
│   │   │           │   ├── 0003_auto_20201230_0820.py
│   │   │           │   ├── 0004_auto_20201231_1402.py
│   │   │           │   ├── 0005_auto_20210204_1725.py
│   │   │           │   ├── 0006_auto_20210217_1109.py
│   │   │           │   ├── 0007_auto_20210218_1202.py
│   │   │           │   ├── 0008_auto_20210418_0504.py
│   │   │           │   ├── 0009_auto_20210603_2149.py
│   │   │           │   ├── 0010_auto_20210612_1608.py
│   │   │           │   ├── 0011_auto_20210615_1601.py
│   │   │           │   ├── 0012_surcharge_carrier_accounts.py
│   │   │           │   ├── 0013_alter_surcharge_services.py
│   │   │           │   ├── 0014_auto_20211013_1520.py
│   │   │           │   ├── 0015_auto_20211204_1350.py
│   │   │           │   ├── 0016_auto_20211220_1500.py
│   │   │           │   ├── 0017_alter_surcharge_services.py
│   │   │           │   ├── 0018_alter_surcharge_services.py
│   │   │           │   ├── 0019_alter_surcharge_services.py
│   │   │           │   ├── 0020_auto_20220412_1215.py
│   │   │           │   ├── 0021_auto_20220413_0959.py
│   │   │           │   ├── 0022_alter_surcharge_services.py
│   │   │           │   ├── 0023_auto_20220504_1335.py
│   │   │           │   ├── 0024_auto_20220808_0803.py
│   │   │           │   ├── 0025_alter_surcharge_carriers.py
│   │   │           │   ├── 0026_auto_20220828_0158.py
│   │   │           │   ├── 0027_alter_surcharge_services.py
│   │   │           │   ├── 0028_surcharge_markup_carriers_surcharge_markup_services.py
│   │   │           │   ├── 0029_alter_surcharge_services.py
│   │   │           │   ├── 0030_alter_surcharge_services.py
│   │   │           │   ├── 0031_alter_surcharge_carriers.py
│   │   │           │   ├── 0032_alter_surcharge_services.py
│   │   │           │   ├── 0033_alter_surcharge_services.py
│   │   │           │   ├── 0034_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0035_alter_surcharge_carriers.py
│   │   │           │   ├── 0036_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0037_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0038_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0039_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0040_alter_surcharge_services.py
│   │   │           │   ├── 0041_alter_surcharge_services.py
│   │   │           │   ├── 0042_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0043_alter_surcharge_services.py
│   │   │           │   ├── 0044_alter_surcharge_carriers.py
│   │   │           │   ├── 0045_alter_surcharge_carriers.py
│   │   │           │   ├── 0046_alter_surcharge_services.py
│   │   │           │   ├── 0047_alter_surcharge_services.py
│   │   │           │   ├── 0048_alter_surcharge_services.py
│   │   │           │   ├── 0049_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0050_alter_surcharge_carriers.py
│   │   │           │   ├── 0051_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0052_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0053_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0054_alter_surcharge_services.py
│   │   │           │   ├── 0055_alter_surcharge_services.py
│   │   │           │   ├── 0056_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0057_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0058_alter_surcharge_services.py
│   │   │           │   ├── 0059_alter_surcharge_carriers_alter_surcharge_services.py
│   │   │           │   ├── 0060_alter_surcharge_services.py
│   │   │           │   ├── 0061_alter_surcharge_services.py
│   │   │           │   └── __init__.py
│   │   │           ├── models.py
│   │   │           ├── serializers.py
│   │   │           ├── signals.py
│   │   │           ├── tests.py
│   │   │           └── views.py
│   │   └── setup.py
│   ├── proxy
│   │   ├── README.md
│   │   ├── karrio
│   │   │   └── server
│   │   │       └── proxy
│   │   │           ├── __init__.py
│   │   │           ├── admin.py
│   │   │           ├── apps.py
│   │   │           ├── migrations
│   │   │           │   └── __init__.py
│   │   │           ├── models.py
│   │   │           ├── router.py
│   │   │           ├── tests
│   │   │           │   ├── __init__.py
│   │   │           │   ├── test_pickup.py
│   │   │           │   ├── test_rating.py
│   │   │           │   ├── test_shipping.py
│   │   │           │   └── test_tracking.py
│   │   │           ├── urls.py
│   │   │           └── views
│   │   │               ├── __init__.py
│   │   │               ├── manifest.py
│   │   │               ├── pickup.py
│   │   │               ├── rating.py
│   │   │               ├── shipping.py
│   │   │               └── tracking.py
│   │   └── setup.py
│   ├── sdk
│   │   ├── MANIFEST.in
│   │   ├── README.md
│   │   ├── karrio
│   │   │   ├── __init__.py
│   │   │   ├── addons
│   │   │   │   ├── __init__.py
│   │   │   │   ├── fonts
│   │   │   │   │   ├── Oswald-Regular.ttf
│   │   │   │   │   └── Oswald-SemiBold.ttf
│   │   │   │   ├── label.py
│   │   │   │   └── renderer.py
│   │   │   ├── api
│   │   │   │   ├── __init__.py
│   │   │   │   ├── gateway.py
│   │   │   │   ├── interface.py
│   │   │   │   ├── mapper.py
│   │   │   │   └── proxy.py
│   │   │   ├── core
│   │   │   │   ├── __init__.py
│   │   │   │   ├── errors.py
│   │   │   │   ├── metadata.py
│   │   │   │   ├── models.py
│   │   │   │   ├── settings.py
│   │   │   │   ├── units.py
│   │   │   │   └── utils
│   │   │   │       ├── __init__.py
│   │   │   │       ├── caching.py
│   │   │   │       ├── datetime.py
│   │   │   │       ├── dict.py
│   │   │   │       ├── enum.py
│   │   │   │       ├── helpers.py
│   │   │   │       ├── log.py
│   │   │   │       ├── number.py
│   │   │   │       ├── pipeline.py
│   │   │   │       ├── serializable.py
│   │   │   │       ├── soap.py
│   │   │   │       ├── string.py
│   │   │   │       ├── tracing.py
│   │   │   │       ├── transformer.py
│   │   │   │       └── xml.py
│   │   │   ├── lib.py
│   │   │   ├── mappers
│   │   │   │   └── __init__.py
│   │   │   ├── providers
│   │   │   │   └── __init__.py
│   │   │   ├── references.py
│   │   │   ├── schemas
│   │   │   │   └── __init__.py
│   │   │   └── universal
│   │   │       ├── __init__.py
│   │   │       ├── mappers
│   │   │       │   ├── __init__.py
│   │   │       │   ├── rating_proxy.py
│   │   │       │   └── shipping_proxy.py
│   │   │       └── providers
│   │   │           ├── __init__.py
│   │   │           ├── rating
│   │   │           │   ├── __init__.py
│   │   │           │   ├── rate.py
│   │   │           │   └── utils.py
│   │   │           └── shipping
│   │   │               ├── __init__.py
│   │   │               ├── shipment.py
│   │   │               └── utils.py
│   │   ├── setup.py
│   │   └── tests
│   │       ├── __init__.py
│   │       └── core
│   │           ├── __init__.py
│   │           ├── test_universal_rate.py
│   │           └── test_universal_shipment.py
│   └── soap
│       ├── README.md
│       ├── generate
│       ├── pysoap
│       │   ├── __init__.py
│       │   └── envelope.py
│       ├── schemas
│       │   └── schemas.xmlsoap.org.xml
│       └── setup.py
├── mypy.ini
├── package-lock.json
├── package.json
├── packages
│   ├── admin
│   │   ├── .eslintrc.js
│   │   ├── components
│   │   │   ├── admin-header.tsx
│   │   │   ├── admin-layout.tsx
│   │   │   └── admin-sidebar.tsx
│   │   ├── hooks
│   │   │   └── providers.tsx
│   │   ├── index.tsx
│   │   ├── modules
│   │   │   ├── carrier-connections
│   │   │   │   └── index.tsx
│   │   │   ├── organization-accounts
│   │   │   │   └── index.tsx
│   │   │   ├── platform-details
│   │   │   │   └── index.tsx
│   │   │   ├── surcharges
│   │   │   │   └── index.tsx
│   │   │   └── users-permissions
│   │   │       └── index.tsx
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── core
│   │   ├── .eslintrc.js
│   │   ├── components
│   │   │   ├── error.tsx
│   │   │   ├── event-preview.tsx
│   │   │   ├── global-error.tsx
│   │   │   ├── log-preview.tsx
│   │   │   ├── metadata.tsx
│   │   │   ├── order-preview.tsx
│   │   │   ├── shipment-preview.tsx
│   │   │   ├── tracking-preview.tsx
│   │   │   └── workflow-event-preview.tsx
│   │   ├── context
│   │   │   ├── auth.ts
│   │   │   ├── image.ts
│   │   │   ├── main.ts
│   │   │   └── middleware.ts
│   │   ├── index.tsx
│   │   ├── layouts
│   │   │   ├── admin-layout.tsx
│   │   │   ├── dashboard-layout.tsx
│   │   │   ├── embed-layout.tsx
│   │   │   ├── embedable-layout.tsx
│   │   │   ├── public-layout.tsx
│   │   │   └── root-layout.tsx
│   │   ├── modules
│   │   │   ├── Connections
│   │   │   │   ├── index.tsx
│   │   │   │   ├── rate-sheets.tsx
│   │   │   │   └── system.tsx
│   │   │   ├── Developers
│   │   │   │   ├── apikeys.tsx
│   │   │   │   ├── event.tsx
│   │   │   │   ├── events.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── log.tsx
│   │   │   │   ├── logs.tsx
│   │   │   │   └── webhooks.tsx
│   │   │   ├── Home
│   │   │   │   └── index.tsx
│   │   │   ├── Invitation
│   │   │   │   └── accept-invite.tsx
│   │   │   ├── Labels
│   │   │   │   └── create_labels.tsx
│   │   │   ├── Manifests
│   │   │   │   ├── create_manifests.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── Orders
│   │   │   │   ├── create_label.tsx
│   │   │   │   ├── draft_order.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── order.tsx
│   │   │   ├── Password
│   │   │   │   └── reset
│   │   │   │       ├── done.tsx
│   │   │   │       ├── index.tsx
│   │   │   │       ├── request.tsx
│   │   │   │       └── sent.tsx
│   │   │   ├── Registration
│   │   │   │   ├── confirm_email.tsx
│   │   │   │   ├── confirm_email_change.tsx
│   │   │   │   ├── signin.tsx
│   │   │   │   ├── signup.tsx
│   │   │   │   └── signup_success.tsx
│   │   │   ├── Resources
│   │   │   │   ├── graphiql.tsx
│   │   │   │   └── reference.tsx
│   │   │   ├── Settings
│   │   │   │   ├── account.tsx
│   │   │   │   ├── addresses.tsx
│   │   │   │   ├── organization.tsx
│   │   │   │   ├── parcels.tsx
│   │   │   │   ├── profile.tsx
│   │   │   │   ├── template.tsx
│   │   │   │   └── templates.tsx
│   │   │   ├── Shipments
│   │   │   │   ├── create_label.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── shipment.tsx
│   │   │   ├── Trackers
│   │   │   │   ├── index.tsx
│   │   │   │   └── tracking-page.tsx
│   │   │   └── Workflows
│   │   │       ├── event.tsx
│   │   │       ├── events.tsx
│   │   │       ├── index.tsx
│   │   │       └── workflow.tsx
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── eslint-config-custom
│   │   ├── README.md
│   │   ├── library.js
│   │   ├── next.js
│   │   ├── package.json
│   │   └── react-internal.js
│   ├── hooks
│   │   ├── .eslintrc.js
│   │   ├── address.ts
│   │   ├── admin
│   │   │   ├── accounts.ts
│   │   │   ├── connections.ts
│   │   │   ├── index.tsx
│   │   │   ├── permissions.ts
│   │   │   ├── rate-sheets.ts
│   │   │   ├── surcharges.ts
│   │   │   └── users.ts
│   │   ├── api-metadata.tsx
│   │   ├── api-token.ts
│   │   ├── app-mode.tsx
│   │   ├── batch-operations.ts
│   │   ├── bulk-shipments.ts
│   │   ├── carrier-connections.ts
│   │   ├── customs.ts
│   │   ├── default-template.ts
│   │   ├── document-template.ts
│   │   ├── event.ts
│   │   ├── index.tsx
│   │   ├── karrio.tsx
│   │   ├── label-data.ts
│   │   ├── location.tsx
│   │   ├── log.ts
│   │   ├── manifests.ts
│   │   ├── metadata.tsx
│   │   ├── order.ts
│   │   ├── organization.tsx
│   │   ├── package.json
│   │   ├── parcel.ts
│   │   ├── posthog.tsx
│   │   ├── providers.tsx
│   │   ├── rate-sheet.ts
│   │   ├── search.ts
│   │   ├── session.tsx
│   │   ├── shipment.ts
│   │   ├── subscription.tsx
│   │   ├── system-connection.ts
│   │   ├── system-usage.ts
│   │   ├── tracker.ts
│   │   ├── tsconfig.json
│   │   ├── upload-record.ts
│   │   ├── usage.ts
│   │   ├── user-connection.ts
│   │   ├── user.ts
│   │   ├── utils.tsx
│   │   ├── webhook.ts
│   │   ├── workflow-actions.ts
│   │   ├── workflow-connections.ts
│   │   ├── workflow-events.ts
│   │   ├── workflows.ts
│   │   └── workspace-config.ts
│   ├── insiders
│   │   ├── .eslintrc.js
│   │   ├── .gitignore
│   │   ├── components
│   │   │   ├── carrier-connection-dialog.tsx
│   │   │   ├── delete-confirmation-dialog.tsx
│   │   │   ├── icons.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── rate-sheet-dialog.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── surcharge-dialog.tsx
│   │   │   └── ui
│   │   │       ├── accordion.tsx
│   │   │       ├── alert-dialog.tsx
│   │   │       ├── alert.tsx
│   │   │       ├── avatar.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── breadcrumb.tsx
│   │   │       ├── button.tsx
│   │   │       ├── calendar.tsx
│   │   │       ├── card.tsx
│   │   │       ├── checkbox.tsx
│   │   │       ├── collapsible.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── dropdown-menu.tsx
│   │   │       ├── form.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       ├── metadata-editor.tsx
│   │   │       ├── pagination.tsx
│   │   │       ├── popover.tsx
│   │   │       ├── radio-group.tsx
│   │   │       ├── scroll-area.tsx
│   │   │       ├── select.tsx
│   │   │       ├── separator.tsx
│   │   │       ├── sheet.tsx
│   │   │       ├── sidebar.tsx
│   │   │       ├── skeleton.tsx
│   │   │       ├── switch.tsx
│   │   │       ├── table.tsx
│   │   │       ├── tabs.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── toast.tsx
│   │   │       ├── toaster.tsx
│   │   │       └── tooltip.tsx
│   │   ├── components.json
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   ├── GeistVF.woff
│   │   │   └── font.ts
│   │   ├── globals.css
│   │   ├── hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── index.tsx
│   │   ├── layouts
│   │   │   ├── dashboard-layout.tsx
│   │   │   └── root-layout.tsx
│   │   ├── lib
│   │   │   └── utils.ts
│   │   ├── modules
│   │   │   ├── apps
│   │   │   │   └── index.tsx
│   │   │   ├── automation
│   │   │   │   └── index.tsx
│   │   │   ├── connections
│   │   │   │   └── index.tsx
│   │   │   ├── dashboard
│   │   │   │   └── index.tsx
│   │   │   ├── developers
│   │   │   │   └── index.tsx
│   │   │   ├── manifests
│   │   │   │   └── index.tsx
│   │   │   ├── orders
│   │   │   │   └── index.tsx
│   │   │   ├── settings
│   │   │   │   └── index.tsx
│   │   │   ├── shipments
│   │   │   │   └── index.tsx
│   │   │   └── trackers
│   │   │       └── index.tsx
│   │   ├── package.json
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   ├── karriojs
│   │   ├── .editorconfig
│   │   ├── .gitignore
│   │   ├── api
│   │   │   ├── index.ts
│   │   │   └── karrio.ts
│   │   ├── gulpfile.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── lib
│   │   ├── auth.ts
│   │   ├── autocomplete.ts
│   │   ├── constants.ts
│   │   ├── helper.ts
│   │   ├── index.ts
│   │   ├── logger.ts
│   │   ├── package.json
│   │   └── sample.ts
│   ├── trpc
│   │   ├── .eslintrc.js
│   │   ├── client
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── package.json
│   │   ├── server
│   │   │   ├── _app.ts
│   │   │   ├── context.ts
│   │   │   ├── index.ts
│   │   │   ├── middleware.ts
│   │   │   ├── next.ts
│   │   │   └── router
│   │   │       ├── admin.ts
│   │   │       └── index.ts
│   │   └── tsconfig.json
│   ├── tsconfig
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   ├── package.json
│   │   └── react-library.json
│   ├── types
│   │   ├── .gitignore
│   │   ├── base.ts
│   │   ├── graphql
│   │   │   ├── admin
│   │   │   │   ├── index.ts
│   │   │   │   ├── queries.ts
│   │   │   │   └── types.ts
│   │   │   ├── ee
│   │   │   │   ├── index.ts
│   │   │   │   ├── queries.ts
│   │   │   │   └── types.ts
│   │   │   ├── index.ts
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   ├── index.ts
│   │   ├── next-auth.d.ts
│   │   ├── package.json
│   │   ├── rest
│   │   │   ├── api.ts
│   │   │   ├── base.ts
│   │   │   ├── common.ts
│   │   │   ├── configuration.ts
│   │   │   └── index.ts
│   │   └── tsconfig.json
│   └── ui
│       ├── .eslintrc.js
│       ├── components
│       │   ├── account-dropdown.tsx
│       │   ├── address-description.tsx
│       │   ├── admin-navbar.tsx
│       │   ├── admin-sidebar.tsx
│       │   ├── app-badge.tsx
│       │   ├── app-link.tsx
│       │   ├── app-menu.tsx
│       │   ├── button-field.tsx
│       │   ├── carrier-badge.tsx
│       │   ├── carrier-image.tsx
│       │   ├── carrier-name-badge.tsx
│       │   ├── checkbox-field.tsx
│       │   ├── commodity-description.tsx
│       │   ├── commodity-summary.tsx
│       │   ├── connection-description.tsx
│       │   ├── copiable-link.tsx
│       │   ├── customs-info-description.tsx
│       │   ├── dropdown-input.tsx
│       │   ├── dropdown.tsx
│       │   ├── error-boudaries.tsx
│       │   ├── expandable.tsx
│       │   ├── expanded-sidebar.tsx
│       │   ├── field-info.tsx
│       │   ├── footer.tsx
│       │   ├── google-geocoding-script.tsx
│       │   ├── index.tsx
│       │   ├── input-field.tsx
│       │   ├── loader.tsx
│       │   ├── menu.tsx
│       │   ├── messages-description.tsx
│       │   ├── mode-indicator.tsx
│       │   ├── name-input.tsx
│       │   ├── navbar.tsx
│       │   ├── notifier.tsx
│       │   ├── options-description.tsx
│       │   ├── order-menu.tsx
│       │   ├── organization-dropdown.tsx
│       │   ├── parcel-description.tsx
│       │   ├── phone-input.tsx
│       │   ├── postal-input.tsx
│       │   ├── rate-description.tsx
│       │   ├── select-field.tsx
│       │   ├── shipment-menu.tsx
│       │   ├── shortcut-dropdown.tsx
│       │   ├── spinner.tsx
│       │   ├── status-badge.tsx
│       │   ├── status-code-badge.tsx
│       │   ├── switch.tsx
│       │   ├── tabs.tsx
│       │   ├── template-description.tsx
│       │   ├── textarea-field.tsx
│       │   └── workflow-menu.tsx
│       ├── filters
│       │   ├── events-filter.tsx
│       │   ├── index.tsx
│       │   ├── logs-filter.tsx
│       │   ├── orders-filter.tsx
│       │   ├── shipments-filter.tsx
│       │   └── trackers-filter.tsx
│       ├── forms
│       │   ├── address-autocomplete-input.tsx
│       │   ├── address-form.tsx
│       │   ├── close-account-action.tsx
│       │   ├── country-input.tsx
│       │   ├── customs-info-form.tsx
│       │   ├── email-management.tsx
│       │   ├── index.tsx
│       │   ├── line-item-input.tsx
│       │   ├── line-item-selector.tsx
│       │   ├── live-rates.tsx
│       │   ├── metadata-editor.tsx
│       │   ├── organization-management.tsx
│       │   ├── organization-update-input.tsx
│       │   ├── parcel-form.tsx
│       │   ├── password-management.tsx
│       │   ├── profile-update-input.tsx
│       │   ├── rate-sheet-list.tsx
│       │   ├── search-bar.tsx
│       │   ├── shipment-options.tsx
│       │   ├── state-input.tsx
│       │   ├── subscription-management.tsx
│       │   ├── system-carrier-list.tsx
│       │   ├── user-carrier-list.tsx
│       │   └── workspace-config-form.tsx
│       ├── index.tsx
│       ├── modals
│       │   ├── accept-invitation-modal.tsx
│       │   ├── address-edit-modal.tsx
│       │   ├── commodity-edit-modal.tsx
│       │   ├── confirm-modal.tsx
│       │   ├── connect-provider-modal.tsx
│       │   ├── create-manifest-modal.tsx
│       │   ├── create-organization-modal.tsx
│       │   ├── customs-info-edit-modal.tsx
│       │   ├── form-modals.tsx
│       │   ├── generate-api-dialog.tsx
│       │   ├── index.tsx
│       │   ├── invite-member-modal.tsx
│       │   ├── label-template-edit-modal.tsx
│       │   ├── modal.tsx
│       │   ├── parcel-edit-modal.tsx
│       │   ├── rate-sheet-edit-modal.tsx
│       │   ├── rate-sheet-editor.tsx
│       │   ├── track-shipment-modal.tsx
│       │   ├── user-edit-modal.tsx
│       │   ├── webhook-edit-modal.tsx
│       │   ├── webhook-test-modal.tsx
│       │   ├── workflow-action-edit-modal.tsx
│       │   └── workflow-connection-edit-modal.tsx
│       ├── package.json
│       └── tsconfig.json
├── postman
│   ├── collections
│   │   └── Karrio API.json
│   └── schemas
│       └── openapi.yml
├── requirements.build.insiders.txt
├── requirements.build.platform.txt
├── requirements.build.txt
├── requirements.dev.txt
├── requirements.insiders.dev.txt
├── requirements.insiders.txt
├── requirements.platform.dev.txt
├── requirements.platform.txt
├── requirements.sdk.dev.txt
├── requirements.server.dev.txt
├── requirements.txt
├── schemas
│   ├── graphql-admin.json
│   ├── graphql-ee.json
│   ├── graphql.json
│   └── openapi.yml
├── screenshots
│   ├── apps-&-brains.png
│   ├── become-a-sponsor.png
│   ├── cheques-plus.png
│   ├── dashboard-home.png
│   ├── dashboard-shipments.png
│   ├── dashboard.png
│   ├── platana.svg
│   ├── shipments.png
│   ├── shipto.svg
│   ├── superroute.png
│   └── truckhardware.png
├── source.requirements.insiders.txt
├── source.requirements.platform.txt
├── source.requirements.txt
├── tsconfig.json
└── turbo.json

1265 directories, 4332 files
