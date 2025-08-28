import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocumentsService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1DocumentsAddDocument(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/documents/add-document',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1Documents() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/documents',
        });
    }
    /**
     * @param documentId
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1Documents1(documentId) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/documents/{documentId}',
            path: {
                'documentId': documentId,
            },
        });
    }
    /**
     * @param documentId
     * @returns any OK
     * @throws ApiError
     */
    static deleteApiV1Documents(documentId) {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/documents/{documentId}',
            path: {
                'documentId': documentId,
            },
        });
    }
    /**
     * @param documentId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1DocumentsReupload(documentId, requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/documents/{documentId}/reupload',
            path: {
                'documentId': documentId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param documentId
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1DocumentsVerify(documentId) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/documents/{documentId}/verify',
            path: {
                'documentId': documentId,
            },
        });
    }
    /**
     * @param documentId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1DocumentsReject(documentId, requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/documents/{documentId}/reject',
            path: {
                'documentId': documentId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
