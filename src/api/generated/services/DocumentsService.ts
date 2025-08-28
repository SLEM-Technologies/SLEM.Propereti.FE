/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentsRequestModel } from '../models/DocumentsRequestModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocumentsService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1DocumentsAddDocument(
        requestBody?: DocumentsRequestModel,
    ): CancelablePromise<any> {
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
    public static getApiV1Documents(): CancelablePromise<any> {
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
    public static getApiV1Documents1(
        documentId: string,
    ): CancelablePromise<any> {
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
    public static deleteApiV1Documents(
        documentId: string,
    ): CancelablePromise<any> {
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
    public static postApiV1DocumentsReupload(
        documentId: string,
        requestBody?: string,
    ): CancelablePromise<any> {
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
    public static postApiV1DocumentsVerify(
        documentId: string,
    ): CancelablePromise<any> {
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
    public static postApiV1DocumentsReject(
        documentId: string,
        requestBody?: string,
    ): CancelablePromise<any> {
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
