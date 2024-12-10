"use client";
import {
  AddressType,
  CURRENCY_OPTIONS,
  CommodityType,
  CustomsType,
  DEFAULT_CUSTOMS_CONTENT,
  MetadataObjectTypeEnum,
  NotificationType,
  OrderType,
  PaidByEnum,
  ShipmentType,
} from "@karrio/types";
import {
  createShipmentFromOrders,
  formatAddressLocationShort,
  formatRef,
  formatWeight,
  getShipmentCommodities,
  isNone,
  isNoneOrEmpty,
  p,
} from "@karrio/lib";
import {
  CheckBoxField,
  Dropdown,
  InputField,
  SelectField,
  Spinner,
  TextAreaField,
} from "@karrio/ui/components";
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
import { MessagesDescription } from "@karrio/ui/components/messages-description";
import { AddressDescription } from "@karrio/ui/components/address-description";
import { useSystemConnections } from "@karrio/hooks/system-connection";
import { ParcelDescription } from "@karrio/ui/components/parcel-description";
import { CommoditySummary } from "@karrio/ui/components/commodity-summary";
import { RateDescription } from "@karrio/ui/components/rate-description";
import { LineItemSelector } from "@karrio/ui/forms/line-item-selector";
import { useCarrierConnections } from "@karrio/hooks/user-connection";
import { useDefaultTemplates } from "@karrio/hooks/default-template";
import { useBatchShipmentForm } from "@karrio/hooks/bulk-shipments";
import { useWorkspaceConfig } from "@karrio/hooks/workspace-config";
import { useConnections } from "@karrio/hooks/carrier-connections";
import { CarrierImage } from "@karrio/ui/components/carrier-image";
import { dynamicMetadata } from "@karrio/core/components/metadata";
import { closeDropdown } from "@karrio/ui/components/dropdown";
import { useNotifier } from "@karrio/ui/components/notifier";
import { useAPIMetadata } from "@karrio/hooks/api-metadata";
import { useLoader } from "@karrio/ui/components/loader";
import { AppLink } from "@karrio/ui/components/app-link";
import { ModalProvider } from "@karrio/ui/modals/modal";
import { Dialog, Disclosure } from "@headlessui/react";
import { useShipments } from "@karrio/hooks/shipment";
import { bundleContexts } from "@karrio/hooks/utils";
import { useLocation } from "@karrio/hooks/location";
import { useAppMode } from "@karrio/hooks/app-mode";
import { useSearchParams } from "next/navigation";
import { useOrders } from "@karrio/hooks/order";
import Image from "next/legacy/image";
import React from "react";

export const generateMetadata = dynamicMetadata("Create labels");
const ContextProviders = bundleContexts([ModalProvider]);

