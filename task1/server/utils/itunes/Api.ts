/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://itunes.apple.com";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title itunes-search-lite
 * @version 2017.9.31
 * @baseUrl https://itunes.apple.com
 *
 * this zero-dependency package will provide an api for itunes-search, with a working demo
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  search = {
    /**
     * No description
     *
     * @tags itunes
     * @name ItunesSearch
     * @summary itunes search api
     * @request GET:/search
     */
    itunesSearch: (
      query: {
        /**
         * The URL-encoded text string you want to search for. For example: jack+johnson.
         * @default "jack+johnson"
         */
        term: string;
        /**
         * The two-letter country code for the store you want to search. The search uses the default store front for the specified country. For example: US. The default is US.
         * @default "US"
         */
        country: string;
        /**
         * The media type you want to search for. For example: movie. The default is all.
         * @default "all"
         */
        media?:
          | "movie"
          | "podcast"
          | "music"
          | "musicVideo"
          | "audiobook"
          | "shortFilm"
          | "tvShow"
          | "software"
          | "ebook"
          | "all";
        /** The type of results you want returned, relative to the specified media type. For example: movieArtist for a movie media type search. The default is the track entity associated with the specified media type. */
        entity?:
          | "movieArtist"
          | "movie"
          | "podcastAuthor"
          | "podcast"
          | "musicArtist"
          | "musicTrack"
          | "album"
          | "musicVideo"
          | "mix"
          | "song"
          | "audiobookAuthor"
          | "audiobook"
          | "shortFilmArtist"
          | "shortFilm"
          | "tvEpisode"
          | "tvSeason"
          | "software"
          | "iPadSoftware"
          | "macSoftware"
          | "ebook"
          | "allArtist"
          | "allTrack";
        /** The attribute you want to search for in the stores, relative to the specified media type. For example, if you want to search for an artist by name specify entity=allArtist&attribute=allArtistTerm. In this example, if you search for term=maroon, iTunes returns “Maroon 5” in the search results, instead of all artists who have ever recorded a song with the word “maroon” in the title. The default is all attributes associated with the specified media type. */
        attribute?:
          | "actorTerm"
          | "genreIndex"
          | "artistTerm"
          | "shortFilmTerm"
          | "producerTerm"
          | "ratingTerm"
          | "directorTerm"
          | "releaseYearTerm"
          | "featureFilmTerm"
          | "movieArtistTerm"
          | "movieTerm"
          | "ratingIndex"
          | "descriptionTerm"
          | "titleTerm"
          | "languageTerm"
          | "authorTerm"
          | "keywordsTerm"
          | "mixTerm"
          | "composerTerm"
          | "albumTerm"
          | "songTerm"
          | "softwareDeveloper"
          | "tvEpisodeTerm"
          | "showTerm"
          | "tvSeasonTerm"
          | "allArtistTerm"
          | "allTrackTerm";
        /**
         * The name of the Javascript callback function you want to use when returning search results to your website. For example: wsSearchCB.
         * @default ""
         */
        callback?: string;
        /** The number of search results you want the iTunes Store to return. For example: 25.The default is 50. */
        limit?: number;
        /**
         * The language, English or Japanese, you want to use when returning search results. Specify the language using the five-letter codename. For example: en_us.The default is en_us (English).
         * @default "en_us"
         */
        lang?: "en_us" | "ja_jp";
        /**
         * The search result key version you want to receive back from your search.The default is 2.
         * @default 2
         */
        version?: 1 | 2;
        /**
         * A flag indicating whether or not you want to include explicit content in your search results.The default is Yes.
         * @default "Yes"
         */
        explicit?: "Yes" | "No";
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/search`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
}
