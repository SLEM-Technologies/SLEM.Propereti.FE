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
    static getApiV1SearchProperties(pageNumber, pageSize, searchParams, sort) {
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
    static getApiV1SearchSuggest(q, limit = 10) {
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
    static getApiV1SearchNearby(lat, lng, radiusKm = 10, page = 1, pageSize = 10) {
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
