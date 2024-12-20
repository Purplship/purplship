import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { Configuration, ConfigurationParameters } from "./rest/configuration";
import {
  AddressesApi,
  APIApi,
  CarriersApi,
  ConnectionsApi,
  ParcelsApi,
  PickupsApi,
  ProxyApi,
  ShipmentsApi,
  TrackersApi,
  OrdersApi,
  WebhooksApi,
  BatchesApi,
  DocumentsApi,
  ManifestsApi,
} from "./rest/api";
import * as base from "./base";

export * from "./graphql";
export * from "./base";

export interface KarrioClientInterface {
  API: APIApi;
  addresses: AddressesApi;
  carriers: CarriersApi;
  connections: ConnectionsApi;
  parcels: ParcelsApi;
  pickups: PickupsApi;
  proxy: ProxyApi;
  shipments: ShipmentsApi;
  trackers: TrackersApi;
  orders: OrdersApi;
  webhooks: WebhooksApi;
  batches: BatchesApi;
  documents: DocumentsApi;
  manifests: ManifestsApi;
  config: ConfigurationParameters;
  graphql: GraphQLApi;
  admin: GraphQLApi;
}

export class KarrioClient implements KarrioClientInterface {
  API: APIApi;
  addresses: AddressesApi;
  carriers: CarriersApi;
  connections: ConnectionsApi;
  parcels: ParcelsApi;
  pickups: PickupsApi;
  proxy: ProxyApi;
  shipments: ShipmentsApi;
  trackers: TrackersApi;
  orders: OrdersApi;
  webhooks: WebhooksApi;
  documents: DocumentsApi;
  manifests: ManifestsApi;
  batches: BatchesApi;
  config: ConfigurationParameters;
  axios: AxiosInstance;
  graphql: GraphQLApi;
  admin: GraphQLApi;

  constructor({
    headers,
    ...clientConfig
  }: ConfigurationParameters & { headers?: AxiosRequestHeaders }) {
    const config = new Configuration(clientConfig);
    const axiosInstance = axios.create({ baseURL: config.basePath, headers });

    this.axios = axiosInstance;
    this.config = clientConfig;
    this.API = new APIApi(config, config.basePath, axiosInstance);
    this.addresses = new AddressesApi(config, config.basePath, axiosInstance);
    this.carriers = new CarriersApi(config, config.basePath, axiosInstance);
    this.connections = new ConnectionsApi(
      config,
      config.basePath,
      axiosInstance,
    );
    this.parcels = new ParcelsApi(config, config.basePath, axiosInstance);
    this.pickups = new PickupsApi(config, config.basePath, axiosInstance);
    this.proxy = new ProxyApi(config, config.basePath, axiosInstance);
    this.shipments = new ShipmentsApi(config, config.basePath, axiosInstance);
    this.trackers = new TrackersApi(config, config.basePath, axiosInstance);
    this.orders = new OrdersApi(config, config.basePath, axiosInstance);
    this.webhooks = new WebhooksApi(config, config.basePath, axiosInstance);
    this.documents = new DocumentsApi(config, config.basePath, axiosInstance);
    this.manifests = new ManifestsApi(config, config.basePath, axiosInstance);
    this.batches = new BatchesApi(config, config.basePath, axiosInstance);
    this.graphql = new GraphQLApi(config.basePath, axiosInstance);
    this.admin = new GraphQLApi(`${config.basePath}/admin`, axiosInstance);
  }
}

export class GraphQLApi {
  host: string | undefined;
  axiosInstance: AxiosInstance;

  constructor(host: string | undefined, axiosInstance: AxiosInstance) {
    this.host = host;
    this.axiosInstance = axiosInstance;
  }

  async request<T>(query: string, args?: base.requestArgs): Promise<T> {
    const {
      url,
      data,
      variables: reqVariables,
      operationName,
      ...config
    } = args || {};
    try {
      const APIUrl = url || `${this.host}/graphql`;
      const variables = data ? { data } : reqVariables;
      const { data: response } = await this.axiosInstance.post<{
        data?: T;
        errors?: any;
      }>(APIUrl, { query, operationName, variables }, config);

      if (response.errors) {
        throw new base.RequestError({ errors: response.errors });
      }

      return response.data || (response as T);
    } catch (error: any) {
      throw new base.RequestError(error.response?.data || error.data || error);
    }
  }
}
