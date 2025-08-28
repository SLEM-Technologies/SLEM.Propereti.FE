/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CountriesService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1CountriesGetAllCountries(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/countries/get-all-countries',
        });
    }
    /**
     * @param name
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1CountriesGetCountry(
        name?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/countries/get-country',
            query: {
                'name': name,
            },
        });
    }
}
