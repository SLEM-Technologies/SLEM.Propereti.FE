import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PropertiesService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PropertiesCreateProperty(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/properties/create-property',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1PropertiesGetAllProperties() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/get-all-properties',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1PropertiesGetPropertyById(id) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/get-property-by-id',
            query: {
                'Id': id,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1PropertiesSearchProperty(requestBody) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/search-property',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PropertiesPayForProperty(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/properties/pay-for-property',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param propertyId
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1PropertiesPayments(propertyId) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/payments',
            query: {
                'propertyId': propertyId,
            },
        });
    }
    /**
     * @param propertyId
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1PropertiesInstallmentSchedule(propertyId) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/installment-schedule',
            query: {
                'propertyId': propertyId,
            },
        });
    }
    /**
     * @param propertyId
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1PropertiesCurrentOwner(propertyId) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/current-owner',
            query: {
                'propertyId': propertyId,
            },
        });
    }
    /**
     * @param propertyId
     * @param buyerUserId
     * @param sellerUserId
     * @param amount
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PropertiesTransferOwnership(propertyId, buyerUserId, sellerUserId, amount) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/properties/transfer-ownership',
            query: {
                'propertyId': propertyId,
                'buyerUserId': buyerUserId,
                'sellerUserId': sellerUserId,
                'amount': amount,
            },
        });
    }
}
