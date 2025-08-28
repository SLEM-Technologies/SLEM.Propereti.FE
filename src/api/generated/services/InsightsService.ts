/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InsightsService {
    /**
     * @param regionKey
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1InsightsRegionalTrends(
        regionKey?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/insights/regional-trends',
            query: {
                'regionKey': regionKey,
            },
        });
    }
    /**
     * @param regionKey
     * @param months
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1InsightsPriceTimeseries(
        regionKey?: string,
        months: number = 12,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/insights/price-timeseries',
            query: {
                'regionKey': regionKey,
                'months': months,
            },
        });
    }
}
