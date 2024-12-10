"use client";
import {
  AddressType,
  CommodityType,
  CURRENCY_OPTIONS,
  CustomsType,
  NotificationType,
  OrderType,
  ShipmentType,
  get_orders_orders_edges,
  LabelTypeEnum,
  MetadataObjectTypeEnum,
  PaidByEnum,
  ShipmentStatusEnum,
  DEFAULT_PARCEL_CONTENT,
  DEFAULT_CUSTOMS_CONTENT,
} from "@karrio/types";
import {
  formatRef,
  formatWeight,
  getShipmentCommodities,
  isNone,
  isNoneOrEmpty,
} from "@karrio/lib";
import {
  AddressModalEditor,
  CustomsModalEditor,
  ParcelModalEditor,
} from "@karrio/ui/modals/form-modals";
import {
  CommodityEditModalProvider,
  CommodityStateContext,
} from "@karrio/ui/modals/commodity-edit-modal";
import {
  MetadataEditor,
  MetadataEditorContext,
} from "@karrio/ui/forms/metadata-editor";
import { CustomsInfoDescription } from "@karrio/ui/components/customs-info-description";
import { GoogleGeocodingScript } from "@karrio/ui/components/google-geocoding-script";
import { CommodityDescription } from "@karrio/ui/components/commodity-description";
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
import { ModalProvider } from "@karrio/ui/modals/modal";
import { Spinner } from "@karrio/ui/components/spinner";
import { bundleContexts } from "@karrio/hooks/utils";
import { useLocation } from "@karrio/hooks/location";
import { useAppMode } from "@karrio/hooks/app-mode";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOrders } from "@karrio/hooks/order";
import { Disclosure } from "@headlessui/react";

export const generateMetadata = dynamicMetadata("Create Label");
const ContextProviders = bundleContexts([
  CommodityEditModalProvider,
  ModalProvider,
]);

