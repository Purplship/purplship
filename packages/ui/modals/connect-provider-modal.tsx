"use client";
import {
  Collection,
  NoneEnum,
  NotificationType,
  CarrierNameEnum,
} from "@karrio/types";
import {
  formatRef,
  isEqual,
  isNone,
  isNoneOrEmpty,
  validationMessage,
  validityCheck,
} from "@karrio/lib";
import {
  MetadataEditor,
  MetadataEditorContext,
} from "../forms/metadata-editor";
import { CarrierConnectionType } from "@karrio/hooks/user-connection";
import React, { useContext, useReducer, useState } from "react";
import { useAPIMetadata } from "@karrio/hooks/api-metadata";
import { Notifier, Notify } from "../components/notifier";
import { SelectField } from "../components/select-field";
import { MetadataObjectTypeEnum } from "@karrio/types";
import { InputField } from "../components/input-field";
import { CountryInput } from "../forms/country-input";
import { useAppMode } from "@karrio/hooks/app-mode";
import { Disclosure } from "@headlessui/react";
import { Loading } from "../components/loader";
import { CheckBoxField } from "../components";
import { useLocation } from "@karrio/hooks/location";

type CarrierNameType = CarrierNameEnum | NoneEnum;
type OperationType = {
  connection?: CarrierConnectionType;
  create?: (data: any) => Promise<any>;
  update?: (data: any) => Promise<any>;
  onConfirm?: () => Promise<any>;
};
type ConnectProviderModalContextType = {
  editConnection: (operation?: OperationType) => void;
};

export const ConnectProviderModalContext =
  React.createContext<ConnectProviderModalContextType>(
    {} as ConnectProviderModalContextType,
  );

interface ConnectProviderModalComponent {
  connection?: CarrierConnectionType;
  children?: React.ReactNode;
}

function reducer(
  state: any,
  { name, value }: { name: string; value: string | boolean | object | null },
) {
  switch (name) {
    case "full":
      return { ...(value as object) };
    case "partial":
      return { ...state, ...(value as object) };
    case "carrier_name":
      return { [name]: value };
    default:
      return { ...state, [name]: value };
  }
}

