/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationsService {
    /**
     * @param page
     * @param pageSize
     * @param unreadOnly
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1Notifications(
        page: number = 1,
        pageSize: number = 20,
        unreadOnly?: boolean,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/notifications',
            query: {
                'page': page,
                'pageSize': pageSize,
                'unreadOnly': unreadOnly,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1NotificationsRead(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/{id}/read',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1NotificationsReadAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/read-all',
        });
    }
}