export default function Page(pageProps: any) {
  const Component = (): JSX.Element => {
    // General context data         -----------------------------------------------------------
    //#region
    const loader = useLoader();
    const router = useLocation();
    const notifier = useNotifier();
    const { metadata } = useAPIMetadata();
    const searchParams = useSearchParams();
    const { basePath } = useAppMode();
    const { references } = useAPIMetadata();
    const { carrierOptions } = useConnections();
    const workspace_config = useWorkspaceConfig();
    const { query: defaults } = useDefaultTemplates();
    const [order_ids, shipment_ids] = [
      searchParams.get("order_ids") || "",
      searchParams.get("shipment_ids") || "",
    ];
    const [orderIds] = React.useState<string[]>(
      order_ids.split(",").filter((_) => !isNoneOrEmpty(_)),
    );
    const [shipmentIds] = React.useState<string[]>(
      shipment_ids.split(",").filter((_) => !isNoneOrEmpty(_)),
    );

    const {
      query: { data: { user_connections } = {} },
    } = useCarrierConnections();
    const {
      query: { data: { system_connections } = {} },
    } = useSystemConnections();
    const ordersQuery = useOrders({
      id: orderIds,
      isDisabled: orderIds.length === 0,
    });
    const shipmentsQuery = useShipments({
      id: shipmentIds,
      cacheKey: "labels",
      isDisabled: shipmentIds.length === 0,
    });
    const {
      query: { data: { orders: orderList } = {} },
    } = ordersQuery;
    const {
      query: { data: { shipments: shipmentList } = {} },
    } = shipmentsQuery;

    const { batch, ...mutation } = useBatchShipmentForm({
      shipmentList:
        shipmentIds.length === 0
          ? collectShipments(orderList)
          : (shipmentList?.edges.map(({ node }) => node) as ShipmentType[]),
    });

    function collectShipments(current: typeof orderList) {
      return (current?.edges || []).map(({ node: order }) => {
        const shipment =
          order.shipments.find(({ status }) => status === "draft") ||
          createShipmentFromOrders(
            [order] as OrderType[],
            defaults,
            workspace_config,
          );

        return shipment as ShipmentType;
      });
    }

    //#endregion

    // Bulk shipment context data   -----------------------------------------------------------
    //#region

    const [ready, setReady] = React.useState(false);
    const [allChecked, setAllChecked] = React.useState(false);
    const [selection, setSelection] = React.useState<string[]>([]);

    const _shipmentsOrdersQuery = useOrders({
      order_id: (shipmentList?.edges || [])
        .map(({ node }) =>
          (node.meta?.order_id || node.metadata?.order_ids || "").split(","),
        )
        .flat()
        .filter((_) => !isNoneOrEmpty(_)),
      isDisabled:
        orderIds.length === 0 &&
        (shipmentList?.edges || [])
          .map(({ node }) =>
            (node.meta?.order_id || node.metadata?.order_ids || "").split(","),
          )
          .flat()
          .filter((_) => !isNoneOrEmpty(_)).length === 0,
    });
    const shipmentsOrdersQuery =
      orderIds.length > 0 ? ordersQuery : _shipmentsOrdersQuery;
    const {
      query: { data: { orders: shipmentOrderList } = {} },
    } = shipmentsOrdersQuery;

    const handleSelection = (e: React.ChangeEvent) => {
      const { checked, name } = e.target as HTMLInputElement;
      if (name === "all") {
        setSelection(
          !checked ? [] : (batch.shipments || []).map(({ id }) => id as string),
        );
      } else {
        setSelection(
          checked
            ? [...selection, name]
            : selection.filter((id) => id !== name),
        );
      }
    };
    const updatedSelection = (
      selectedShipments: string[],
      current: typeof batch.shipments,
    ) => {
      const shipment_ids = (current || []).map(({ id }) => id);
      const selection = selectedShipments.filter((id) =>
        shipment_ids.includes(id),
      );
      const selected =
        selection.length > 0 &&
        selection.length === (shipment_ids || []).length;
      setAllChecked(selected);
      if (
        selectedShipments.filter((id) => !shipment_ids.includes(id)).length > 0
      ) {
        setSelection(selection);
      }
    };
    const retrieveShipment = (shipments: ShipmentType[], selected?: string) => {
      const shipment_index = shipments.findIndex(
        ({ id }, index) => `${id || index}` === `${selected}`,
      );
      const shipment = shipments[shipment_index];
      const ShipmentEditor = (
        f: (props: { shipment: ShipmentType; shipment_index: number }) => any,
      ): JSX.Element =>
        !!shipment && !isNone(shipment_index) ? (
          f({ shipment, shipment_index })
        ) : (
          <></>
        );
      return ShipmentEditor;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await mutation.buyLabels.mutateAsync();
        router.push(
          `${basePath}${location.pathname.replace(basePath, "").replace("create_labels", "")}`,
        );
      } catch (message: any) {
        notifier.notify({ type: NotificationType.error, message });
      }
      loader.setLoading(false);
    };

    //#endregion

    // Shipment editor context data -----------------------------------------------------------
    //#region

    const [isOpen, setIsOpen] = React.useState(false);
    const [keys, setKeys] = React.useState<{ [code: number]: string }>({});
    const [selectedRow, setSelectedRow] = React.useState<string | undefined>();
    const [addReturn, setAddReturn] = React.useState<boolean>(false);

    const requireInfoForRating = (shipment: ShipmentType) => {
      return (
        shipment.recipient.address_line1 === undefined ||
        shipment.shipper.address_line1 === undefined ||
        shipment.parcels.length === 0 ||
        shipmentsQuery.query.isFetching === true
      );
    };
    const isInternational = (shipment: ShipmentType) => {
      return (
        shipment.recipient.country_code !== undefined &&
        shipment.shipper.country_code !== undefined &&
        shipment.recipient.country_code !== shipment.shipper.country_code
      );
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
    const getCarrier = (rate: ShipmentType["rates"][0]) =>
      !!rate &&
      (user_connections?.find(
        (_) =>
          _.id === rate.meta.carrier_connection_id ||
          _.carrier_id === rate.carrier_id,
      ) ||
        system_connections?.find(
          (_) =>
            _.id === rate.meta.carrier_connection_id ||
            _.carrier_id === rate.carrier_id,
        ));
    const toggle = (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedRow(id);
      setIsOpen(true);
    };
    const onClose = () => {
      setSelectedRow(undefined);
      setIsOpen(false);
    };
    const selectedRate = (shipment: ShipmentType) =>
      (shipment?.rates || []).find(
        (_) => _.service === shipment?.options?.preferred_service,
      ) || (shipment?.rates || [])[0];
    const getItems = (orders: OrderType[]) => {
      return (orders || []).map(({ line_items }) => line_items).flat();
    };
    const getParent = (orders: OrderType[], id: string | null) => {
      return getItems(orders).find((item) => item.id === id);
    };
    const getOrder = (orders: OrderType[], item_id?: string | null) => {
      return (orders || []).find((order) =>
        order.line_items.find((item) => item.id === item_id),
      );
    };
    const getAvailableQuantity = (
      shipment: ShipmentType,
      orders: OrderType[],
      item: CommodityType,
      item_index: number,
    ) => {
      const parent_quantity =
        getParent(orders, item.parent_id)?.unfulfilled_quantity || 0;
      const packed_quantity = shipment.parcels
        .map(({ items }) => items || [])
        .flat()
        .filter((_, index) => index !== item_index)
        .reduce((acc, { parent_id, quantity }) => {
          return parent_id === item.parent_id ? acc + (quantity as number) : 0;
        }, 0);

      return parent_quantity - packed_quantity;
    };
    const onChange = async (
      shipment_index: number,
      shipment: ShipmentType,
      changes: Partial<ShipmentType>,
    ) => {
      if (changes === undefined) {
        return;
      }
      await mutation.updateShipment(shipment_index)({
        id: shipment.id,
        ...changes,
      });
      setKeys({
        ...keys,
        [shipment_index]: `${shipment.id || shipment_index}-${new Date()}`,
      });
    };

    //#endregion

    React.useEffect(() => {
      updatedSelection(selection, batch.shipments);
    }, [selection, batch.shipments]);
    React.useEffect(() => {
      if (ready === true) return;
      if ((batch.shipments || []).length === 0) return;
      if (workspace_config.query.isLoading) return;
      if (orderIds.length > 0 && ordersQuery.query.isLoading) return;
      if (shipmentIds.length > 0 && shipmentsQuery.query.isLoading) return;
      if (shipmentsOrdersQuery.query.isLoading) return;

      setReady(true);
      setKeys(
        (batch.shipments || []).reduce(
          (acc, shipment, index) => ({
            ...acc,
            [index]: `${shipment.id || index}-${new Date()}`,
          }),
          {},
        ),
      );
    }, [
      ready,
      orderIds,
      shipmentIds,
      batch.shipments,
      ordersQuery.query.isLoading,
      shipmentsQuery.query.isLoading,
      workspace_config.query.isLoading,
      shipmentsOrdersQuery.query.isLoading,
    ]);

    return (
      <div className="p-4">
        <header className="pb-2 pt-0 is-flex is-justify-content-space-between">
          <div className="is-vcentered">
            <AppLink
              className="button is-small is-white"
              href={location.pathname
                .replace(basePath, "")
                .replace("create_labels", "")}
              style={{ borderRadius: "50%" }}
            >
              <span className="icon is-size-6">
                <i className="fas fa-lg fa-times"></i>
              </span>
            </AppLink>
            <span className="title is-6 has-text-weight-semibold p-3">
              Create shipping labels
            </span>
          </div>
          <div>
            <button
              type="button"
              className="button is-small is-success"
              onClick={handleSubmit}
              disabled={
                loader.loading ||
                mutation.buyLabels.isLoading ||
                (batch?.shipments || []).length === 0 ||
                (batch?.shipments || []).filter(
                  (_) => (_.rates || []).length === 0,
                ).length > 0
              }
            >
              <span>Create labels</span>
            </button>
          </div>
        </header>

        <hr className="mt-1 mb-5" style={{ height: "1px" }} />

        {!ready && <Spinner />}

        {ready && Object.keys(keys).length > 0 && (
          <>
            {/* Error & messages */}
            {(batch.shipments || []).map((_) => _.messages || []).flat()
              .length > 0 && (
              <>
                <div className="notification is-warning is-light is-size-7 my-2 p-2">
                  {(batch.shipments || [])
                    .filter((_) => (_.messages || []).length > 0)
                    .map((shipment, index) => (
                      <React.Fragment key={`${index}-${new Date()}`}>
                        <label
                          className="label is-capitalized mt-2"
                          style={{ fontSize: "0.8em" }}
                        >
                          {`#${shipment.meta?.order_id || shipment.metadata?.order_ids || " - "}`}
                          {" - "}
                          {formatAddressLocationShort(
                            shipment.recipient as AddressType,
                          )}
                        </label>
                        <hr className="my-1" style={{ height: "1px" }} />
                        <MessagesDescription
                          key={index}
                          messages={shipment.messages}
                        />
                      </React.Fragment>
                    ))}
                </div>
              </>
            )}

            {/* Batch labels table */}
            <>
              <div className="table-container pb-1">
                <table className="batch-labels-table table is-fullwidth">
                  <tbody className="card">
                    <tr className="is-size-6 has-text-weight-bold">
                      <td
                        className="selector has-text-centered p-2"
                        onClick={(e) => e.preventDefault()}
                      >
                        <label className="checkbox p-2">
                          <input
                            name="all"
                            type="checkbox"
                            onChange={handleSelection}
                            checked={allChecked}
                          />
                        </label>
                      </td>
                      <td className="order is-vcentered">Order #</td>
                      <td className="items is-vcentered">Items</td>
                      <td className="package is-vcentered">Package</td>
                      <td className="total is-vcentered">Total weight</td>
                      <td className="service is-vcentered">Shipping service</td>
                    </tr>

                    {(batch.shipments || []).map((shipment, shipment_index) => (
                      <tr
                        className="items is-size-7"
                        key={keys[shipment_index]}
                      >
                        <td className="selector has-text-centered is-vcentered p-0">
                          <label className="checkbox py-3 px-2">
                            <input
                              type="checkbox"
                              name={shipment.id}
                              onChange={handleSelection}
                              checked={selection.includes(shipment.id || "")}
                            />
                          </label>
                        </td>
                        <td className="order is-vcentered panel is-size-7">
                          <label
                            className="panel-block p-2 card"
                            onClick={toggle(`${shipment.id || shipment_index}`)}
                          >
                            <div>
                              <span className="has-text-weight-bold text-ellipsis">
                                {`#${shipment.meta?.order_id || shipment.metadata?.order_ids || " - "}`}
                              </span>
                              <br />
                              <span className="has-text-weight-medium text-ellipsis">
                                {formatAddressLocationShort(
                                  shipment.recipient as AddressType,
                                )}
                              </span>
                            </div>
                          </label>
                        </td>
                        <td className="items is-vcentered panel is-size-7">
                          <label
                            className="panel-block p-2 card"
                            onClick={toggle(`${shipment.id || shipment_index}`)}
                          >
                            <div>
                              <p className="is-size-7 has-text-weight-bold has-text-grey">
                                {((items: number): any =>
                                  `${items} item${items === 1 ? "" : "s"}`)(
                                  (shipment.parcels[0]?.items || []).reduce(
                                    (acc, item) =>
                                      acc + (item.quantity as number) || 1,
                                    0,
                                  ),
                                )}
                              </p>
                              <p
                                className="is-size-7 has-text-grey"
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {(shipment.parcels[0]?.items || []).length > 1
                                  ? "(Multiple)"
                                  : (shipment.parcels[0]?.items || [])[0]
                                      ?.title ||
                                    (shipment.parcels[0]?.items || [])[0]
                                      ?.description ||
                                    (shipment.parcels[0]?.items || [])[0]
                                      ?.sku ||
                                    " - "}
                              </p>
                            </div>
                          </label>
                        </td>
                        <td className="package is-vcentered text-ellipsis">
                          <label
                            className="panel-block p-2 card"
                            onClick={toggle(`${shipment.id || shipment_index}`)}
                          >
                            <div>
                              <ParcelDescription parcel={shipment.parcels[0]} />
                            </div>
                          </label>
                        </td>
                        <td className="total is-vcentered">
                          <label
                            className="panel-block px-2 p-4 card"
                            onClick={toggle(`${shipment.id || shipment_index}`)}
                          >
                            <div>
                              <span className="has-text-weight-bold">
                                {shipment.parcels[0]?.weight || 0}{" "}
                                {shipment.parcels[0]?.weight_unit || "KG"}
                              </span>
                            </div>
                          </label>
                        </td>
                        <td className="service is-vcentered">
                          <Dropdown
                            direction="is-left"
                            style={{ display: "block" }}
                            menuWrapperStyle={{ right: 0, top: "100%" }}
                          >
                            {/* Dropdown trigger  */}
                            <label className="panel-block p-0 card">
                              <div className="icon-text is-flex-grow-1">
                                <CarrierImage
                                  height={30}
                                  width={30}
                                  carrier_name={
                                    selectedRate(shipment)?.carrier_name
                                  }
                                  containerClassName="mt-2 ml-1 mr-2 pl-1"
                                  text_color={
                                    getCarrier(selectedRate(shipment))?.config
                                      ?.text_color
                                  }
                                  background={
                                    getCarrier(selectedRate(shipment))?.config
                                      ?.brand_color
                                  }
                                />
                                <div
                                  className="text-ellipsis"
                                  style={{
                                    maxWidth: "190px",
                                    lineHeight: "16px",
                                  }}
                                >
                                  {!!selectedRate(shipment) && (
                                    <RateDescription
                                      rate={selectedRate(shipment)}
                                    />
                                  )}
                                </div>
                              </div>
                              <Image
                                src={p`/unfold.svg`}
                                width={30}
                                height={30}
                                alt={"select services"}
                              />
                            </label>

                            {/* Dropdown content  */}
                            <div
                              className="dropdown-content"
                              onClick={(e) => closeDropdown(e.target)}
                              id="dropdown-menu"
                              role="menu"
                              style={{ maxHeight: "20rem", overflowY: "auto" }}
                            >
                              {(shipment.rates || []).map((rate) => (
                                <a
                                  key={rate.id}
                                  className={`dropdown-item m-0 p-0 is-vcentered ${rate.service === shipment.options.preferred_service ? "has-text-grey-dark has-background-success-light" : "has-text-grey"} ${rate.id === selectedRate(shipment)?.id ? "has-text-grey-dark has-background-grey-lighter" : "has-text-grey"}`}
                                  onClick={() =>
                                    onChange(shipment_index, shipment, {
                                      options: {
                                        ...shipment.options,
                                        preferred_service: rate.service,
                                      },
                                    })
                                  }
                                >
                                  <div className="icon-text">
                                    <CarrierImage
                                      width={30}
                                      height={30}
                                      carrier_name={
                                        (rate.meta as any)?.carrier ||
                                        rate.carrier_name
                                      }
                                      containerClassName="mt-2 ml-1 mr-2 pl-1"
                                      text_color={
                                        getCarrier(rate)?.config?.text_color
                                      }
                                      background={
                                        getCarrier(rate)?.config?.brand_color
                                      }
                                    />
                                    <div
                                      className="text-ellipsis"
                                      style={{
                                        maxWidth: "190px",
                                        lineHeight: "16px",
                                      }}
                                    >
                                      <RateDescription rate={rate} />
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>

            {/* Label editor */}
            <>
              <Dialog
                as="div"
                open={isOpen}
                onClose={onClose}
                className={`modal side-modal ${isOpen ? "is-active" : ""}`}
              >
                <Dialog.Panel className="modal-card side-modal-body">
                  <section className="modal-card-body has-background-white p-2">
                    {retrieveShipment(
                      batch.shipments || [],
                      selectedRow,
                    )(
                      ({
                        shipment,
                        shipment_index,
                      }: {
                        shipment: ShipmentType;
                        shipment_index: number;
                      }) => {
                        const shipmentOrderIds = (
                          shipment.meta?.order_id ||
                          shipment.metadata?.order_ids ||
                          ""
                        )
                          .split(",")
                          .filter((_?: string) => !isNoneOrEmpty(_));
                        const orders = (shipmentOrderList?.edges || [])
                          .filter(({ node }) =>
                            shipmentOrderIds.includes(node.order_id),
                          )
                          .map(({ node }) => node) as OrderType[];

                        return (
                          <React.Fragment key={keys[shipment_index]}>
                            <ContextProviders>
                              <CommodityEditModalProvider
                                orderFilter={{ id: shipmentOrderIds }}
                              >
                                <header className="form-floating-header p-3 is-flex is-justify-content-space-between is-size-7">
                                  <div>
                                    <span className="has-text-weight-bold text-ellipsis">
                                      {`#${shipment.meta?.order_id || shipment.metadata?.order_ids || " - "}`}
                                    </span>
                                    <br />
                                    <span className="has-text-weight-medium text-ellipsis">
                                      {formatAddressLocationShort(
                                        shipment.recipient as AddressType,
                                      )}
                                    </span>
                                  </div>
                                  <div>
                                    <button
                                      className="button is-white m-0"
                                      style={{ borderRadius: "50%" }}
                                      onClick={onClose}
                                    >
                                      <span className="icon is-size-6">
                                        <i className="fas fa-lg fa-times"></i>
                                      </span>
                                    </button>
                                  </div>
                                </header>
                                <div className="p-5 my-2"></div>

                                <div className="pb-6">
                                  {/* Address section */}
                                  <div className="card p-0 mt-3">
                                    <div className="p-3">
                                      <header className="is-flex is-justify-content-space-between">
                                        <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                                          Customer
                                        </span>
                                        <div className="is-vcentered">
                                          <AddressModalEditor
                                            shipment={shipment}
                                            address={shipment.recipient}
                                            onSubmit={(address) =>
                                              onChange(
                                                shipment_index,
                                                shipment,
                                                {
                                                  recipient: address,
                                                },
                                              )
                                            }
                                            trigger={
                                              <button className="button is-small is-info is-text is-inverted p-1">
                                                Edit address
                                              </button>
                                            }
                                          />
                                        </div>
                                      </header>

                                      <AddressDescription
                                        address={shipment.recipient}
                                      />

                                      {Object.values(shipment.recipient || {})
                                        .length === 0 && (
                                        <>
                                          <div className="notification is-warning is-light my-2 py-2 px-4 my-2">
                                            Please add a customer address.
                                          </div>
                                        </>
                                      )}
                                    </div>

                                    <hr
                                      className="my-1"
                                      style={{ height: "1px" }}
                                    />

                                    <div className="p-3">
                                      <header className="is-flex is-justify-content-space-between">
                                        <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                                          Ship from
                                        </span>
                                        <div className="is-vcentered">
                                          <AddressModalEditor
                                            shipment={shipment}
                                            address={shipment.shipper}
                                            onSubmit={(address) =>
                                              onChange(
                                                shipment_index,
                                                shipment,
                                                {
                                                  shipper: address,
                                                },
                                              )
                                            }
                                            trigger={
                                              <button className="button is-small is-info is-text is-inverted p-1">
                                                Edit address
                                              </button>
                                            }
                                          />
                                        </div>
                                      </header>

                                      <AddressDescription
                                        address={shipment.shipper}
                                      />

                                      {Object.values(shipment.shipper || {})
                                        .length === 0 && (
                                        <>
                                          <div className="notification is-warning is-light my-2 py-2 px-4 my-2">
                                            Please specify an address.
                                          </div>
                                        </>
                                      )}
                                    </div>

                                    {/* Retrun address section */}
                                    <hr
                                      className="my-1"
                                      style={{ height: "1px" }}
                                    />

                                    <div className="p-3">
                                      <header className="is-flex is-justify-content-space-between">
                                        <div>
                                          <CheckBoxField
                                            name="addInsurance"
                                            fieldClass="column mb-0 is-12 px-0 py-2"
                                            defaultChecked={
                                              addReturn ||
                                              !isNone(shipment.return_address)
                                            }
                                            onChange={(e) => {
                                              setAddReturn(e.target.checked);
                                              if (
                                                !e.target.checked &&
                                                !isNone(shipment.return_address)
                                              ) {
                                                onChange(
                                                  shipment_index,
                                                  shipment,
                                                  {
                                                    return_address: null,
                                                  },
                                                );
                                              }
                                            }}
                                          >
                                            <span>
                                              Add a return address (optional)
                                            </span>
                                          </CheckBoxField>
                                        </div>
                                        <div className="is-vcentered">
                                          {(addReturn ||
                                            !isNone(
                                              shipment.return_address,
                                            )) && (
                                            <AddressModalEditor
                                              shipment={shipment}
                                              address={
                                                shipment.return_address ||
                                                ({
                                                  country_code:
                                                    shipment.shipper
                                                      ?.country_code,
                                                } as AddressType)
                                              }
                                              onSubmit={(address) =>
                                                onChange(
                                                  shipment_index,
                                                  shipment,
                                                  {
                                                    return_address: address,
                                                  },
                                                )
                                              }
                                              trigger={
                                                <button className="button is-small is-info is-text is-inverted p-1">
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
                                            address={
                                              shipment!.return_address as any
                                            }
                                          />
                                        )}
                                      </div>

                                      {Object.values(
                                        shipment?.return_address || [],
                                      ).length === 0 && (
                                        <div className="notification is-default p-2 is-size-7">
                                          <span>
                                            Use this to specify an origin
                                            address different from the shipper
                                            address above. <br />
                                            This address will be used for pickup
                                            and return.
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Billing address section */}
                                    <hr
                                      className="my-1"
                                      style={{ height: "1px" }}
                                    />

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
                                              shipment.payment?.paid_by ===
                                              PaidByEnum.sender
                                            }
                                            onChange={() =>
                                              onChange(
                                                shipment_index,
                                                shipment,
                                                {
                                                  payment: {
                                                    paid_by: PaidByEnum.sender,
                                                  },
                                                  billing_address: null,
                                                } as any,
                                              )
                                            }
                                          />
                                          <span className="is-size-7 has-text-weight-bold">
                                            {formatRef(
                                              PaidByEnum.sender.toString(),
                                            )}
                                          </span>
                                        </label>
                                        <label className="radio">
                                          <input
                                            className="mr-1"
                                            type="radio"
                                            name="paid_by"
                                            defaultChecked={
                                              shipment.payment?.paid_by ===
                                              PaidByEnum.recipient
                                            }
                                            onChange={() =>
                                              onChange(
                                                shipment_index,
                                                shipment,
                                                {
                                                  payment: {
                                                    ...shipment.payment,
                                                    paid_by:
                                                      PaidByEnum.recipient,
                                                  },
                                                  billing_address: null,
                                                },
                                              )
                                            }
                                          />
                                          <span className="is-size-7 has-text-weight-bold">
                                            {formatRef(
                                              PaidByEnum.recipient.toString(),
                                            )}
                                          </span>
                                        </label>
                                        <label className="radio">
                                          <input
                                            className="mr-1"
                                            type="radio"
                                            name="paid_by"
                                            defaultChecked={
                                              shipment.payment?.paid_by ===
                                              PaidByEnum.third_party
                                            }
                                            onChange={() =>
                                              onChange(
                                                shipment_index,
                                                shipment,
                                                {
                                                  payment: {
                                                    ...shipment.payment,
                                                    paid_by:
                                                      PaidByEnum.third_party,
                                                  },
                                                },
                                              )
                                            }
                                          />
                                          <span className="is-size-7 has-text-weight-bold">
                                            {formatRef(
                                              PaidByEnum.third_party.toString(),
                                            )}
                                          </span>
                                        </label>
                                      </div>

                                      {shipment.payment?.paid_by &&
                                        shipment.payment?.paid_by !==
                                          PaidByEnum.sender && (
                                          <div
                                            className="columns m-1 px-2 py-0"
                                            style={{
                                              borderLeft: "solid 2px #ddd",
                                            }}
                                          >
                                            <InputField
                                              label="account number"
                                              className="is-small"
                                              defaultValue={
                                                shipment?.payment
                                                  ?.account_number as string
                                              }
                                              onChange={(e) =>
                                                onChange(
                                                  shipment_index,
                                                  shipment,
                                                  {
                                                    payment: {
                                                      ...shipment.payment,
                                                      account_number:
                                                        e.target.value,
                                                    },
                                                  },
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                    </div>

                                    {(shipment?.billing_address ||
                                      shipment.payment?.paid_by ===
                                        PaidByEnum.third_party) && (
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
                                                  ({} as AddressType)
                                                }
                                                onSubmit={(address) =>
                                                  onChange(
                                                    shipment_index,
                                                    shipment,
                                                    {
                                                      billing_address: address,
                                                    },
                                                  )
                                                }
                                                trigger={
                                                  <button className="button is-small is-info is-text is-inverted p-1">
                                                    Edit address
                                                  </button>
                                                }
                                              />
                                            </div>
                                          </header>

                                          {shipment?.billing_address && (
                                            <AddressDescription
                                              address={
                                                shipment!.billing_address as any
                                              }
                                            />
                                          )}

                                          {isNone(
                                            shipment?.billing_address,
                                          ) && (
                                            <div className="notification is-default p-2 is-size-7 my-2">
                                              Add shipment billing address.
                                              (optional)
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
                                          onSubmit={mutation.addParcel(
                                            shipment_index,
                                          )}
                                          trigger={
                                            <button className="button is-small is-info is-text is-inverted p-1">
                                              Add package
                                            </button>
                                          }
                                        />
                                      </div>
                                    </header>

                                    <hr
                                      className="my-1"
                                      style={{ height: "1px" }}
                                    />

                                    {shipment.parcels.map((pkg, pkg_index) => (
                                      <React.Fragment
                                        key={
                                          pkg.id || `${pkg_index}-${new Date()}`
                                        }
                                      >
                                        {pkg_index > 0 && (
                                          <hr
                                            className="my-1"
                                            style={{ height: "3px" }}
                                          />
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
                                                  shipment_index,
                                                )(pkg_index, pkg.id)}
                                                parcel={pkg}
                                                shipment={shipment}
                                                trigger={
                                                  <button
                                                    type="button"
                                                    className="button is-small is-white"
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
                                                  shipment.parcels.length === 1
                                                }
                                                onClick={mutation.removeParcel(
                                                  shipment_index,
                                                )(pkg_index, pkg.id)}
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

                                          {(pkg.items || []).map(
                                            (item, item_index) => (
                                              <React.Fragment
                                                key={
                                                  item.id ||
                                                  `${item_index}-${new Date()}`
                                                }
                                              >
                                                <hr
                                                  className="my-1"
                                                  style={{ height: "1px" }}
                                                />
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
                                                      {getOrder(
                                                        orders,
                                                        item.parent_id,
                                                      ) && (
                                                        <span className="has-text-info">
                                                          {` | ORDER: ${getOrder(orders, item.parent_id)?.order_id}`}
                                                        </span>
                                                      )}
                                                    </p>
                                                    <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey"></p>
                                                  </div>
                                                  <div className="is-flex">
                                                    <div className="is-size-7 has-text-grey has-text-weight-semibold is-flex px-2">
                                                      <span
                                                        className="p-2 has-text-right"
                                                        style={{
                                                          minWidth: "90px",
                                                        }}
                                                      >
                                                        {formatWeight(item)}
                                                      </span>
                                                      <div className="field has-addons">
                                                        <p className="control is-expanded">
                                                          <input
                                                            min={1}
                                                            type="number"
                                                            value={
                                                              item.quantity as number
                                                            }
                                                            onChange={(e) => {
                                                              mutation.updateItem(
                                                                shipment_index,
                                                              )(
                                                                pkg_index,
                                                                item_index,
                                                                pkg.id,
                                                              )({
                                                                quantity:
                                                                  parseInt(
                                                                    e.target
                                                                      .value,
                                                                  ),
                                                              } as CommodityType);
                                                            }}
                                                            className="input is-small"
                                                            style={{
                                                              width: "60px",
                                                              textAlign:
                                                                "center",
                                                            }}
                                                            {...(getParent(
                                                              orders,
                                                              item.parent_id,
                                                            )
                                                              ? {
                                                                  max: getAvailableQuantity(
                                                                    shipment,
                                                                    orders,
                                                                    item,
                                                                    item_index,
                                                                  ),
                                                                }
                                                              : {})}
                                                          />
                                                        </p>
                                                        {getParent(
                                                          orders,
                                                          item.parent_id,
                                                        ) && (
                                                          <p className="control">
                                                            <a className="button is-static is-small">
                                                              of{" "}
                                                              {getParent(
                                                                orders,
                                                                item.parent_id,
                                                              )
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
                                                            !isNone(
                                                              item.parent_id,
                                                            )
                                                          }
                                                          onClick={() =>
                                                            editCommodity({
                                                              commodity: item,
                                                              onSubmit: (_) =>
                                                                mutation.updateItem(
                                                                  shipment_index,
                                                                )(
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
                                                        shipment_index,
                                                      )(
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
                                            ),
                                          )}

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
                                                  onClick={() =>
                                                    editCommodity({
                                                      onSubmit: (_) =>
                                                        mutation.addItems(
                                                          shipment_index,
                                                        )(
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
                                          </div>
                                        </div>
                                      </React.Fragment>
                                    ))}

                                    {(shipment.parcels || []).length === 0 && (
                                      <div className="m-4 notification is-default">
                                        Add one or more packages to create a
                                        shipment.
                                      </div>
                                    )}
                                  </div>

                                  {/* Shipping options section */}
                                  <div className="card px-0 py-3 mt-5">
                                    <header className="px-3 is-flex is-justify-content-space-between">
                                      <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                                        Shipping options
                                      </span>
                                    </header>

                                    <hr
                                      className="my-1"
                                      style={{ height: "1px" }}
                                    />

                                    <div className="p-3 pb-0">
                                      {/* shipping date */}
                                      <InputField
                                        name="shipping_date"
                                        label="shipping date"
                                        type="datetime-local"
                                        className="is-small"
                                        fieldClass="column mb-0 is-8 p-0 mb-2"
                                        defaultValue={
                                          shipment.options?.shipping_date
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
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
                                        wrapperClass="py-2"
                                        className="is-small is-fullwidth"
                                        fieldClass="column is-8 mb-0 px-0"
                                        value={shipment.options?.currency}
                                        required={
                                          !isNone(
                                            shipment.options?.insurance,
                                          ) ||
                                          !isNone(
                                            shipment.options?.cash_on_delivery,
                                          ) ||
                                          !isNone(
                                            shipment.options?.declared_value,
                                          )
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
                                            options: {
                                              ...shipment.options,
                                              currency: e.target.value,
                                            },
                                          })
                                        }
                                      >
                                        <option value="">
                                          Select a currency
                                        </option>
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
                                        defaultChecked={
                                          shipment.options
                                            ?.signature_confirmation
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
                                            options: {
                                              ...shipment.options,
                                              signature_confirmation:
                                                e.target.checked || null,
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
                                        defaultChecked={
                                          !isNoneOrEmpty(
                                            shipment.options?.insurance,
                                          )
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
                                            options: {
                                              ...shipment.options,
                                              insurance:
                                                e.target.checked === true
                                                  ? ""
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
                                          className="column is-4 is-small"
                                          wrapperClass="px-1 py-2"
                                          fieldClass="mb-0 p-0"
                                          controlClass="has-icons-left has-icons-right"
                                          defaultValue={
                                            shipment.options?.insurance
                                          }
                                          required={
                                            !isNone(shipment.options?.insurance)
                                          }
                                          onChange={(e) =>
                                            onChange(shipment_index, shipment, {
                                              options: {
                                                ...shipment.options,
                                                insurance: parseFloat(
                                                  e.target.value,
                                                ),
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
                                          !isNoneOrEmpty(
                                            shipment.options?.cash_on_delivery,
                                          )
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
                                            options: {
                                              ...shipment.options,
                                              cash_on_delivery:
                                                e.target.checked === true
                                                  ? ""
                                                  : null,
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
                                          defaultValue={
                                            shipment.options?.cash_on_delivery
                                          }
                                          required={
                                            !isNone(
                                              shipment.options
                                                ?.cash_on_delivery,
                                            )
                                          }
                                          onChange={(e) =>
                                            onChange(shipment_index, shipment, {
                                              options: {
                                                ...shipment.options,
                                                cash_on_delivery: parseFloat(
                                                  e.target.value,
                                                ),
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
                                        fieldClass="column mb-0 is-12 px-1 py-2"
                                        defaultChecked={
                                          !isNoneOrEmpty(
                                            shipment.options?.declared_value,
                                          )
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
                                            options: {
                                              ...shipment.options,
                                              declared_value:
                                                e.target.checked === true
                                                  ? ""
                                                  : null,
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
                                          controlClass="has-icons-right"
                                          value={
                                            shipment.options?.declared_value
                                          }
                                          required={
                                            !isNone(
                                              shipment.options?.declared_value,
                                            )
                                          }
                                          onChange={(e) =>
                                            onChange(shipment_index, shipment, {
                                              options: {
                                                ...shipment.options,
                                                declared_value: parseFloat(
                                                  e.target.value,
                                                ),
                                              },
                                            })
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
                                        fieldClass="column mb-0 is-12 px-1 py-2"
                                        defaultChecked={
                                          shipment.options?.paperless_trade
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
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
                                        defaultChecked={
                                          shipment.options?.hold_at_location
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
                                            options: {
                                              ...shipment.options,
                                              hold_at_location:
                                                e.target.checked,
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
                                        defaultChecked={
                                          shipment.options?.dangerous_good
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
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
                                                {Object.entries(
                                                  carrierOptions,
                                                ).map(([carrier, options]) => (
                                                  <React.Fragment key={carrier}>
                                                    <label
                                                      className="label is-capitalized"
                                                      style={{
                                                        fontSize: "0.8em",
                                                      }}
                                                    >
                                                      {
                                                        references!.carriers[
                                                          carrier
                                                        ]
                                                      }
                                                    </label>
                                                    <hr
                                                      className="my-1"
                                                      style={{ height: "1px" }}
                                                    />

                                                    <div className="is-flex is-flex-wrap-wrap m-0 p-0">
                                                      {options.map(
                                                        (option, index) => (
                                                          <React.Fragment
                                                            key={option}
                                                          >
                                                            {references!
                                                              .options[carrier][
                                                              option
                                                            ]?.type ===
                                                              "boolean" && (
                                                              <div
                                                                style={{
                                                                  minWidth:
                                                                    "225px",
                                                                }}
                                                              >
                                                                <CheckBoxField
                                                                  name={option}
                                                                  fieldClass="mb-0 p-1"
                                                                  defaultChecked={
                                                                    shipment
                                                                      .options?.[
                                                                      option
                                                                    ]
                                                                  }
                                                                  onChange={(
                                                                    e,
                                                                  ) =>
                                                                    onChange(
                                                                      shipment_index,
                                                                      shipment,
                                                                      {
                                                                        options:
                                                                          {
                                                                            ...shipment.options,
                                                                            [option]:
                                                                              e
                                                                                .target
                                                                                .checked ||
                                                                              null,
                                                                          },
                                                                      },
                                                                    )
                                                                  }
                                                                >
                                                                  <span>
                                                                    {formatRef(
                                                                      option,
                                                                    )}
                                                                  </span>
                                                                </CheckBoxField>
                                                              </div>
                                                            )}

                                                            {references!
                                                              .options[carrier][
                                                              option
                                                            ]?.type ===
                                                              "string" && (
                                                              <>
                                                                <InputField
                                                                  name={option}
                                                                  style={{
                                                                    minWidth:
                                                                      "225px",
                                                                  }}
                                                                  label={formatRef(
                                                                    option,
                                                                  )}
                                                                  placeholder={formatRef(
                                                                    option,
                                                                  )}
                                                                  className="is-small"
                                                                  wrapperClass="pl-0 pr-2 py-1"
                                                                  fieldClass="column mb-0 is-6 p-0"
                                                                  defaultValue={
                                                                    shipment
                                                                      .options[
                                                                      option
                                                                    ]
                                                                  }
                                                                  onChange={(
                                                                    e,
                                                                  ) =>
                                                                    onChange(
                                                                      shipment_index,
                                                                      shipment,
                                                                      {
                                                                        options:
                                                                          {
                                                                            ...shipment.options,
                                                                            [option]:
                                                                              e
                                                                                .target
                                                                                .value,
                                                                          },
                                                                      },
                                                                    )
                                                                  }
                                                                />
                                                              </>
                                                            )}
                                                          </React.Fragment>
                                                        ),
                                                      )}
                                                    </div>

                                                    <div className="p-2"></div>
                                                  </React.Fragment>
                                                ))}
                                              </Disclosure.Panel>
                                            </div>
                                          )}
                                        </Disclosure>
                                      </div>
                                    )}

                                    <hr
                                      className="my-1"
                                      style={{ height: "1px" }}
                                    />

                                    <div className="p-3">
                                      <InputField
                                        label="Reference"
                                        name="reference"
                                        defaultValue={
                                          shipment.reference as string
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
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
                                                  shipment.payment?.paid_by ==
                                                  PaidByEnum.sender
                                                    ? "DDP"
                                                    : "DDU",
                                                duty: {
                                                  ...DEFAULT_CUSTOMS_CONTENT.duty,
                                                  currency:
                                                    shipment.options?.currency,
                                                  paid_by:
                                                    shipment.payment?.paid_by,
                                                  account_number:
                                                    shipment.payment
                                                      ?.account_number,
                                                  declared_value:
                                                    shipment.options
                                                      ?.declared_value,
                                                },
                                                duty_billing_address:
                                                  shipment.billing_address,
                                                commodities:
                                                  getShipmentCommodities(
                                                    shipment,
                                                  ),
                                                options:
                                                  workspace_config.customsOptions,
                                              }
                                            }
                                            onSubmit={mutation.updateCustoms(
                                              shipment_index,
                                            )(shipment?.customs?.id)}
                                            trigger={
                                              <button className="button is-small is-info is-text is-inverted p-1">
                                                Edit customs info
                                              </button>
                                            }
                                          />
                                        </div>
                                      </header>

                                      <hr
                                        className="my-1"
                                        style={{ height: "1px" }}
                                      />

                                      <div className="p-3">
                                        {!isNone(shipment.customs) && (
                                          <>
                                            <CustomsInfoDescription
                                              customs={
                                                shipment.customs as CustomsType
                                              }
                                            />

                                            {/* Commodities section */}
                                            <span className="is-size-7 mt-4 has-text-weight-semibold">
                                              COMMODITIES
                                            </span>

                                            {(
                                              shipment.customs!.commodities ||
                                              []
                                            ).map((commodity, index) => (
                                              <React.Fragment
                                                key={index + "customs-info"}
                                              >
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
                                                          disabled={isPackedItem(
                                                            commodity,
                                                            shipment,
                                                          )}
                                                          onClick={() =>
                                                            editCommodity({
                                                              commodity,
                                                              onSubmit: (_) =>
                                                                mutation.updateCommodity(
                                                                  shipment_index,
                                                                )(
                                                                  index,
                                                                  shipment
                                                                    .customs
                                                                    ?.id,
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
                                                        shipment.customs!
                                                          .commodities
                                                          .length === 1
                                                      }
                                                      onClick={() =>
                                                        mutation.removeCommodity(
                                                          shipment_index,
                                                        )(
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
                                            ))}

                                            {(
                                              shipment.customs!.commodities ||
                                              []
                                            ).length === 0 && (
                                              <div className="notification is-warning is-light my-2 py-2 px-4 is-size-7">
                                                You need provide commodity items
                                                for customs purpose. (required)
                                              </div>
                                            )}

                                            <div className="is-flex is-justify-content-space-between mt-4">
                                              {/* @ts-ignore */}
                                              <CommodityStateContext.Consumer>
                                                {({ editCommodity }) => (
                                                  <button
                                                    type="button"
                                                    className="button is-small is-info is-inverted p-2"
                                                    onClick={() =>
                                                      editCommodity({
                                                        onSubmit: (_) =>
                                                          mutation.addCommodities(
                                                            shipment_index,
                                                          )([_] as any),
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
                                              {metadata.ORDERS_MANAGEMENT && (
                                                <LineItemSelector
                                                  title="Add commodities"
                                                  shipment={shipment}
                                                  onChange={(_) =>
                                                    mutation.addCommodities(
                                                      _ as any,
                                                    )
                                                  }
                                                />
                                              )}
                                            </div>

                                            {/* Duty Billing address section */}
                                            {(shipment.customs!
                                              .duty_billing_address ||
                                              shipment.customs!.duty
                                                ?.paid_by ===
                                                PaidByEnum.third_party) && (
                                              <>
                                                <hr
                                                  className="my-1"
                                                  style={{ height: "1px" }}
                                                />

                                                <div className="py-3">
                                                  <header className="is-flex is-justify-content-space-between">
                                                    <label
                                                      className="label is-capitalized"
                                                      style={{
                                                        fontSize: "0.8em",
                                                      }}
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
                                                          mutation.updateShipment(
                                                            shipment_index,
                                                          )({
                                                            customs: {
                                                              ...shipment!
                                                                .customs,
                                                              duty_billing_address:
                                                                address,
                                                            } as any,
                                                          })
                                                        }
                                                        trigger={
                                                          <button className="button is-small is-info is-text is-inverted p-1">
                                                            Edit duty billing
                                                            address
                                                          </button>
                                                        }
                                                      />
                                                    </div>
                                                  </header>

                                                  {shipment!.customs!
                                                    .duty_billing_address && (
                                                    <AddressDescription
                                                      address={
                                                        shipment!.customs!
                                                          .duty_billing_address as any
                                                      }
                                                    />
                                                  )}

                                                  {isNone(
                                                    shipment!.customs!
                                                      .duty_billing_address,
                                                  ) && (
                                                    <div className="notification is-default p-2 is-size-7">
                                                      Add customs duty billing
                                                      address. (optional)
                                                    </div>
                                                  )}
                                                </div>
                                              </>
                                            )}
                                          </>
                                        )}

                                        {isNone(shipment.customs) && (
                                          <div className="notification is-warning is-light my-2 py-2 px-4 is-size-7">
                                            Looks like you have an international
                                            shipment. You may need to provide a
                                            customs declaration unless you are
                                            shipping documents only.
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Shipment Summary */}
                                  <CommoditySummary
                                    shipment={shipment}
                                    orders={orders}
                                    className="card px-0 mt-3"
                                  />

                                  {/* Metadata section */}
                                  <div className="card px-0 mt-3">
                                    <div className="p-1 pb-4">
                                      <MetadataEditor
                                        object_type={
                                          MetadataObjectTypeEnum.shipment
                                        }
                                        metadata={shipment.metadata}
                                        onChange={(metadata) =>
                                          onChange(shipment_index, shipment, {
                                            metadata,
                                          })
                                        }
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
                                                    onClick={() =>
                                                      editMetadata()
                                                    }
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
                                        defaultValue={
                                          shipment.options?.instructions
                                        }
                                        required={
                                          !isNone(
                                            shipment.options?.instructions,
                                          )
                                        }
                                        onChange={(e) =>
                                          onChange(shipment_index, shipment, {
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

                                <div className="p-6"></div>

                                {/* Service section */}
                                <div
                                  className="form-floating-footer px-2 pt-2 pb-4"
                                  style={{ borderTop: "1px solid #ddd" }}
                                >
                                  <header className="py-2 is-flex is-justify-content-space-between">
                                    <div>
                                      <span className="is-title is-size-7 has-text-weight-bold is-vcentered my-2">
                                        Service
                                      </span>
                                    </div>
                                    <div className="is-vcentered">
                                      <button
                                        className="button is-small is-info is-text is-inverted p-1"
                                        onClick={() =>
                                          mutation.fetchRates.mutateAsync(
                                            shipment_index,
                                          )
                                        }
                                        disabled={
                                          requireInfoForRating(shipment) ||
                                          mutation.fetchRates.isLoading
                                        }
                                      >
                                        Refresh rates
                                      </button>
                                    </div>
                                  </header>

                                  {/* Shipping service */}
                                  <Dropdown
                                    direction="is-up"
                                    style={{ display: "block" }}
                                    menuWrapperStyle={{
                                      right: 0,
                                      bottom: "100%",
                                    }}
                                  >
                                    {/* Dropdown trigger  */}
                                    <label className="panel-block p-0 card flex">
                                      <div className="icon-text is-flex-grow-1">
                                        <CarrierImage
                                          carrier_name={
                                            selectedRate(shipment)?.carrier_name
                                          }
                                          containerClassName="mt-2 ml-1 mr-2 pl-1"
                                          height={34}
                                          width={34}
                                          text_color={
                                            getCarrier(selectedRate(shipment))
                                              ?.config?.text_color
                                          }
                                          background={
                                            getCarrier(selectedRate(shipment))
                                              ?.config?.brand_color
                                          }
                                        />
                                        <div
                                          className="text-ellipsis"
                                          style={{
                                            maxWidth: "190px",
                                            lineHeight: "16px",
                                          }}
                                        >
                                          {!!selectedRate(shipment) && (
                                            <RateDescription
                                              rate={selectedRate(shipment)}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <Image
                                        src={p`/unfold.svg`}
                                        width={30}
                                        height={30}
                                        alt={"select services"}
                                      />
                                    </label>

                                    {/* Dropdown content  */}
                                    <div
                                      className="dropdown-content has-background-color-white"
                                      onClick={(e) => closeDropdown(e.target)}
                                      id="dropdown-menu"
                                      role="menu"
                                      style={{
                                        maxHeight: "20rem",
                                        overflowY: "auto",
                                      }}
                                    >
                                      {(shipment.rates || []).map((rate) => (
                                        <a
                                          key={rate.id}
                                          className={`dropdown-item m-0 p-0 is-vcentered ${rate.service === shipment.options.preferred_service ? "has-text-grey-dark has-background-success-light" : "has-text-grey"} ${rate.id === selectedRate(shipment)?.id ? "has-text-grey-dark has-background-grey-lighter" : "has-text-grey"}`}
                                          onClick={() =>
                                            onChange(shipment_index, shipment, {
                                              options: {
                                                ...shipment.options,
                                                preferred_service: rate.service,
                                              },
                                            })
                                          }
                                        >
                                          <div className="icon-text">
                                            <CarrierImage
                                              width={30}
                                              height={30}
                                              carrier_name={
                                                (rate.meta as any)?.carrier ||
                                                rate.carrier_name
                                              }
                                              text_color={
                                                getCarrier(rate)?.config
                                                  ?.text_color
                                              }
                                              background={
                                                getCarrier(rate)?.config
                                                  ?.brand_color
                                              }
                                              containerClassName="mt-2 ml-1 mr-2 pl-1"
                                            />
                                            <RateDescription rate={rate} />
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                  </Dropdown>
                                </div>
                              </CommodityEditModalProvider>
                            </ContextProviders>
                          </React.Fragment>
                        );
                      },
                    )}
                  </section>
                </Dialog.Panel>
              </Dialog>
            </>
          </>
        )}
      </div>
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
