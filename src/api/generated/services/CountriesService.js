import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CountriesService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1CountriesGetAllCountries() {
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
    static getApiV1CountriesGetCountry(name) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/countries/get-country',
            query: {
                'name': name,
            },
        });
    }
}
