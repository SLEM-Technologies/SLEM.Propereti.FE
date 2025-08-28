import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AddressService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AddressAddAddress(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/address/add-address',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static putApiV1AddressUpdateAddress(requestBody) {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/address/update-address',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