export default function CreateLabelPage(pageProps: any) {
  const Component = (): JSX.Element => {
    const notifier = useNotifier();
    const { basePath } = useAppMode();
    const { references } = useAPIMetadata();
    const { carrierOptions } = useConnections();
    const workspace_config = useWorkspaceConfig();
    const { addUrlParam, ...router } = useLocation();
    const searchParams = useSearchParams();
    const { query: templates } = useDefaultTemplates();
    const [ready, setReady] = useState<boolean>(false);
    const shipment_id = searchParams.get("shipment_id") || "new";
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
    const { query: orders } = useOrders({
      first: 10,
      status: ["unfulfilled", "partial"] as any,
    });
    const [selected_rate, setSelectedRate] = useState<
      ShipmentType["rates"][0] | undefined
    >(
      shipment?.selected_rate_id
        ? ({ id: shipment?.selected_rate_id } as any)
        : undefined,
    );

    const requireInfoForRating = (shipment: ShipmentType) => {
      return (
        shipment.recipient.address_line1 === undefined ||
        shipment.shipper.address_line1 === undefined ||
        shipment.parcels.length === 0 ||
        query.isFetching === true
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
    const getLinkedOrders = (
      orderList?: get_orders_orders_edges[],
      shipment?: ShipmentType,
    ) => {
      if (shipment && orderList) {
        const parents = Array.from(
          new Set(
            getShipmentCommodities(shipment)
              .filter(({ parent_id }) => !!parent_id)
              .map(({ parent_id }) => parent_id),
          ),
        );
        return (orderList || [])
          .map(({ node }) => node)
          .filter(
            ({ line_items = [] }) =>
              line_items.filter(({ id }) => parents.includes(id)).length > 0,
          ) as OrderType[];
      }

      return [];
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
    const setInitialData = () => {
      const shipper =
        templates.data?.default_templates.default_address?.address ||
        ({} as any);
      const parcel = {
        ...(templates.data?.default_templates.default_parcel?.parcel ||
          DEFAULT_PARCEL_CONTENT),
      };

      if (
        !!workspace_config.query.data?.workspace_config?.federal_tax_id &&
        !shipper.federal_tax_id
      ) {
        shipper.federal_tax_id =
          workspace_config.query.data?.workspace_config?.federal_tax_id;
      }
      if (
        !!workspace_config.query.data?.workspace_config?.state_tax_id &&
        !shipper.state_tax_id
      ) {
        shipper.state_tax_id =
          workspace_config.query.data?.workspace_config?.state_tax_id;
      }

      onChange({
        ...(shipper
          ? { shipper: shipper as (typeof shipment)["shipper"] }
          : {}),
        ...(parcel
          ? { parcels: [parcel] as (typeof shipment)["parcels"] }
          : {}),
        label_type: LabelTypeEnum.PDF,
      });

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
      if (shipment.status && shipment.status !== ShipmentStatusEnum.draft) {
        notifier.notify({
          type: NotificationType.info,
          message: "Label already purchased! redirecting...",
        });
        setTimeout(() => router.push(basePath), 2000);
      }
    }, [shipment]);
    useEffect(() => {
      if (ready) return;
      const orders_called =
        (references.ORDERS_MANAGEMENT && !orders.isLoading) || true;

      if (
        !ready &&
        !templates.isLoading &&
        !workspace_config.query.isLoading &&
        shipment_id === "new" &&
        orders_called
      ) {
        setTimeout(() => setInitialData(), 1000);
      }
      if (
        !ready &&
        query.isLoading &&
        !isNoneOrEmpty(shipment_id) &&
        shipment_id !== "new" &&
        orders_called
      ) {
        setReady(true);
      }
    }, [
      ready,
      templates.isLoading,
      orders.isLoading,
      query.isLoading,
      workspace_config.query.isLoading,
      shipment_id,
      shipment,
    ]);

    return (
      <>
        <CommodityEditModalProvider orderFilter={{ isDisabled: true }}>
          <header className="px-0 pb-2 pt-4 is-flex is-justify-content-space-between">
            <span className="title is-4">Create label</span>
          </header>

          {(shipment.messages || []).length > 0 && (
            <div className="notification is-danger is-light is-size-7 my-2 p-2">
              <MessagesDescription messages={shipment.messages} />
            </div>
          )}

          {!ready && <Spinner />}

          {/* Shipment details section */}
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
                        RECIPIENT
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
                              disabled={query.isFetching}
                            >
                              Edit recipient address
                            </button>
                          }
                        />
                      </div>
                    </header>

                    <AddressDescription address={shipment.recipient} />

                    {Object.values(shipment.recipient || {}).length === 0 && (
                      <div className="notification is-warning is-light my-2 py-2 px-4">
                        Please add a recipient address.
                      </div>
                    )}
                  </div>

                  <hr className="my-1" style={{ height: "1px" }} />

                  <div className="p-3">
                    <header className="is-flex is-justify-content-space-between">
                      <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                        SHIPPER
                      </span>
                      <div className="is-vcentered">
                        <AddressModalEditor
                          shipment={shipment}
                          address={shipment.shipper}
                          onSubmit={(address) => onChange({ shipper: address })}
                          trigger={
                            <button
                              className="button is-small is-info is-text is-inverted p-1"
                              disabled={query.isFetching}
                            >
                              Edit shipper address
                            </button>
                          }
                        />
                      </div>
                    </header>

                    <AddressDescription address={shipment.shipper} />

                    {Object.values(shipment.shipper || {}).length === 0 && (
                      <div className="notification is-warning is-light my-2 py-2 px-4">
                        Please specify the shipper address.
                      </div>
                    )}
                  </div>

                  {/* Retrun address section */}
                  <hr className="my-1" style={{ height: "1px" }} />

                  <div className="p-3">
                    <header className="is-flex is-justify-content-space-between">
                      <div>
                        <CheckBoxField
                          name="addReturn"
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
                              billing_address: null,
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
                              billing_address: null,
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

                  {(shipment?.billing_address ||
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
                                shipment.billing_address || ({} as AddressType)
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

                        {shipment?.billing_address && (
                          <AddressDescription
                            address={shipment!.billing_address as any}
                          />
                        )}

                        {isNone(shipment?.billing_address) && (
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
                      PACKAGES
                    </span>
                    <div className="is-vcentered">
                      <ParcelModalEditor
                        header="Add package"
                        shipment={shipment}
                        onSubmit={mutation.addParcel}
                        trigger={
                          <button
                            className="button is-small is-info is-text is-inverted p-1"
                            disabled={query.isFetching}
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
                                  disabled={query.isFetching}
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
                                query.isFetching ||
                                shipment.parcels.length === 1
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
                                  {isNoneOrEmpty(item.sku)
                                    ? "SKU: 0000000"
                                    : `SKU: ${item.sku}`}
                                  {getOrder(item.parent_id) && (
                                    <span className="has-text-info">
                                      {` | ORDER: ${getOrder(item.parent_id)?.order_id}`}
                                    </span>
                                  )}
                                </p>
                                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey"></p>
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
                                        value={item.quantity as number}
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
                                        {...(getParent(item.parent_id)
                                          ? {
                                              max: getAvailableQuantity(
                                                shipment,
                                                item,
                                                item_index,
                                              ),
                                            }
                                          : {})}
                                      />
                                    </p>
                                    {getParent(item.parent_id) && (
                                      <p className="control">
                                        <a className="button is-static is-small">
                                          of{" "}
                                          {getParent(item.parent_id)
                                            ?.unfulfilled_quantity ||
                                            item.quantity}
                                        </a>
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {/* @ts-ignore */}
                                <CommodityStateContext.Consumer>
                                  {({ editCommodity }) => (
                                    <button
                                      type="button"
                                      className="button is-small is-white"
                                      disabled={
                                        query.isFetching ||
                                        !isNone(item.parent_id)
                                      }
                                      onClick={() =>
                                        editCommodity({
                                          commodity: item,
                                          onSubmit: (_) =>
                                            mutation.updateItem(
                                              pkg_index,
                                              item_index,
                                              pkg.id,
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
                                  onClick={mutation.removeItem(
                                    pkg_index,
                                    item_index,
                                    item.id,
                                  )}
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
                                      mutation.addItems(
                                        pkg_index,
                                        pkg.id,
                                      )([_] as any),
                                  })
                                }
                              >
                                <span className="icon is-small">
                                  <i className="fas fa-plus"></i>
                                </span>
                                <span>Add item</span>
                              </button>
                            )}
                          </CommodityStateContext.Consumer>
                          {references.ORDERS_MANAGEMENT && (
                            <LineItemSelector
                              title="Add items"
                              shipment={shipment}
                              onChange={(_) =>
                                mutation.addItems(pkg_index, pkg.id)(_ as any)
                              }
                            />
                          )}
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
                      fieldClass="column is-4 mb-0 px-0 py-2"
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
                      fieldClass="column mb-0 is-12 px-0 py-2"
                      defaultChecked={shipment.options?.signature_confirmation}
                      onChange={(e) =>
                        onChange({
                          options: {
                            ...shipment.options,
                            signature_confirmation: e.target.checked || null,
                          },
                        })
                      }
                    >
                      <span>Add signature confirmation</span>
                    </CheckBoxField>

                    {/* insurance */}
                    <CheckBoxField
                      name="addInsurance"
                      fieldClass="column mb-0 is-12 px-0 py-2"
                      defaultChecked={
                        !isNoneOrEmpty(shipment.options?.insurance)
                      }
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
                      fieldClass="column mb-0 is-12 px-0 py-2"
                      defaultChecked={
                        !isNoneOrEmpty(shipment.options?.cash_on_delivery)
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
                        defaultValue={shipment.options?.cash_on_delivery}
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
                      name="addCOD"
                      fieldClass="column mb-0 is-12 px-0 py-2"
                      defaultChecked={
                        !isNoneOrEmpty(shipment.options?.declared_value)
                      }
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
                          <span className="icon is-small is-right pr-2">
                            {shipment.options?.currency}
                          </span>
                        }
                      />
                    </div>

                    {/* paperless trade */}
                    <CheckBoxField
                      name="paperless_trade"
                      fieldClass="column mb-0 is-12 px-0 py-2"
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
                      fieldClass="column mb-0 is-12 px-0 py-2"
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
                      fieldClass="column mb-0 is-12 px-0 py-2"
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
                        mutation.updateShipment({
                          reference: e.target.value as string,
                        })
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
                              incoterm:
                                shipment.payment?.paid_by == PaidByEnum.sender
                                  ? "DDP"
                                  : "DDU",
                              duty: {
                                ...DEFAULT_CUSTOMS_CONTENT.duty,
                                currency: shipment.options?.currency,
                                paid_by: shipment.payment?.paid_by,
                                account_number:
                                  shipment.payment?.account_number,
                                declared_value:
                                  shipment.options?.declared_value,
                              },
                              duty_billing_address: shipment.billing_address,
                              commodities: getShipmentCommodities(shipment),
                              options: workspace_config.customsOptions,
                            }
                          }
                          onSubmit={mutation.updateCustoms(
                            shipment?.customs?.id,
                          )}
                          trigger={
                            <button
                              className="button is-small is-info is-text is-inverted p-1"
                              disabled={query.isFetching}
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
                            {references.ORDERS_MANAGEMENT && (
                              <LineItemSelector
                                title="Add commodities"
                                shipment={shipment}
                                onChange={(_) =>
                                  mutation.addCommodities(_ as any)
                                }
                              />
                            )}
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

              {/* Shipment details section */}
              <div
                className="column is-5 px-0 pb-6 is-relative"
                style={{ minWidth: "260px" }}
              >
                <div
                  style={{ position: "sticky", top: "8.5%", right: 0, left: 0 }}
                >
                  {/* Shipment Summary */}
                  <CommoditySummary
                    shipment={shipment as ShipmentType}
                    orders={getLinkedOrders(
                      orders.data?.orders?.edges,
                      shipment as ShipmentType,
                    )}
                    className="card px-0 mb-5"
                  />

                  {/* Purchase shipment section */}
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
                      {!query.isFetched &&
                        query.isFetching &&
                        (shipment.rates || []).length === 0 && (
                          <Spinner className="my-1 p-2 has-text-centered" />
                        )}

                      {query.isFetched &&
                        !query.isFetching &&
                        (shipment.rates || []).length === 0 && (
                          <div className="notification is-default m-2 p-2 is-size-7">
                            Provide all shipping details to retrieve shipping
                            rates.
                          </div>
                        )}

                      {query.isFetched && (shipment.rates || []).length > 0 && (
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
                        query.isFetching
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
