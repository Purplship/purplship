import {
  AddressType,
  Collection,
  CommodityType,
  CustomsType,
  DEFAULT_CUSTOMS_CONTENT,
  DEFAULT_PARCEL_CONTENT,
  ErrorType,
  LabelTypeEnum,
  OrderType,
  PaidByEnum,
  ParcelType,
  PresetCollection,
  RequestError,
  ShipmentType,
} from "@karrio/types";
import { signOut } from "next-auth/react";
import { BASE_PATH } from "./constants";
import gql from "graphql-tag";
import moment from "moment";
import React from "react";

export const isEqual = require("lodash.isequal");
export const snakeCase = require("lodash.snakecase");
export const groupBy = require("lodash.groupby");
export const toNumber = require("lodash.tonumber");

export const preventPropagation = (e: React.MouseEvent) => e.stopPropagation();

export function p(strings: TemplateStringsArray, ...keys: any[]) {
  return url$`${BASE_PATH}/${url$(strings, ...keys)}`.replace("//", "/");
}

export function formatRef(s?: string): string {
  return (s || "").split("_").join(" ").toLocaleUpperCase();
}

export function formatDate(date_string: string): string {
  return moment(date_string).format("ll");
}

export function formatDateTime(date_string: string): string {
  return moment(date_string).format("MMM D, hh:mm A");
}

export function formatDateTimeLong(date_string: string): string {
  return moment(date_string).format("llll");
}

export function formatDayDate(date_string: string): string {
  return new Date(date_string).toUTCString().split(" ").slice(0, 4).join(" ");
}

export function notEmptyJSON(value?: string | null): boolean {
  return !isNone(value) && value !== JSON.stringify({});
}

export function formatAddress(address: AddressType): string {
  return [
    address.person_name || address.company_name,
    address.city,
    address.country_code,
  ]
    .filter((a) => !isNone(a) && a !== "")
    .join(", ");
}

export function formatAddressShort(address: AddressType): string {
  return [address.person_name || address.company_name, address.city]
    .filter((a) => !isNone(a) && a !== "")
    .join(", ");
}

export function formatFullAddress(
  address: AddressType,
  countries?: { [country_code: string]: string },
): string {
  const country =
    countries === undefined
      ? address.country_code
      : countries[address.country_code];
  return [
    address.address_line1,
    address.address_line2,
    address.city,
    address.state_code,
    address.postal_code,
    country,
  ]
    .filter((a) => !isNone(a) && a !== "")
    .join(", ");
}

export function formatAddressLocation(
  address: AddressType,
  countries?: { [country_code: string]: string },
): string {
  const country =
    countries === undefined
      ? address.country_code
      : countries[address.country_code];
  return [address.city, address.state_code, address.postal_code, country]
    .filter((a) => !isNone(a) && a !== "")
    .join(", ");
}

export function formatAddressLocationShort(
  address: AddressType,
  countries?: { [country_code: string]: string },
): string {
  const country =
    countries === undefined
      ? address.country_code
      : countries[address.country_code];
  return [address.state_code, address.postal_code, country]
    .filter((a) => !isNone(a) && a !== "")
    .join(", ");
}

export function formatAddressName(address: AddressType): string {
  return [address.person_name, address.company_name]
    .filter((a) => !isNone(a) && a !== "")
    .join(" - ");
}

export function formatAddressRegion(address: AddressType): string {
  return [address.city, address.country_code]
    .filter((a) => !isNone(a) && a !== "")
    .join(", ");
}

export function formatCustomsLabel(customs: CustomsType): string {
  return [customs.content_type, customs.incoterm]
    .filter((c) => !isNone(c))
    .map((c) => formatRef("" + c))
    .join(" - ");
}

export function formatCommodity(item: CommodityType, index?: number): string {
  const identifier = item.sku || item.description;
  const info = isNoneOrEmpty(identifier)
    ? `${index || "item"} - `
    : `${identifier!.slice(0, 45)}...`;
  return `${info} | ${item.quantity} x ${formatWeight(item)}`;
}

export function formatOrderLineItem(
  order: OrderType,
  item: CommodityType,
  index?: number,
) {
  const identifier = item.sku || item.description;
  const info = isNoneOrEmpty(identifier)
    ? `${order.order_id} - item ${index || ""}`
    : `${order.order_id} - ${identifier!.slice(0, 45)}...`;
  return `${info} (${item.quantity} x ${formatWeight(item)})`;
}

