import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ContractsService {
    /**
     * @param propertyId
     * @param buyerUserId
     * @param sellerUserId
     * @param contractType
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1Contracts(propertyId, buyerUserId, sellerUserId, contractType, requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/contracts',
            query: {
                'propertyId': propertyId,
                'buyerUserId': buyerUserId,
                'sellerUserId': sellerUserId,
                'contractType': contractType,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param propertyId
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1Contracts(propertyId) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/contracts',
            query: {
                'propertyId': propertyId,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1Contracts1(id) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/contracts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param role
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1ContractsSign(id, role) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/contracts/{id}/sign',
            path: {
                'id': id,
            },
            query: {
                'role': role,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1ContractsCancel(id) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/contracts/{id}/cancel',
            path: {
                'id': id,
            },
        });
    }
}
