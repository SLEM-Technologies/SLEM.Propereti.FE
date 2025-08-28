import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InsightsService {
    /**
     * @param regionKey
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1InsightsRegionalTrends(regionKey) {
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
    static getApiV1InsightsPriceTimeseries(regionKey, months = 12) {
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