export function findPreset(
  presets: PresetCollection,
  package_preset?: string,
): Partial<ParcelType> | undefined {
  const carrier = Object.values(presets).find((carrier) => {
    return Object.keys(carrier).includes(package_preset as string);
  });

  if (carrier === undefined) return undefined;

  return { ...carrier[package_preset as string], package_preset };
}

export function formatValues(separator: string, ...args: any[]): string {
  return args.filter((d) => d !== undefined).join(separator);
}

export function formatDimension(parcel?: Partial<ParcelType> | null): string {
  if (parcel !== undefined && parcel !== null) {
    const { dimension_unit, height, length, width } = parcel;
    let formatted = formatValues(" x ", length, width, height);

    return `${formatted} ${dimension_unit}`;
  }
  return "";
}

export function formatWeight(
  data?: { weight: number; weight_unit: string } | any,
): string {
  if (data !== undefined && data !== null) {
    const { weight, weight_unit } = data;

    return `${weight} ${weight_unit}`;
  }
  return "";
}

export function formatCarrierSlug(name?: string) {
  const raw_name = (name || "")
    .replace(/:-:/, " ")
    .replace(/:_:/, " ")
    .split(" ")[0];
  const count = raw_name.length > 10 ? 9 : 10;
  const short_name = raw_name.slice(0, count) + (count === 9 ? "." : "");
  return short_name.toUpperCase();
}

