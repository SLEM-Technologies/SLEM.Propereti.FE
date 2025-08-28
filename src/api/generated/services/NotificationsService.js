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
    static getApiV1Notifications(page = 1, pageSize = 20, unreadOnly) {
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
    static postApiV1NotificationsRead(id) {
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
    static postApiV1NotificationsReadAll() {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/read-all',
        });
    }
}
