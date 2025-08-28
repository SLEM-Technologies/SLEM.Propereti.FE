import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PropertyLegalDocsService {
    /**
     * @param propertyId
     * @param documentType
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PropertiesLegalDocs(propertyId, documentType, requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/properties/{propertyId}/legal-docs',
            path: {
                'propertyId': propertyId,
            },
            query: {
                'documentType': documentType,
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
    static getApiV1PropertiesLegalDocs(propertyId) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/{propertyId}/legal-docs',
            path: {
                'propertyId': propertyId,
            },
        });
    }
    /**
     * @param propertyId
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1PropertiesLegalDocs1(propertyId, id) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/{propertyId}/legal-docs/{id}',
            path: {
                'propertyId': propertyId,
                'id': id,
            },
        });
    }
    /**
     * @param propertyId
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    static deleteApiV1PropertiesLegalDocs(propertyId, id) {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/properties/{propertyId}/legal-docs/{id}',
            path: {
                'propertyId': propertyId,
                'id': id,
            },
        });
    }
    /**
     * @param propertyId
     * @param id
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PropertiesLegalDocsReplace(propertyId, id, requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/properties/{propertyId}/legal-docs/{id}/replace',
            path: {
                'propertyId': propertyId,
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
