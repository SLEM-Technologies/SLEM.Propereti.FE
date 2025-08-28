/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SearchService {
    /**
     * @param pageNumber
     * @param pageSize
     * @param searchParams
     * @param sort
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1SearchProperties(
        pageNumber?: number,
        pageSize?: number,
        searchParams?: Record<string, string>,
        sort?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/search/properties',
            query: {
                'PageNumber': pageNumber,
                'PageSize': pageSize,
                'SearchParams': searchParams,
                'sort': sort,
            },
        });
    }
    /**
     * @param q
     * @param limit
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1SearchSuggest(
        q?: string,
        limit: number = 10,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/search/suggest',
            query: {
                'q': q,
                'limit': limit,
            },
        });
    }
    /**
     * @param lat
     * @param lng
     * @param radiusKm
     * @param page
     * @param pageSize
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1SearchNearby(
        lat?: number,
        lng?: number,
        radiusKm: number = 10,
        page: number = 1,
        pageSize: number = 10,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/search/nearby',
            query: {
                'lat': lat,
                'lng': lng,
                'radiusKm': radiusKm,
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
}
