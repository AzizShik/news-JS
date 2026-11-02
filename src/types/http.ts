import type { EverythingResponse, SourcesResponse } from './api';

export type Callback<T> = (data: T) => void;

export enum HttpMethod {
    Get = 'GET',
}

export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export type QueryOptions = Readonly<Record<string, string | undefined>>;

export interface LoaderResponseMap {
    [ApiEndpoint.Sources]: SourcesResponse;
    [ApiEndpoint.Everything]: EverythingResponse;
}

export interface RequestParams<K extends ApiEndpoint> {
    readonly endpoint: K;
    readonly options?: QueryOptions;
}
