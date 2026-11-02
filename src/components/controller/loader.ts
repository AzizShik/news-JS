import { ApiEndpoint, Callback, HttpMethod, LoaderResponseMap, QueryOptions, RequestParams } from '../../types/http';

class Loader {
    private readonly baseLink: string;

    private readonly options: QueryOptions;

    constructor(baseLink: string, options: QueryOptions = {}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<K extends ApiEndpoint>(
        { endpoint, options = {} }: RequestParams<K>,
        callback: Callback<LoaderResponseMap[K]> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.Get, endpoint, callback, options);
    }

    private static errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: QueryOptions, endpoint: ApiEndpoint): string {
        const urlOptions: QueryOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<K extends ApiEndpoint>(
        method: HttpMethod,
        endpoint: K,
        callback: Callback<LoaderResponseMap[K]> = () => {
            console.error('No callback for GET response');
        },
        options: QueryOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(Loader.errorHandler)
            .then((res) => res.json() as Promise<LoaderResponseMap[K]>)
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
