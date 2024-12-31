SCHEMAS=./schemas
LIB_MODULES=./norsk_lib
find "${LIB_MODULES}" -name "*.py" -exec rm -r {} \;
touch "${LIB_MODULES}/__init__.py"

generateDS --no-namespace-defs -o "${LIB_MODULES}/api-shipment-defs.py" $SCHEMAS/api-shipment-defs.xsd
generateDS --no-namespace-defs -o "${LIB_MODULES}/api-shipment-booking.py" $SCHEMAS/api-shipment-booking.xsd
generateDS --no-namespace-defs -o "${LIB_MODULES}/api-shipment-local-time.py" $SCHEMAS/api-shipment-local-time.xsd
generateDS --no-namespace-defs -o "${LIB_MODULES}/api-shipment-label-format.py" $SCHEMAS/api-shipment-label-format.xsd
generateDS --no-namespace-defs -o "${LIB_MODULES}/api-shipment-label-size.py" $SCHEMAS/api-shipment-label-size.xsd
generateDS --no-namespace-defs -o "${LIB_MODULES}/api-quote-defs.py" $SCHEMAS/api-quote-defs.xsd
generateDS --no-namespace-defs -o "${LIB_MODULES}/api-quote-request-model.py" $SCHEMAS/api-quote-request-model.xsd
generateDS --no-namespace-defs -o "${LIB_MODULES}/api-quote-schema.py" $SCHEMAS/api-quote-schema.xsd