export type ApiStatus = 'ok' | 'error';

export interface ArticleSource {
    readonly id: string | null;
    readonly name: string;
}

export interface Source {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly category: string;
    readonly language: string;
    readonly country: string;
}

export interface Article {
    readonly source: ArticleSource;
    readonly author: string | null;
    readonly title: string;
    readonly description: string | null;
    readonly url: string;
    readonly urlToImage: string | null;
    readonly publishedAt: string;
    readonly content: string | null;
}

export interface SourcesResponse {
    readonly status: ApiStatus;
    readonly sources: readonly Source[];
}

export interface EverythingResponse {
    readonly status: ApiStatus;
    readonly totalResults: number;
    readonly articles: readonly Article[];
}
