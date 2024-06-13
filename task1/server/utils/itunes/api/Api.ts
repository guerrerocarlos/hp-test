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

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "https://itunes.apple.com" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
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