export function getInitials(text: string) {
  return text
    .split("-")
    .join(" ")
    .split("_")
    .join(" ")
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function isNone(value: any): boolean {
  return value === null || value === undefined;
}

export function isNoneOrEmpty(value: any): boolean {
  return isNone(value) || value === "" || isEqual(value, []);
}

export function deepEqual(
  value1?: object | null,
  value2?: object | null,
): boolean {
  const clean_value1 = Object.entries(value1 || {}).reduce(
    (p, [k, v]) => ({ ...p, [k]: v === null ? undefined : v }),
    {},
  );
  const clean_value2 = Object.entries(value2 || {}).reduce(
    (p, [k, v]) => ({ ...p, [k]: v === null ? undefined : v }),
    {},
  );

  return (
    JSON.stringify(clean_value1, Object.keys(clean_value1 || {}).sort()) ===
    JSON.stringify(clean_value2, Object.keys(clean_value2 || {}).sort())
  );
}

// Remove undefined values from objects
export function cleanDict<T = object>(value: object): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function formatParcelLabel(parcel?: ParcelType | null): string {
  if (
    isNone(parcel) ||
    (parcel && isNone(parcel?.package_preset) && isNone(parcel?.packaging_type))
  ) {
    return "";
  }
  if (!isNone(parcel?.package_preset)) {
    return formatRef(parcel?.package_preset as string);
  } else if (!isNone(parcel?.packaging_type)) {
    return formatRef(parcel?.packaging_type as string);
  }
  return "";
}

export const COUNTRY_WITH_POSTAL_CODE = [
  "CA",
  "US",
  "UK",
  "FR", //TODO:: Add more countries with postal code here.
];

export function getCookie(name: string): string {
  var cookieValue = "";
  if (document?.cookie && document?.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function setCookie(cname: string, cvalue: any, exdays: number = 1) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export async function handleFailure<T>(request: Promise<T>): Promise<T> {
  try {
    const response = await request;
    return response;
  } catch (err: any) {
    if (err.message === "Failed to fetch") {
      throw new Error("Oups! Looks like you are offline");
    } else if (
      ["404", "405", "500", "402"].includes(`${err.response?.status}`) &&
      typeof err.response?.data === "string"
    ) {
      throw err;
    } else if (err instanceof Response) {
      throw new RequestError(await err.json());
    } else if (err.response) {
      throw new RequestError(err.response?.data || err.response);
    }
    throw err;
  }
}

export enum ServerErrorCode {
  API_CONNECTION_ERROR,
  API_AUTH_ERROR,
}

export type ServerError = { code?: ServerErrorCode; message?: string };

export function createServerError(error: ServerError) {
  return error;
}

export const parseJwt = (token: string): any => {
  try {
    const content = Buffer.from(token.split(".")[1], "base64").toString();
    return JSON.parse(content);
  } catch (e) {
    return {};
  }
};

export function url$(strings: TemplateStringsArray, ...keys: any[]) {
  const base = (keys || []).reduce((acc, key, i) => acc + strings[i] + key, "");
  const template = `${base}${strings[strings.length - 1]}`;

  const _url = template.replace(/([^:])(\/\/+)/g, "$1/");
  const url = _url[_url.length - 1] === "/" ? _url.slice(0, -1) : _url;

  return url;
}

export function gqlstr(node: ReturnType<typeof gql>): string {
  return (node.loc && node.loc.source.body) || "";
}

export function getURLSearchParams() {
  const query = new URLSearchParams(location.search);
  return [...(query.keys() as any)].reduce(
    (acc, key) => ({ ...acc, [key]: query.get(key) }),
    {},
  );
}

export function insertUrlParam(params: {} | any) {
  if (window.history.pushState) {
    params = Object.keys(params).reduce(
      (acc, key) =>
        key === "test_mode" ? acc : { ...acc, [key]: params[key] },
      {},
    );
    let searchParams = new URLSearchParams(params);
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    if (newurl.endsWith("?")) {
      newurl = newurl.substring(0, newurl.length - 1);
    }
    window.history.pushState({ path: newurl }, "", newurl);
  }
}

export function addUrlParam(key: string, value: string) {
  insertUrlParam({ ...getURLSearchParams(), [key]: value });
}

export function removeUrlParam(param: string) {
  const params = getURLSearchParams();
  delete params[param];
  insertUrlParam(params);
}

export function jsonify(value: any): string {
  return JSON.stringify(
    typeof value == "string" ? JSON.parse(value) : value,
    null,
    2,
  );
}

export function validationMessage(message: string) {
  return (e: React.FormEvent | any) => {
    e.target.validity.valid && e.target.setCustomValidity(message);
  };
}

export function validityCheck(nested?: (e: React.FormEvent | any) => void) {
  return (e: React.FormEvent | any) => {
    if (e.target.validity.valid) {
      e.target.setCustomValidity("");
      e.target.classList.remove("is-danger");
    } else {
      e.target.classList.add("is-danger");
    }

    return nested && nested(e);
  };
}

export function failsafe(fn: () => any, defaultValue: any = null) {
  try {
    return fn();
  } catch (e) {
    return defaultValue;
  }
}

export function debounce(func: (...args: any[]) => any, timeout: number = 300) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
}

export function isListEqual<T>(list1: T[], list2: T[]) {
  return (
    list1.length === list2.length &&
    list1.every((item, index) => item === list2[index])
  );
}

export function toSingleItem(collection: CommodityType[]) {
  return collection.reduce(
    (acc, item) => {
      const clones = Array(item.quantity || 1)
        .fill(item)
        .map((clone) => [{ ...clone, quantity: 1 }]);

      return acc.concat(clones);
    },
    [] as (typeof collection)[],
  );
}

export function createShipmentFromOrders(
  orderList: OrderType[],
  templates: any,
  workspace_config?: any,
): Partial<ShipmentType> {
  const default_parcel =
    templates.data?.default_templates.default_parcel?.parcel;
  const default_address =
    templates.data?.default_templates.default_address?.address || {};

  const order_ids = orderList.map(({ order_id }) => order_id).join(",");
  const { id: _, ...recipient } = orderList[0].shipping_to || {};
  const { id: __, ...shipper } =
    orderList[0]!.shipping_from || default_address || ({} as any);
  const billing_address = orderList[0].billing_address
    ? orderList[0].billing_address
    : undefined;

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

  // Collect orders merged options
  const order_options: any = orderList.reduce(
    (acc, { options }) => ({ ...acc, ...options }),
    {},
  );
  const order_metadatas: any = orderList.reduce(
    (acc, { metadata }) => ({ ...acc, ...(metadata || {}) }),
    {},
  );

  // Collect unfulfilled line items
  const line_items = orderList
    .map(({ line_items }) => line_items)
    .flat()
    .map(({ id: parent_id, unfulfilled_quantity: quantity, ...item }) => ({
      ...item,
      quantity,
      parent_id,
    }))
    .filter(({ quantity }) => quantity || 0 > 0);
  const parcel = default_parcel || DEFAULT_PARCEL_CONTENT;
  const parcel_items = order_options.single_item_per_parcel
    ? toSingleItem(line_items as any)
    : [line_items];
  const parcels: any[] = (parcel_items as (typeof line_items)[]).map(
    (items) => {
      const weight = items.reduce(
        (acc, { weight, quantity }) => (weight || 0) * (quantity || 1) + acc,
        0.0,
      );
      const weight_unit = items[0]?.weight_unit || parcel.weight_unit;
      return { ...parcel, items, weight, weight_unit };
    },
  );
  const declared_value = line_items.reduce(
    (acc, { value_amount, quantity }) =>
      acc + (value_amount || 0) * (quantity || 1),
    0,
  );

  if (
    !!workspace_config.query.data?.workspace_config?.insured_by_default &&
    !order_options.insurance
  ) {
    order_options.insurance = parseFloat(`${declared_value}`).toFixed(2);
  }

  const options = {
    ...(order_options.service ? { service: order_options.service } : {}),
    ...(order_options.currency ? { currency: order_options.currency } : {}),
    ...(order_options.insurance ? { insurance: order_options.insurance } : {}),
    ...(order_options.dangerous_good
      ? { dangerous_good: order_options.dangerous_good }
      : {}),
    ...(order_options.paperless_trade
      ? { paperless_trade: order_options.paperless_trade }
      : {}),
    ...(order_options.invoice_template
      ? { invoice_template: order_options.invoice_template }
      : {}),
    declared_value: parseFloat(`${declared_value}`).toFixed(2),
  };
  const metadata = {
    order_ids,
    ...order_metadatas,
  };
  const payment = {
    paid_by: (order_options.paid_by as any) || PaidByEnum.sender,
    ...(order_options.currency ? { currency: order_options.currency } : {}),
    ...(order_options.payment_account_number
      ? { account_number: order_options.payment_account_number }
      : {}),
  } as any;
  const isIntl = shipper && shipper.country_code !== recipient.country_code;
  const isDocument = parcels.every((p) => p.is_document);
  const customs = isDocument
    ? null
    : {
        ...DEFAULT_CUSTOMS_CONTENT,
        commercial_invoice: true,
        invoice: orderList[0].order_id,
        invoice_date:
          order_options.invoice_date || moment().format("YYYY-MM-DD"),
        incoterm: payment?.paid_by == "sender" ? "DDP" : "DDU",
        commodities: getShipmentCommodities({ parcels } as any),
        duty: {
          ...DEFAULT_CUSTOMS_CONTENT.duty,
          currency: order_options?.currency,
          paid_by: order_options.duty_paid_by || payment?.paid_by,
          account_number:
            order_options.duty_account_number || payment?.account_number,
          declared_value,
        },
        duty_billing_address: billing_address,
        options: workspace_config?.customsOptions || {},
      };

  return {
    ...(shipper ? { shipper: shipper as any } : {}),
    ...(recipient ? { recipient: recipient as any } : {}),
    options,
    payment,
    parcels,
    metadata,
    label_type: LabelTypeEnum.PDF,
    carrier_ids: order_options.carrier_ids || [],
    billing_address,
    customs: (isIntl ? customs : undefined) as any,
  };
}

export function commodityMatch(
  item: Partial<CommodityType>,
  items?: CommodityType[],
) {
  return (items || []).find(
    (cdt) =>
      (!!cdt.parent_id && cdt.parent_id === item.parent_id) ||
      (!!cdt.hs_code && cdt.hs_code === cdt.hs_code) ||
      (!!cdt.sku && cdt.sku === item.sku),
  );
}

export function getShipmentCommodities(
  shipment: ShipmentType,
  currentCommodities?: CommodityType[],
): CommodityType[] {
  const parcelItems = Object.values(
    shipment?.parcels
      .map((parcel) => parcel.items || [])
      .flat()
      .reduce((acc, { id: _, ...item }: CommodityType, _index) => {
        const index: string =
          item.parent_id || item.sku || item.hs_code || _ || `${_index}`;
        const match: any = commodityMatch(item, currentCommodities) || {};
        const quantity =
          (acc[index]?.quantity || 0) + toNumber(item.quantity || 0);
        acc[index] = { ...match, ...item, quantity };
        return acc;
      }, {} as Collection<CommodityType>),
  );
  const unpackedItems = (currentCommodities || []).filter((cdt) =>
    isNone(commodityMatch(cdt, parcelItems)),
  );

  return [...parcelItems, ...unpackedItems];
}

export function getOrderLineItems(orders: OrderType[]) {
  return (orders || []).map(({ line_items }) => line_items).flat();
}

export function getUnfulfilledOrderLineItems(orders: OrderType[]) {
  return getOrderLineItems(orders)
    .map(({ id, unfulfilled_quantity: quantity, ...item }) => ({
      ...item,
      quantity,
      id,
      parent_id: id,
    }))
    .filter(({ quantity }) => toNumber(quantity) || 0 > 0);
}

export function errorToMessages(error: ErrorType | Error | any) {
  const data = error.data?.message || error.message;

  return (
    error.data?.errors || error.data?.messages || (data ? [data] : [error])
  );
}

export function onError(error: any) {
  const response = error.response?.data || error.data || error;

  const authExpiredError = (response.errors || []).find(
    (err: any) =>
      err.code === "authentication_required" || err.status_code === 401,
  );

  // if (authExpiredError) { window.location.pathname = window.location.pathname; }
}

export function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
