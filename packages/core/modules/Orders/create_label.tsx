"use client";
import {
  AddressType,
  CommodityType,
  CURRENCY_OPTIONS,
  CustomsType,
  DEFAULT_CUSTOMS_CONTENT,
  NotificationType,
  OrderType,
  ShipmentType,
} from "@karrio/types";
import {
  createShipmentFromOrders,
  formatRef,
  formatWeight,
  getShipmentCommodities,
  isNone,
  isNoneOrEmpty,
} from "@karrio/lib";
import {
  CommodityEditModalProvider,
  CommodityStateContext,
} from "@karrio/ui/modals/commodity-edit-modal";
import {
  AddressModalEditor,
  CustomsModalEditor,
  ParcelModalEditor,
} from "@karrio/ui/modals/form-modals";
import {
  MetadataEditor,
  MetadataEditorContext,
} from "@karrio/ui/forms/metadata-editor";
import { CustomsInfoDescription } from "@karrio/ui/components/customs-info-description";
import { GoogleGeocodingScript } from "@karrio/ui/components/google-geocoding-script";
import { CommodityDescription } from "@karrio/ui/components/commodity-description";
import {
  LabelTypeEnum,
  MetadataObjectTypeEnum,
  PaidByEnum,
} from "@karrio/types";
import { MessagesDescription } from "@karrio/ui/components/messages-description";
import { AddressDescription } from "@karrio/ui/components/address-description";
import { ParcelDescription } from "@karrio/ui/components/parcel-description";
import { CommoditySummary } from "@karrio/ui/components/commodity-summary";
import { RateDescription } from "@karrio/ui/components/rate-description";
import { useSystemConnections } from "@karrio/hooks/system-connection";
import { LineItemSelector } from "@karrio/ui/forms/line-item-selector";
import { useCarrierConnections } from "@karrio/hooks/user-connection";
import { useDefaultTemplates } from "@karrio/hooks/default-template";
import { CheckBoxField } from "@karrio/ui/components/checkbox-field";
import { TextAreaField } from "@karrio/ui/components/textarea-field";
import { useWorkspaceConfig } from "@karrio/hooks/workspace-config";
import { useConnections } from "@karrio/hooks/carrier-connections";
import { dynamicMetadata } from "@karrio/core/components/metadata";
import { CarrierImage } from "@karrio/ui/components/carrier-image";
import { ButtonField } from "@karrio/ui/components/button-field";
import { SelectField } from "@karrio/ui/components/select-field";
import { useLabelDataMutation } from "@karrio/hooks/label-data";
import { InputField } from "@karrio/ui/components/input-field";
import { useNotifier } from "@karrio/ui/components/notifier";
import { useAPIMetadata } from "@karrio/hooks/api-metadata";
import { useLoader } from "@karrio/ui/components/loader";
import { ModalProvider } from "@karrio/ui/modals/modal";
import { Spinner } from "@karrio/ui/components/spinner";
import { bundleContexts } from "@karrio/hooks/utils";
import { useLocation } from "@karrio/hooks/location";
import { useAppMode } from "@karrio/hooks/app-mode";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOrders } from "@karrio/hooks/order";
import { Disclosure } from "@headlessui/react";
import moment from "moment";

export const generateMetadata = dynamicMetadata("Create shipment");
const ContextProviders = bundleContexts([
  CommodityEditModalProvider,
  ModalProvider,
]);