export const ConnectProviderModal = ({
  children,
}: ConnectProviderModalComponent): JSX.Element => {
  const {
    references: {
      carriers,
      connection_configs,
      connection_fields,
      service_names,
      option_names,
    },
  } = useAPIMetadata();
  const { testMode } = useAppMode();
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useContext(Loading);
  const { addUrlParam, removeUrlParam } = useLocation();
  const DEFAULT_STATE = (): Partial<CarrierConnectionType> => ({
    carrier_name: NoneEnum.none,
    credentials: {},
    config: {},
  });
  const [key, setKey] = useState<string>(`connection-${Date.now()}`);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [payload, dispatch] = useReducer(reducer, DEFAULT_STATE());
  const [carrier_name, setCarrierName] = useState<CarrierNameType>(
    NoneEnum.none,
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [operation, setOperation] = useState<OperationType>(
    {} as OperationType,
  );

  const editConnection = (operation: OperationType = {}): void => {
    const connection = operation.connection || DEFAULT_STATE();
    const connection_carrier: CarrierNameType =
      connection.carrier_name === NoneEnum.none ||
      Object.values(CarrierNameEnum).includes(connection.carrier_name as any)
        ? (connection.carrier_name as CarrierNameEnum)
        : CarrierNameEnum.generic;
    setCarrierName(connection_carrier);
    setIsNew(isNone(operation.connection));
    setOperation(operation);
    dispatch({ name: "full", value: connection });
    setKey(`connection-${Date.now()}`);
    setIsActive(true);
    addUrlParam("modal", connection.id || "new");
  };
  const close = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (isNew) {
      dispatch({ name: "full", value: DEFAULT_STATE() });
      setCarrierName(NoneEnum.none);
    }
    setKey(`connection-${Date.now()}`);
    setIsActive(false);
    removeUrlParam("modal");
  };
  const field = (property: string) => {
    return ((connection_fields || {})[carrier_name] || {})[property];
  };
  const directChange = (property: string) => (value: any) => {
    dispatch({
      name: property,
      value: value === "none" || isNoneOrEmpty(value) ? null : value,
    });
  };

  const handleChange = (event: React.ChangeEvent<any>) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name: string = target.name;

    dispatch({
      name,
      value: value === "none" || isNoneOrEmpty(value) ? null : value,
    });
  };
  const handleNestedChange =
    (property: string) => (event: React.ChangeEvent<any>) => {
      const target = event.target;
      const name: string = target.name;
      let value =
        (target as any).type === "checkbox" ? target.checked : target.value;

      if (target.multiple === true) {
        value = Array.from(target.selectedOptions).map(
          (o: any) => o.value,
        ) as any;
      }

      dispatch({
        name: property,
        value: {
          ...payload[property],
          [name]: value === "none" || isNoneOrEmpty(value) ? null : value,
        },
      });
    };
  const handleCarrierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    const value = target.value as CarrierNameType;
    const state = {
      carrier_id: `${value.toLocaleLowerCase()}${testMode ? "-test" : ""}`,
      credentials: Object.entries(connection_fields[value] || {}).reduce(
        (acc, [key, field]) => ({
          ...acc,
          [key]: field.default,
        }),
        {} as any,
      ),
    };

    setCarrierName(value);
    dispatch({ name: "full", value: state });
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const {
        carrier_name: _,
        __typename,
        display_name,
        rate_sheet,
        test_mode,
        ...content
      } = payload;
      const data = content;
      if (isNew) {
        operation.create && (await operation.create({ ...data, carrier_name }));
      } else {
        operation.update && (await operation.update(data));
        dispatch({ name: "partial", value: payload });
      }
      notify({
        type: NotificationType.success,
        message: `carrier connection ${isNew ? "registered" : "updated"} successfully`,
      });
      setTimeout(() => close(), 500);
      operation.onConfirm && operation.onConfirm();
    } catch (err: any) {
      notify({ type: NotificationType.error, message: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Notifier>
      <ConnectProviderModalContext.Provider value={{ editConnection }}>
        {children}
      </ConnectProviderModalContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background"></div>
        <form className="modal-card" onSubmit={handleSubmit}>
          <section
            className="modal-card-body modal-form"
            onChange={(e: any) => {
              setIsInvalid(
                e.currentTarget.querySelectorAll(".is-danger").length > 0,
              );
            }}
          >
            <div className="form-floating-header p-4">
              <span className="has-text-weight-bold is-size-6">
                Edit carrier account
              </span>
            </div>
            <div className="p-3 my-4"></div>

            <SelectField
              value={carrier_name}
              onChange={handleCarrierChange}
              disabled={!isNew}
              key={`select-${key}`}
              className="is-fullwidth"
              required
            >
              <option value="none">Select Carrier</option>

              {carriers &&
                Object.keys(carriers)
                  .sort()
                  .filter((carrier) => carrier === "generic")
                  .map((carrier) => (
                    <option key={carrier} value={carrier}>
                      {(carriers as Collection)[carrier]}
                    </option>
                  ))}

              <optgroup label="Shipping carriers">
                {carriers &&
                  Object.keys(carriers)
                    .sort()
                    .filter((carrier) => carrier !== "generic")
                    .map((carrier) => (
                      <option key={carrier} value={carrier}>
                        {(carriers as Collection)[carrier]}
                      </option>
                    ))}
              </optgroup>
            </SelectField>

            {carrier_name !== NoneEnum.none && !!connection_configs && (
              <>
                <hr />

                {field("display_name") && (
                  <InputField
                    label="Display Name"
                    name="display_name"
                    value={payload.credentials?.display_name}
                    onChange={handleNestedChange("credentials")}
                    required={field("display_name").required}
                    wrapperClass="pt-2"
                    className="is-small"
                  />
                )}

                {field("custom_carrier_name") && (
                  <InputField
                    label="Slug"
                    name="custom_carrier_name"
                    pattern="^[a-z0-9_]+$"
                    value={payload.credentials?.custom_carrier_name}
                    onChange={handleNestedChange("credentials")}
                    required={field("custom_carrier_name").required}
                    wrapperClass="pt-2"
                    className="is-small"
                    onInvalid={validityCheck(
                      validationMessage("Please enter a valid slug"),
                    )}
                  />
                )}

                <InputField
                  label="Carrier Id"
                  name="carrier_id"
                  value={payload.carrier_id}
                  wrapperClass="pt-2"
                  className="is-small"
                  onChange={handleChange}
                  required={true}
                >
                  <p className="help">
                    friendly-tag. e.g:{" "}
                    <strong>dhl-express-us, ups-ca-test...</strong>
                  </p>
                </InputField>

                {/* Carrier specific fields BEGING */}
                {Object.entries(connection_fields[carrier_name])
                  .filter(
                    ([property, _]) =>
                      ![
                        "account_country_code",
                        "custom_carrier_name",
                        "display_name",
                      ].includes(property),
                  )
                  .map(([_, field]) => (
                    <React.Fragment key={_}>
                      {field.type === "string" && !field.enum && (
                        <InputField
                          label={formatRef(field.name).toLowerCase()}
                          value={payload.credentials?.[_]}
                          name={_}
                          wrapperClass="pt-2"
                          onChange={handleNestedChange("credentials")}
                          className="is-small"
                          required={field.required}
                        />
                      )}

                      {field.type === "string" && field.enum && (
                        <SelectField
                          key={`select-${_}`}
                          name={_}
                          label={formatRef(field.name).toLowerCase()}
                          value={payload.credentials?.[_]}
                          onChange={handleNestedChange("credentials")}
                          required={field.required}
                          className="is-small is-fullwidth"
                          wrapperClass="is-6 pt-2"
                          fieldClass="mb-0"
                        >
                          {!field.required && <option value="none"></option>}

                          {field.enum.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </SelectField>
                      )}

                      {field.type === "boolean" && (
                        <label className="checkbox column is-6 pt-1">
                          <input
                            name={_}
                            type="checkbox"
                            checked={payload.credentials?.[_]}
                            onChange={handleNestedChange("credentials")}
                          />
                          <span style={{ fontSize: "0.8em" }}>
                            {formatRef(field.name).toLowerCase()}
                          </span>
                        </label>
                      )}
                    </React.Fragment>
                  ))}

                {field("account_country_code") && (
                  <CountryInput
                    label="Account Country Code"
                    onValueChange={(_) =>
                      directChange("credentials")({
                        ...payload.credentials,
                        account_country_code: _,
                      })
                    }
                    value={payload.credentials?.account_country_code}
                    className="is-small"
                    dropdownClass="is-small"
                    wrapperClass="pt-2"
                    required={field("account_country_code").required}
                  />
                )}

                {/* Carrier config section */}

                {carrier_name.toString() in (connection_configs || {}) && (
                  <div className="mt-4">
                    {/* @ts-ignore */}
                    <Disclosure>
                      {({ open }) => (
                        <div className="block">
                          <Disclosure.Button
                            as="div"
                            style={{ boxShadow: "none" }}
                            className="is-flex is-justify-content-space-between is-clickable px-0 mb-2"
                          >
                            <h2 className="title is-6 my-3">
                              Connection Config
                            </h2>
                            <span className="icon is-small m-2 mt-3">
                              {open ? (
                                <i className="fas fa-chevron-up"></i>
                              ) : (
                                <i className="fas fa-chevron-down"></i>
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="card is-flat columns is-multiline m-0 py-2">
                            {Object.entries(
                              connection_configs[carrier_name.toString()],
                            )
                              .filter(
                                ([property, _]) =>
                                  ![
                                    "brand_color",
                                    "text_color",
                                    "shipping_services",
                                    "shipping_options",
                                  ].includes(property),
                              )
                              .map(([property, field]) => (
                                <React.Fragment key={property}>
                                  {field.type === "string" && !field.enum && (
                                    <InputField
                                      value={payload.config?.[property] || ""}
                                      name={property}
                                      label={formatRef(
                                        field.name,
                                      ).toLowerCase()}
                                      onChange={handleNestedChange("config")}
                                      wrapperClass="column is-6 pt-1"
                                      fieldClass="mb-0"
                                      className="is-small is-fullwidth"
                                    />
                                  )}

                                  {field.type === "string" && field.enum && (
                                    <SelectField
                                      value={payload.config?.[property]}
                                      name={property}
                                      label={formatRef(
                                        field.name,
                                      ).toLowerCase()}
                                      onChange={handleNestedChange("config")}
                                      className="is-small is-fullwidth"
                                      wrapperClass="column is-6 pt-1"
                                      fieldClass="mb-0"
                                    >
                                      {!field.required && (
                                        <option value="none"></option>
                                      )}

                                      {field.enum.map((option) => (
                                        <option key={option} value={option}>
                                          {option}
                                        </option>
                                      ))}
                                    </SelectField>
                                  )}

                                  {field.type === "boolean" && (
                                    <CheckBoxField
                                      fieldClass="column is-6 mb-0"
                                      labelClass="has-text-weight-bold"
                                      checked={payload.config?.[property]}
                                      name={property}
                                      onChange={handleNestedChange("config")}
                                    >
                                      <span style={{ fontSize: "0.8em" }}>
                                        {formatRef(field.name).toLowerCase()}
                                      </span>
                                    </CheckBoxField>
                                  )}
                                </React.Fragment>
                              ))}

                            {"brand_color" in
                              connection_configs[carrier_name.toString()] && (
                              <InputField
                                value={payload.config?.brand_color || ""}
                                type="color"
                                name="brand_color"
                                label="Brand color"
                                onChange={handleNestedChange("config")}
                                wrapperClass="column is-6 pt-1"
                                fieldClass="mb-0"
                                className="is-small is-fullwidth"
                              />
                            )}

                            {"text_color" in
                              connection_configs[carrier_name.toString()] && (
                              <InputField
                                value={payload.config?.text_color || ""}
                                type="color"
                                name="text_color"
                                label="Text color"
                                onChange={handleNestedChange("config")}
                                wrapperClass="column is-6 pt-1"
                                fieldClass="mb-0"
                                className="is-small is-fullwidth"
                              />
                            )}

                            {"shipping_services" in
                              connection_configs[carrier_name.toString()] && (
                              <SelectField
                                defaultValue={payload.config?.shipping_services}
                                name="shipping_services"
                                label="Preferred shipping services"
                                className="is-small is-multiple is-fullwidth"
                                wrapperClass="column is-12 pt-1"
                                fieldClass="mb-0"
                                onChange={handleNestedChange("config")}
                                size={6}
                                multiple
                              >
                                {Object.entries(
                                  service_names[carrier_name.toString()] || {},
                                ).map(([_, __]) => (
                                  <option key={_} value={_}>
                                    {__}
                                  </option>
                                ))}
                              </SelectField>
                            )}

                            {"shipping_options" in
                              connection_configs[carrier_name.toString()] && (
                              <SelectField
                                defaultValue={payload.config?.shipping_options}
                                name="shipping_options"
                                label={`Enable carrier specific shipping options`}
                                className="is-small is-multiple is-fullwidth"
                                wrapperClass="column is-12 pt-1"
                                fieldClass="mb-0"
                                onChange={handleNestedChange("config")}
                                size={6}
                                multiple
                              >
                                {Object.entries(
                                  option_names[carrier_name.toString()] || {},
                                ).map(([_, __]) => (
                                  <option key={_} value={_}>
                                    {__}
                                  </option>
                                ))}
                              </SelectField>
                            )}
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  </div>
                )}

                {/* Carrier specific fields END */}

                <hr className="mt-5 mb-3" style={{ height: "1px" }} />

                <MetadataEditor
                  object_type={MetadataObjectTypeEnum.carrier}
                  metadata={payload.metadata}
                  onChange={directChange("metadata")}
                >
                  {/* @ts-ignore */}
                  <MetadataEditorContext.Consumer>
                    {({ isEditing, editMetadata }) => (
                      <>
                        <div className="is-flex is-justify-content-space-between">
                          <h2 className="title is-6 my-3">Metadata</h2>

                          <button
                            type="button"
                            className="button is-default is-small is-align-self-center"
                            disabled={isEditing}
                            onClick={() => editMetadata()}
                          >
                            <span className="icon is-small">
                              <i className="fas fa-pen"></i>
                            </span>
                            <span>Edit metadata</span>
                          </button>
                        </div>

                        <hr className="mt-1 my-1" style={{ height: "1px" }} />
                      </>
                    )}
                  </MetadataEditorContext.Consumer>
                </MetadataEditor>

                <div className="p-3 my-5"></div>
                <div className="form-floating-footer has-text-centered p-1">
                  <button
                    className="button is-default m-1 is-small"
                    onClick={close}
                    disabled={loading}
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    className={`button is-primary ${loading ? "is-loading" : ""} m-1 is-small`}
                    disabled={
                      isInvalid ||
                      isEqual(operation.connection || DEFAULT_STATE, payload)
                    }
                    type="submit"
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </>
            )}
          </section>
        </form>
        <button
          className="modal-close is-large has-background-dark"
          aria-label=""
          onClick={close}
        ></button>
      </div>
    </Notifier>
  );
};

export function useConnectCarrierModal() {
  return useContext(ConnectProviderModalContext);
}

export function useConnectProviderModalContext() {
  return useContext(ConnectProviderModalContext);
}