export default function Page(pageProps: any) {
  const Component = (): JSX.Element => {
    const loader = useLoader();
    const notifier = useNotifier();
    const searchParams = useSearchParams();
    const { basePath } = useAppMode();
    const { references } = useAPIMetadata();
    const { carrierOptions } = useConnections();
    const workspace_config = useWorkspaceConfig();
    const { addUrlParam, ...router } = useLocation();
    const { query: templates } = useDefaultTemplates();
    const [ready, setReady] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [order_id, shipment_id] = [
      searchParams.get("order_id") || "",
      (searchParams.get("shipment_id") as string) || "new",
    ];
    const [key, setKey] = useState<string>(`${shipment_id}-${Date.now()}`);
    const [addReturn, setAddReturn] = useState<boolean>(false);
    const {
      query: { data: { user_connections } = {} },
    } = useCarrierConnections();
    const {
      query: { data: { system_connections } = {} },
    } = useSystemConnections();
    const {
      state: { shipment, query },
      ...mutation
    } = useLabelDataMutation(shipment_id);
    const [selected_rate, setSelectedRate] = useState<
      ShipmentType["rates"][0] | undefined
    >(
      shipment?.selected_rate_id
        ? ({ id: shipment?.selected_rate_id } as any)
        : undefined,
    );
    const { query: orders } = useOrders({
      first: 20,
      status: ["unfulfilled", "partial"] as any,
      ...(order_id ? { id: order_id.split(",").map((s) => s.trim()) } : {}),
    });

    const requireInfoForRating = (shipment: ShipmentType) => {
      return (
        shipment.recipient.address_line1 === undefined ||
        shipment.shipper.address_line1 === undefined ||
        shipment.parcels.length === 0 ||
        loading === true
      );
    };
    const isInternational = (shipment: ShipmentType) => {
      return (
        shipment.recipient.country_code !== undefined &&
        shipment.shipper.country_code !== undefined &&
        shipment.recipient.country_code !== shipment.shipper.country_code
      );
    };
    const getCarrier = (rate: ShipmentType["rates"][0]) =>
      user_connections?.find(
        (_) =>
          _.id === rate.meta.carrier_connection_id ||
          _.carrier_id === rate.carrier_id,
      ) ||
      system_connections?.find(
        (_) =>
          _.id === rate.meta.carrier_connection_id ||
          _.carrier_id === rate.carrier_id,
      );
    const getOptions = (): any => {
      return (orders.data?.orders.edges || []).reduce(
        (acc, { node: { options } }) => ({ ...acc, ...options }),
        {},
      );
    };
    const getItems = () => {
      return (orders.data?.orders.edges || [])
        .map(({ node: { line_items } }) => line_items)
        .flat();
    };
    const getParent = (id: string | null) => {
      return getItems().find((item) => item.id === id);
    };
    const getOrder = (item_id?: string | null) => {
      return (orders.data?.orders.edges || []).find(({ node: order }) =>
        order.line_items.find((item) => item.id === item_id),
      )?.node;
    };
    const getAvailableQuantity = (
      shipment: ShipmentType,
      item: CommodityType,
      item_index: number,
    ) => {
      const parent_quantity =
        getParent(item.parent_id)?.unfulfilled_quantity || 0;
      const packed_quantity = shipment.parcels
        .map(({ items }) => items || [])
        .flat()
        .filter((_, index) => index !== item_index)
        .reduce((acc, { parent_id, quantity }) => {
          return parent_id === item.parent_id ? acc + (quantity as number) : 0;
        }, 0);

      return parent_quantity - packed_quantity;
    };
    const isPackedItem = (cdt: CommodityType, shipment: ShipmentType) => {
      const item = getShipmentCommodities(shipment).find(
        (item) =>
          (!!cdt.parent_id && cdt.parent_id === item.parent_id) ||
          (!!cdt.hs_code && cdt.hs_code === cdt.hs_code) ||
          (!!cdt.sku && cdt.sku === item.sku),
      );
      return !!item;
    };
    const setInitialData = () => {
      const orderList = (orders.data?.orders?.edges || []).map(
        ({ node }) => node,
      );

      onChange(
        createShipmentFromOrders(
          orderList as OrderType[],
          templates,
          workspace_config,
        ),
      );

      setReady(true);
    };
    const onChange = async (changes: Partial<ShipmentType>) => {
      if (changes === undefined) {
        return;
      }
      await mutation.updateShipment({ id: shipment_id, ...changes });
      setKey(`${shipment_id}-${Date.now()}`);
    };

    useEffect(() => {
      setLoading(query.isFetching || loader.loading);
    }, [query.isFetching, loader.loading]);
    useEffect(() => {
      if (isNoneOrEmpty(order_id)) {
        notifier.notify({
          type: NotificationType.info,
          message: "Select order(s) first! redirecting...",
        });
        setTimeout(() => router.push(basePath + "/orders"), 2000);
      }
    }, [order_id]);
    useEffect(() => {
      if (ready) return;
      if (orders.isLoading) return;
      if (templates.isLoading) return;
      if (workspace_config.query.isLoading) return;
      if (shipment_id === "new") {
        setTimeout(() => setInitialData(), 500);
        return;
      }
      if (shipment_id !== "new" && Object.keys(shipment.recipient).length === 0)
        return;

      setReady(true);
      setKey(`${shipment_id}-${Date.now()}`);
    }, [ready, orders.isLoading, templates.isLoading, shipment_id, shipment]);

    return (
      <>
        <CommodityEditModalProvider
          orderFilter={{
            id: (orders.data?.orders?.edges || []).map(
              ({ node }) => node.order_id,
            ),
          }}
        >
          <header className="px-0 pb-2 pt-4 is-flex is-justify-content-space-between">
            <div>
              <span className="title is-4 my-2">Create label</span>
              <br />
              {ready && (
                <span className="has-text-weight-semibold is-size-7">
                  {(orders.data?.orders.edges || [{}]).length > 1
                    ? `Multiple Orders`
                    : `Order #${(orders.data?.orders.edges || [{}])[0]?.node?.order_id}`}
                </span>
              )}
            </div>
          </header>

          {(shipment.messages || []).length > 0 && (
            <div className="notification is-danger is-light is-size-7 my-2 p-2">
              <MessagesDescription messages={shipment.messages} />
            </div>
          )}

          {!ready && <Spinner />}

          {ready && (
            <div className="columns pb-6 m-0">
              <div
                className="column px-0"
                style={{ minHeight: "850px", minWidth: "260px" }}
              >
                {/* Address section */}
                <div className="card p-0">
                  <div className="p-3">
                    <header className="is-flex is-justify-content-space-between">
                      <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                        SHIP TO
                      </span>
                      <div className="is-vcentered">
                        <AddressModalEditor
                          shipment={shipment}
                          address={shipment.recipient}
                          onSubmit={(address) =>
                            onChange({ recipient: address })
                          }
                          trigger={
                            <button
                              className="button is-small is-info is-text is-inverted p-1"
                              disabled={loading}
                            >
                              Edit ship to address
                            </button>
                          }
                        />
                      </div>
                    </header>

                    <AddressDescription address={shipment.recipient} />
                  </div>

                  <hr className="my-1" style={{ height: "1px" }} />

                  <div className="p-3">
                    <header className="is-flex is-justify-content-space-between">
                      <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                        SHIP FROM
                      </span>
                      <div className="is-vcentered">
                        <AddressModalEditor
                          shipment={shipment}
                          address={shipment.shipper}
                          onSubmit={(address) => onChange({ shipper: address })}
                          trigger={
                            <button
                              className="button is-small is-info is-text is-inverted p-1"
                              disabled={loading}
                            >
                              Edit origin address
                            </button>
                          }
                        />
                      </div>
                    </header>

                    <AddressDescription address={shipment.shipper} />

                    {Object.values(shipment.shipper || {}).length === 0 && (
                      <div className="notification is-warning is-light my-2 py-2 px-4">
                        Please specify the origin address.
                      </div>
                    )}
                  </div>

                  {/* Retrun address section */}
                  <hr className="my-1" style={{ height: "1px" }} />

                  <div className="p-3">
                    <header className="is-flex is-justify-content-space-between">
                      <div>
                        <CheckBoxField
                          name="addInsurance"
                          fieldClass="column mb-0 is-12 px-0 py-2"
                          defaultChecked={
                            addReturn || !isNone(shipment.return_address)
                          }
                          onChange={(e) => {
                            setAddReturn(e.target.checked);
                            if (
                              !e.target.checked &&
                              !isNone(shipment.return_address)
                            ) {
                              onChange({ return_address: null });
                            }
                          }}
                        >
                          <span>Add a return address (optional)</span>
                        </CheckBoxField>
                      </div>
                      <div className="is-vcentered">
                        {(addReturn || !isNone(shipment.return_address)) && (
                          <AddressModalEditor
                            shipment={shipment}
                            address={
                              shipment.return_address ||
                              ({
                                country_code: shipment.shipper?.country_code,
                              } as AddressType)
                            }
                            onSubmit={(address) =>
                              onChange({ return_address: address })
                            }
                            trigger={
                              <button
                                className="button is-small is-info is-text is-inverted p-1"
                                disabled={query.isFetching}
                              >
                                Edit return address
                              </button>
                            }
                          />
                        )}
                      </div>
                    </header>

                    <div
                      style={{
                        display: `${isNone(shipment.return_address) ? "none" : "block"}`,
                      }}
                    >
                      {shipment?.return_address && (
                        <AddressDescription
                          address={shipment!.return_address as any}
                        />
                      )}
                    </div>

                    {Object.values(shipment?.return_address || []).length ===
                      0 && (
                      <div className="notification is-default p-2 is-size-7">
                        <span>
                          Use this to specify an origin address different from
                          the shipper address above. <br />
                          This address will be used for pickup and return.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Billing address section */}
                  <hr className="my-1" style={{ height: "1px" }} />

                  <div className="p-3">
                    <label
                      className="label is-capitalized"
                      style={{ fontSize: "0.8em" }}
                    >
                      Shipment Paid By
                    </label>

                    <div className="control">
                      <label className="radio">
                        <input
                          className="mr-1"
                          type="radio"
                          name="paid_by"
                          defaultChecked={
                            shipment.payment?.paid_by === PaidByEnum.sender
                          }
                          onChange={() =>
                            mutation.updateShipment({
                              payment: { paid_by: PaidByEnum.sender },
                            } as any)
                          }
                        />
                        <span className="is-size-7 has-text-weight-bold">
                          {formatRef(PaidByEnum.sender.toString())}
                        </span>
                      </label>
                      <label className="radio">
                        <input
                          className="mr-1"
                          type="radio"
                          name="paid_by"
                          defaultChecked={
                            shipment.payment?.paid_by === PaidByEnum.recipient
                          }
                          onChange={() =>
                            mutation.updateShipment({
                              payment: {
                                ...shipment.payment,
                                paid_by: PaidByEnum.recipient,
                              },
                            })
                          }
                        />
                        <span className="is-size-7 has-text-weight-bold">
                          {formatRef(PaidByEnum.recipient.toString())}
                        </span>
                      </label>
                      <label className="radio">
                        <input
                          className="mr-1"
                          type="radio"
                          name="paid_by"
                          defaultChecked={
                            shipment.payment?.paid_by === PaidByEnum.third_party
                          }
                          onChange={() =>
                            mutation.updateShipment({
                              payment: {
                                ...shipment.payment,
                                paid_by: PaidByEnum.third_party,
                              },
                            })
                          }
                        />
                        <span className="is-size-7 has-text-weight-bold">
                          {formatRef(PaidByEnum.third_party.toString())}
                        </span>
                      </label>
                    </div>

                    {shipment.payment?.paid_by &&
                      shipment.payment?.paid_by !== PaidByEnum.sender && (
                        <div
                          className="columns m-1 px-2 py-0"
                          style={{ borderLeft: "solid 2px #ddd" }}
                        >
                          <InputField
                            label="account number"
                            className="is-small"
                            defaultValue={
                              shipment?.payment?.account_number as string
                            }
                            onChange={(e) =>
                              mutation.updateShipment({
                                payment: {
                                  ...shipment.payment,
                                  account_number: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      )}
                  </div>

                  {(shipment.billing_address ||
                    shipment.payment?.paid_by === PaidByEnum.third_party) && (
                    <>
                      <div className="p-3">
                        <header className="is-flex is-justify-content-space-between">
                          <label
                            className="label is-capitalized"
                            style={{ fontSize: "0.8em" }}
                          >
                            Billing address
                          </label>
                          <div className="is-vcentered">
                            <AddressModalEditor
                              shipment={shipment}
                              address={
                                shipment.billing_address ||
                                (orders.data?.orders.edges || [{}])[0].node
                                  ?.billing_address ||
                                ({} as AddressType)
                              }
                              onSubmit={(address) =>
                                onChange({ billing_address: address })
                              }
                              trigger={
                                <button
                                  className="button is-small is-info is-text is-inverted p-1"
                                  disabled={query.isFetching}
                                >
                                  Edit billing address
                                </button>
                              }
                            />
                          </div>
                        </header>

                        {shipment.billing_address && (
                          <AddressDescription
                            address={shipment!.billing_address as any}
                          />
                        )}

                        {!shipment.billing_address && (
                          <div className="notification is-default p-2 is-size-7">
                            Add shipment billing address. (optional)
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Parcel & Items section */}
                <div className="card px-0 py-3 mt-5">
                  <header className="px-3 is-flex is-justify-content-space-between">
                    <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                      PACKAGES AND ITEMS
                    </span>
                    <div className="is-vcentered">
                      <ParcelModalEditor
                        header="Add package"
                        shipment={shipment}
                        onSubmit={mutation.addParcel}
                        trigger={
                          <button
                            className="button is-small is-info is-text is-inverted p-1"
                            disabled={loading}
                          >
                            Add package
                          </button>
                        }
                      />
                    </div>
                  </header>

                  <hr className="my-1" style={{ height: "1px" }} />

                  {shipment.parcels.map((pkg, pkg_index) => (
                    <React.Fragment
                      key={pkg.id || `${pkg_index}-${new Date()}`}
                    >
                      {pkg_index > 0 && (
                        <hr className="my-1" style={{ height: "3px" }} />
                      )}

                      <div className="p-3" key={pkg_index}>
                        {/* Parcel header */}
                        <div className="is-flex is-justify-content-space-between mb-4">
                          <div>
                            <ParcelDescription
                              parcel={pkg}
                              suffix={
                                <span className="tag ml-1 has-text-weight-bold">
                                  {pkg_index + 1}
                                </span>
                              }
                            />
                          </div>
                          <div>
                            <ParcelModalEditor
                              header="Edit package"
                              onSubmit={mutation.updateParcel(
                                pkg_index,
                                pkg.id,
                              )}
                              parcel={pkg}
                              shipment={shipment}
                              trigger={
                                <button
                                  type="button"
                                  className="button is-small is-white"
                                  disabled={loading}
                                >
                                  <span className="icon is-small">
                                    <i className="fas fa-pen"></i>
                                  </span>
                                </button>
                              }
                            />
                            <button
                              type="button"
                              className="button is-small is-white"
                              disabled={
                                loading || shipment.parcels.length === 1
                              }
                              onClick={mutation.removeParcel(pkg_index, pkg.id)}
                            >
                              <span className="icon is-small">
                                <i className="fas fa-times"></i>
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Items section */}
                        <span className="is-size-7 has-text-weight-semibold">
                          ITEMS
                        </span>

                        {(pkg.items || []).map((item, item_index) => (
                          <React.Fragment
                            key={item.id || `${item_index}-${new Date()}`}
                          >
                            <hr className="my-1" style={{ height: "1px" }} />
                            <div
                              key={item_index}
                              className="py-1 is-flex is-justify-content-space-between"
                            >
                              <div>
                                <p className="is-size-7 my-1 has-text-weight-semibold">
                                  {item_index + 1}{" "}
                                  {`${item.title || item.description || "Item"}`}
                                </p>
                                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                                  <span className="has-text-info">{` ORDER: ${getOrder(item.parent_id)?.order_id}`}</span>
                                  {isNoneOrEmpty(item.sku)
                                    ? " | SKU: 0000000"
                                    : ` | SKU: ${item.sku}`}
                                </p>
                              </div>
                              <div className="is-flex">
                                <div className="is-size-7 has-text-grey has-text-weight-semibold is-flex px-2">
                                  <span
                                    className="p-2 has-text-right"
                                    style={{ minWidth: "90px" }}
                                  >
                                    {formatWeight(item)}
                                  </span>
                                  <div className="field has-addons">
                                    <p className="control is-expanded">
                                      <input
                                        min={1}
                                        type="number"
                                        defaultValue={item.quantity as number}
                                        max={getAvailableQuantity(
                                          shipment,
                                          item,
                                          item_index,
                                        )}
                                        onChange={(e) => {
                                          mutation.updateItem(
                                            pkg_index,
                                            item_index,
                                            pkg.id,
                                          )({
                                            quantity: parseInt(e.target.value),
                                          } as CommodityType);
                                        }}
                                        className="input is-small"
                                        style={{
                                          width: "60px",
                                          textAlign: "center",
                                        }}
                                      />
                                    </p>
                                    <p className="control">
                                      <a className="button is-static is-small">
                                        of{" "}
                                        {
                                          getParent(item.parent_id)
                                            ?.unfulfilled_quantity
                                        }
                                      </a>
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="button is-small is-white"
                                  onClick={mutation.removeItem(
                                    pkg_index,
                                    item_index,
                                    item.id,
                                  )}
                                  disabled={pkg.items.length === 1}
                                >
                                  <span className="icon is-small">
                                    <i className="fas fa-times"></i>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </React.Fragment>
                        ))}

                        {(pkg.items || []).length === 0 && (
                          <div className="notification is-light my-2 py-2 px-4 is-size-7">
                            You can specify content items.
                          </div>
                        )}

                        <div className="mt-4">
                          <LineItemSelector
                            title="Edit items"
                            shipment={shipment}
                            onChange={(_) =>
                              mutation.addItems(pkg_index, pkg.id)(_ as any)
                            }
                            order_ids={order_id.split(",").map((s) => s.trim())}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  {(shipment.parcels || []).length === 0 && (
                    <div className="m-4 notification is-default">
                      Add one or more packages to create a shipment.
                    </div>
                  )}
                </div>

                {/* Shipping options section */}
                <div className="card px-0 py-3 mt-5">
                  <header className="px-3 is-flex is-justify-content-space-between">
                    <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                      OPTIONS
                    </span>
                  </header>

                  <hr className="my-1" style={{ height: "1px" }} />

                  <div className="p-3 pb-0">
                    {/* shipping date */}
                    <InputField
                      name="shipping_date"
                      label="shipping date"
                      type="datetime-local"
                      className="is-small"
                      wrapperClass="px-1 py-2"
                      fieldClass="column mb-0 is-4 p-0"
                      defaultValue={shipment.options?.shipping_date}
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            shipping_date: e.target.value,
                          },
                        })
                      }
                    />

                    {/* currency */}
                    <SelectField
                      name="currency"
                      label="shipment currency"
                      className="is-small is-fullwidth"
                      wrapperClass="px-1 py-2"
                      fieldClass="column is-4 mb-0 p-0"
                      value={shipment.options?.currency}
                      required={
                        !isNone(shipment.options?.insurance) ||
                        !isNone(shipment.options?.cash_on_delivery) ||
                        !isNone(shipment.options?.declared_value)
                      }
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            currency: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="">Select a currency</option>
                      {CURRENCY_OPTIONS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </SelectField>

                    {/* signature confirmation */}
                    <CheckBoxField
                      name="signature_confirmation"
                      fieldClass="column mb-0 is-12 px-1 py-2"
                      defaultChecked={shipment.options?.signature_confirmation}
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            signature_confirmation: e.target.checked,
                          },
                        })
                      }
                    >
                      <span>Add signature confirmation</span>
                    </CheckBoxField>

                    {/* insurance */}
                    <CheckBoxField
                      name="addInsurance"
                      fieldClass="column mb-0 is-12 px-1 py-2"
                      defaultChecked={!isNone(shipment.options?.insurance)}
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            insurance:
                              e.target.checked === true
                                ? shipment.options?.declared_value || ""
                                : null,
                          },
                        })
                      }
                    >
                      <span>Add insurance coverage</span>
                    </CheckBoxField>

                    <div
                      className="column is-multiline mb-0 ml-4 my-1 px-2 py-0"
                      style={{
                        borderLeft: "solid 1px #ddd",
                        display: `${isNone(shipment.options?.insurance) ? "none" : "block"}`,
                      }}
                    >
                      <InputField
                        name="insurance"
                        label="Coverage value"
                        type="number"
                        min={0}
                        step="any"
                        className="is-small"
                        wrapperClass="px-1 py-2"
                        fieldClass="column mb-0 is-4 p-0"
                        controlClass="has-icons-left has-icons-right"
                        defaultValue={shipment.options?.insurance}
                        required={!isNone(shipment.options?.insurance)}
                        onChange={(e) =>
                          onChange({
                            options: {
                              ...shipment.options,
                              insurance: parseFloat(e.target.value),
                            },
                          })
                        }
                        iconLeft={
                          <span className="icon is-small is-left">
                            <i className="fas fa-dollar-sign"></i>
                          </span>
                        }
                        iconRight={
                          <span className="icon is-small is-right">
                            {shipment.options?.currency}
                          </span>
                        }
                      />
                    </div>

                    {/* Cash on delivery */}
                    <CheckBoxField
                      name="addCOD"
                      fieldClass="column mb-0 is-12 px-1 py-2"
                      defaultChecked={
                        !isNone(shipment.options?.cash_on_delivery)
                      }
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            cash_on_delivery:
                              e.target.checked === true ? "" : null,
                          },
                        })
                      }
                    >
                      <span>Collect on delivery</span>
                    </CheckBoxField>

                    <div
                      className="column is-multiline mb-0 ml-4 my-1 px-2 py-0"
                      style={{
                        borderLeft: "solid 1px #ddd",
                        display: `${isNone(shipment.options?.cash_on_delivery) ? "none" : "block"}`,
                      }}
                    >
                      <InputField
                        name="cash_on_delivery"
                        label="Amount to collect"
                        type="number"
                        min={0}
                        step="any"
                        className="is-small"
                        wrapperClass="px-1 py-2"
                        fieldClass="column mb-0 is-4 p-0"
                        controlClass="has-icons-left has-icons-right"
                        value={shipment.options?.cash_on_delivery}
                        required={!isNone(shipment.options?.cash_on_delivery)}
                        onChange={(e) =>
                          onChange({
                            options: {
                              ...shipment.options,
                              cash_on_delivery: parseFloat(e.target.value),
                            },
                          })
                        }
                        iconLeft={
                          <span className="icon is-small is-left">
                            <i className="fas fa-dollar-sign"></i>
                          </span>
                        }
                        iconRight={
                          <span className="icon is-small is-right">
                            {shipment.options?.currency}
                          </span>
                        }
                      />
                    </div>

                    {/* Declared value */}
                    <CheckBoxField
                      name="addDeclaredValue"
                      fieldClass="column mb-0 is-12 px-1 py-2"
                      defaultChecked={!isNone(shipment.options?.declared_value)}
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            declared_value:
                              e.target.checked === true ? "" : null,
                          },
                        })
                      }
                    >
                      <span>Add package value</span>
                    </CheckBoxField>

                    <div
                      className="column is-multiline mb-0 ml-4 my-1 px-2 py-0"
                      style={{
                        borderLeft: "solid 1px #ddd",
                        display: `${isNone(shipment.options?.declared_value) ? "none" : "block"}`,
                      }}
                    >
                      <InputField
                        name="declared_value"
                        label="Package value"
                        type="number"
                        min={0}
                        step="any"
                        className="is-small"
                        wrapperClass="px-1 py-2"
                        fieldClass="column mb-0 is-4 p-0"
                        controlClass="has-icons-left has-icons-right"
                        value={shipment.options?.declared_value}
                        required={!isNone(shipment.options?.declared_value)}
                        onChange={(e) =>
                          onChange({
                            options: {
                              ...shipment.options,
                              declared_value: parseFloat(e.target.value),
                            },
                          })
                        }
                        iconLeft={
                          <span className="icon is-small is-left">
                            <i className="fas fa-dollar-sign"></i>
                          </span>
                        }
                        iconRight={
                          <span className="icon is-small is-right">
                            {shipment.options?.currency}
                          </span>
                        }
                      />
                    </div>

                    {/* paperless trade */}
                    <CheckBoxField
                      name="paperless_trade"
                      fieldClass="column mb-0 is-12 px-1 py-2"
                      defaultChecked={shipment.options?.paperless_trade}
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            paperless_trade: e.target.checked,
                          },
                        })
                      }
                    >
                      <span>Paperless trade</span>
                    </CheckBoxField>

                    {/* hold at location */}
                    <CheckBoxField
                      name="hold_at_location"
                      fieldClass="column mb-0 is-12 px-1 py-2"
                      defaultChecked={shipment.options?.hold_at_location}
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            hold_at_location: e.target.checked,
                          },
                        })
                      }
                    >
                      <span>Hold at location</span>
                    </CheckBoxField>

                    {/* dangerous good */}
                    <CheckBoxField
                      name="dangerous_good"
                      fieldClass="column mb-0 is-12 px-1 py-2"
                      defaultChecked={shipment.options?.dangerous_good}
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            dangerous_good: e.target.checked,
                          },
                        })
                      }
                    >
                      <span>Dangerous good</span>
                    </CheckBoxField>
                  </div>

                  {/* CARRIER OPTIONS SECTION */}
                  {Object.keys(carrierOptions).length > 0 && (
                    <div className="card mb-4 px-3 mx-2">
                      {/* @ts-ignore */}
                      <Disclosure>
                        {({ open }) => (
                          <div className="block">
                            <Disclosure.Button
                              as="div"
                              style={{ boxShadow: "none" }}
                              className="is-flex is-justify-content-space-between is-clickable py-2"
                            >
                              <div className="has-text-grey has-text-weight-semibold is-size-7 pt-1">
                                CARRIER SPECIFIC OPTIONS
                              </div>
                              <span className="icon is-small m-1">
                                {open ? (
                                  <i className="fas fa-chevron-up"></i>
                                ) : (
                                  <i className="fas fa-chevron-down"></i>
                                )}
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel
                              className="is-flat m-0 px-0"
                              style={{ maxHeight: "40vh" }}
                            >
                              {Object.entries(carrierOptions).map(
                                ([carrier, options]) => (
                                  <React.Fragment key={carrier}>
                                    <label
                                      className="label is-capitalized"
                                      style={{ fontSize: "0.8em" }}
                                    >
                                      {references!.carriers[carrier]}
                                    </label>
                                    <hr
                                      className="my-1"
                                      style={{ height: "1px" }}
                                    />

                                    <div className="columns is-multiline m-0 p-0">
                                      {options.map((option, index) => (
                                        <React.Fragment key={option}>
                                          {references!.options[carrier][option]
                                            ?.type === "boolean" && (
                                            <>
                                              <CheckBoxField
                                                name={option}
                                                fieldClass="column mb-0 is-6 pl-0 pr-2 py-4"
                                                defaultChecked={
                                                  shipment.options?.[option]
                                                }
                                                onChange={(e) =>
                                                  onChange({
                                                    options: {
                                                      ...shipment.options,
                                                      [option]:
                                                        e.target.checked ||
                                                        null,
                                                    },
                                                  })
                                                }
                                              >
                                                <span>{formatRef(option)}</span>
                                              </CheckBoxField>
                                            </>
                                          )}

                                          {references!.options[carrier][option]
                                            ?.type === "string" && (
                                            <>
                                              <InputField
                                                name={option}
                                                label={formatRef(option)}
                                                placeholder={formatRef(option)}
                                                className="is-small"
                                                fieldClass="mb-0 p-0"
                                                wrapperClass="column is-6 pl-0 pr-2 py-1"
                                                defaultValue={
                                                  shipment.options[option]
                                                }
                                                onChange={(e) =>
                                                  onChange({
                                                    options: {
                                                      ...shipment.options,
                                                      [option]: e.target.value,
                                                    },
                                                  })
                                                }
                                              />
                                            </>
                                          )}
                                        </React.Fragment>
                                      ))}
                                    </div>

                                    <div className="p-2"></div>
                                  </React.Fragment>
                                ),
                              )}
                            </Disclosure.Panel>
                          </div>
                        )}
                      </Disclosure>
                    </div>
                  )}

                  <hr className="my-1" style={{ height: "1px" }} />

                  <div className="p-3">
                    <InputField
                      label="Reference"
                      name="reference"
                      defaultValue={shipment.reference as string}
                      onChange={(e) =>
                        mutation.updateShipment({ reference: e.target.value })
                      }
                      placeholder="shipment reference"
                      className="is-small"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Customs declaration section */}
                {isInternational(shipment) && (
                  <div className="card px-0 py-3 mt-5">
                    <header className="px-3 is-flex is-justify-content-space-between">
                      <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                        CUSTOMS DECLARATION
                      </span>
                      <div className="is-vcentered">
                        <CustomsModalEditor
                          header="Edit customs info"
                          shipment={shipment}
                          customs={
                            (shipment?.customs as any) || {
                              ...DEFAULT_CUSTOMS_CONTENT,
                              commercial_invoice: true,
                              invoice: (orders.data?.orders.edges || [{}])[0]
                                ?.node?.order_id,
                              invoice_date:
                                getOptions().invoice_date ||
                                moment().format("YYYY-MM-DD"),
                              incoterm:
                                shipment.payment?.paid_by == "sender"
                                  ? "DDP"
                                  : "DDU",
                              commodities: getShipmentCommodities(shipment),
                              duty: {
                                ...DEFAULT_CUSTOMS_CONTENT.duty,
                                currency: shipment.options?.currency,
                                paid_by:
                                  getOptions().duty_paid_by ||
                                  shipment.payment?.paid_by,
                                account_number:
                                  getOptions().duty_account_number ||
                                  shipment.payment?.account_number,
                                declared_value:
                                  shipment.options?.declared_value,
                              },
                              duty_billing_address: shipment.billing_address,
                              options: workspace_config.customsOptions,
                            }
                          }
                          onSubmit={mutation.updateCustoms(
                            shipment?.customs?.id,
                          )}
                          trigger={
                            <button
                              className="button is-small is-info is-text is-inverted p-1"
                              disabled={loading}
                            >
                              Edit customs info
                            </button>
                          }
                        />
                      </div>
                    </header>

                    <hr className="my-1" style={{ height: "1px" }} />

                    <div className="p-3">
                      {!isNone(shipment.customs) && (
                        <>
                          <CustomsInfoDescription
                            customs={shipment.customs as CustomsType}
                          />

                          {/* Commodities section */}
                          <span className="is-size-7 mt-4 has-text-weight-semibold">
                            COMMODITIES
                          </span>

                          {(shipment.customs!.commodities || []).map(
                            (commodity, index) => (
                              <React.Fragment key={index + "customs-info"}>
                                <hr
                                  className="mt-1 mb-2"
                                  style={{ height: "1px" }}
                                />
                                <div className="is-flex is-justify-content-space-between is-vcentered">
                                  <CommodityDescription
                                    className="is-flex-grow-1 pr-2"
                                    commodity={commodity}
                                    prefix={`${index + 1} - `}
                                  />
                                  <div>
                                    {/* @ts-ignore */}
                                    <CommodityStateContext.Consumer>
                                      {({ editCommodity }) => (
                                        <button
                                          type="button"
                                          className="button is-small is-white"
                                          disabled={
                                            isPackedItem(commodity, shipment) ||
                                            query.isFetching
                                          }
                                          onClick={() =>
                                            editCommodity({
                                              commodity,
                                              onSubmit: (_) =>
                                                mutation.updateCommodity(
                                                  index,
                                                  shipment.customs?.id,
                                                )(_),
                                            })
                                          }
                                        >
                                          <span className="icon is-small">
                                            <i className="fas fa-pen"></i>
                                          </span>
                                        </button>
                                      )}
                                    </CommodityStateContext.Consumer>
                                    <button
                                      type="button"
                                      className="button is-small is-white"
                                      disabled={
                                        query.isFetching ||
                                        shipment.customs!.commodities.length ===
                                          1
                                      }
                                      onClick={() =>
                                        mutation.removeCommodity(
                                          index,
                                          shipment.customs?.id,
                                        )(commodity.id)
                                      }
                                    >
                                      <span className="icon is-small">
                                        <i className="fas fa-times"></i>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </React.Fragment>
                            ),
                          )}

                          {(shipment.customs!.commodities || []).length ===
                            0 && (
                            <div className="notification is-warning is-light my-2 py-2 px-4 is-size-7">
                              You need provide commodity items for customs
                              purpose. (required)
                            </div>
                          )}

                          <div className="is-flex is-justify-content-space-between mt-4">
                            {/* @ts-ignore */}
                            <CommodityStateContext.Consumer>
                              {({ editCommodity }) => (
                                <button
                                  type="button"
                                  className="button is-small is-info is-inverted p-2"
                                  disabled={query.isFetching}
                                  onClick={() =>
                                    editCommodity({
                                      onSubmit: (_) =>
                                        mutation.addCommodities([_] as any),
                                    })
                                  }
                                >
                                  <span className="icon is-small">
                                    <i className="fas fa-plus"></i>
                                  </span>
                                  <span>add commodity</span>
                                </button>
                              )}
                            </CommodityStateContext.Consumer>
                          </div>

                          {/* Duty Billing address section */}
                          {(shipment.customs!.duty_billing_address ||
                            shipment.customs!.duty?.paid_by ===
                              PaidByEnum.third_party) && (
                            <>
                              <hr className="my-1" style={{ height: "1px" }} />

                              <div className="py-3">
                                <header className="is-flex is-justify-content-space-between">
                                  <label
                                    className="label is-capitalized"
                                    style={{ fontSize: "0.8em" }}
                                  >
                                    Billing address
                                  </label>
                                  <div className="is-vcentered">
                                    <AddressModalEditor
                                      address={
                                        shipment.customs
                                          ?.duty_billing_address ||
                                        ({} as AddressType)
                                      }
                                      onSubmit={(address) =>
                                        mutation.updateShipment({
                                          customs: {
                                            ...shipment!.customs,
                                            duty_billing_address: address,
                                          } as any,
                                        })
                                      }
                                      trigger={
                                        <button
                                          className="button is-small is-info is-text is-inverted p-1"
                                          disabled={query.isFetching}
                                        >
                                          Edit duty billing address
                                        </button>
                                      }
                                    />
                                  </div>
                                </header>

                                {shipment!.customs!.duty_billing_address && (
                                  <AddressDescription
                                    address={
                                      shipment!.customs!
                                        .duty_billing_address as any
                                    }
                                  />
                                )}

                                {isNone(
                                  shipment!.customs!.duty_billing_address,
                                ) && (
                                  <div className="notification is-default p-2 is-size-7">
                                    Add customs duty billing address. (optional)
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {isNone(shipment.customs) && (
                        <div className="notification is-warning is-light my-2 py-2 px-4 is-size-7">
                          Looks like you have an international shipment. You may
                          need to provide a customs declaration unless you are
                          shipping documents only.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2"></div>

              <div
                className="column is-5 px-0 pb-6 is-relative"
                style={{ minWidth: "260px" }}
              >
                <div
                  style={{ position: "sticky", top: "8.5%", right: 0, left: 0 }}
                >
                  <CommoditySummary
                    shipment={shipment as ShipmentType}
                    orders={
                      orders.data?.orders?.edges.map(
                        ({ node }) => node,
                      ) as OrderType[]
                    }
                    className="card px-0 mb-5"
                  />

                  {/* Shipping section */}
                  <div className="card px-0">
                    <header className="px-3 py-2 is-flex is-justify-content-space-between">
                      <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                        SHIPPING SERVICES
                      </span>
                      <div className="is-vcentered">
                        <button
                          className="button is-small is-info is-text is-inverted p-1"
                          onClick={() => mutation.fetchRates.mutateAsync()}
                          disabled={
                            requireInfoForRating(shipment) ||
                            mutation.fetchRates.isLoading
                          }
                        >
                          Refresh rates
                        </button>
                      </div>
                    </header>

                    <hr className="my-1" style={{ height: "1px" }} />

                    {/* Live rates section */}
                    <div className="p-0 py-1">
                      {loading && (
                        <Spinner className="my-1 p-2 has-text-centered" />
                      )}

                      {!loading && (shipment.rates || []).length === 0 && (
                        <div className="notification p-2 m-2 is-default is-size-7">
                          Provide all shipping details to retrieve shipping
                          rates.
                        </div>
                      )}

                      {!loading && (shipment.rates || []).length > 0 && (
                        <div
                          className="menu-list px-2 rates-list-box"
                          style={{ maxHeight: "16.8em" }}
                        >
                          {(shipment.rates || []).map((rate) => (
                            <a
                              key={rate.id}
                              {...(rate.test_mode
                                ? { title: "Test Mode" }
                                : {})}
                              className={`card m-0 mb-1 is-vcentered p-1 ${rate.service === shipment.options.preferred_service ? "has-text-grey-dark has-background-success-light" : "has-text-grey"} ${rate.id === selected_rate?.id ? "has-text-grey-dark has-background-grey-lighter" : "has-text-grey"}`}
                              onClick={() => {
                                setSelectedRate(rate);
                                onChange({
                                  options: {
                                    ...shipment.options,
                                    preferred_service: rate.service,
                                  },
                                });
                              }}
                            >
                              <div className="icon-text">
                                <CarrierImage
                                  carrier_name={
                                    (rate.meta as any)?.carrier ||
                                    rate.carrier_name
                                  }
                                  width={30}
                                  height={30}
                                  text_color={
                                    getCarrier(rate)?.config?.text_color
                                  }
                                  background={
                                    getCarrier(rate)?.config?.brand_color
                                  }
                                />
                                <RateDescription rate={rate} />
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    <hr className="my-1" style={{ height: "1px" }} />

                    <div className="p-3 has-text-centered">
                      <div className="control">
                        <label className="radio">
                          <input
                            className="mr-1"
                            type="radio"
                            name="label_type"
                            defaultChecked={
                              shipment.label_type === LabelTypeEnum.PDF
                            }
                            onChange={() =>
                              onChange({ label_type: LabelTypeEnum.PDF })
                            }
                          />
                          <span className="is-size-7 has-text-weight-bold">
                            {LabelTypeEnum.PDF}
                          </span>
                        </label>
                        <label className="radio">
                          <input
                            className="mr-1"
                            type="radio"
                            name="label_type"
                            defaultChecked={
                              shipment.label_type === LabelTypeEnum.ZPL
                            }
                            onChange={() =>
                              onChange({ label_type: LabelTypeEnum.ZPL })
                            }
                          />
                          <span className="is-size-7 has-text-weight-bold">
                            {LabelTypeEnum.ZPL}
                          </span>
                        </label>
                      </div>
                    </div>

                    <ButtonField
                      onClick={() =>
                        mutation.buyLabel.mutateAsync(selected_rate as any)
                      }
                      fieldClass="has-text-centered py-1 px-6 m-0"
                      className="is-success is-fullwidth"
                      disabled={
                        (shipment.rates || []).filter(
                          (r) => r.id === selected_rate?.id,
                        ).length === 0 ||
                        mutation.buyLabel.isLoading ||
                        loading
                      }
                    >
                      <span className="px-6">Buy shipping label</span>
                    </ButtonField>

                    <div className="py-1"></div>

                    {!(!!shipment.id && shipment.id !== "new") && (
                      <ButtonField
                        onClick={() => mutation.saveDraft.mutateAsync({})}
                        fieldClass="has-text-centered py-1 px-6 m-0"
                        className="is-default is-fullwidth"
                        disabled={
                          query.isFetching || mutation.saveDraft.isLoading
                        }
                      >
                        <span className="px-6">Save draft</span>
                      </ButtonField>
                    )}

                    <div className="py-2"></div>
                  </div>

                  {/* Metadata section */}
                  <div className="card px-0 mt-5">
                    <div className="p-1 pb-4">
                      <MetadataEditor
                        object_type={MetadataObjectTypeEnum.shipment}
                        metadata={shipment.metadata}
                        onChange={(metadata) => onChange({ metadata })}
                      >
                        {/* @ts-ignore */}
                        <MetadataEditorContext.Consumer>
                          {({ isEditing, editMetadata }) => (
                            <>
                              <header className="is-flex is-justify-content-space-between p-2">
                                <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                                  METADATA
                                </span>
                                <div className="is-vcentered">
                                  <button
                                    type="button"
                                    className="button is-small is-info is-text is-inverted p-1"
                                    disabled={isEditing}
                                    onClick={() => editMetadata()}
                                  >
                                    <span>Edit metadata</span>
                                  </button>
                                </div>
                              </header>
                            </>
                          )}
                        </MetadataEditorContext.Consumer>
                      </MetadataEditor>
                    </div>
                  </div>

                  {/* Instructions section */}
                  <div className="card px-0 mt-5">
                    <div className="p-3">
                      {/* @ts-ignore */}
                      <TextAreaField
                        rows={2}
                        label="Shipping instructions"
                        autoComplete="off"
                        name="instructions"
                        className="is-small"
                        placeholder="shipping instructions"
                        defaultValue={shipment.options?.instructions}
                        required={!isNone(shipment.options?.instructions)}
                        onChange={(e) =>
                          onChange({
                            options: {
                              ...shipment.options,
                              instructions: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CommodityEditModalProvider>
      </>
    );
  };

  return (
    <>
      <GoogleGeocodingScript />

      <ContextProviders>
        <Component />
      </ContextProviders>
    </>
  );
}
