import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1UsersProfile() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/profile',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1UsersUploadAvatar(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/upload-avatar',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1UsersPreferences() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/preferences',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static putApiV1UsersPreferences(requestBody) {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/preferences',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1UsersNotificationSettings() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/notification-settings',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static putApiV1UsersNotificationSettings(requestBody) {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/notification-settings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static putApiV1UsersUpdateUserProfile(requestBody) {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/update-user-profile',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1UsersAddUserBankDetails(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/add-user-bank-details',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static putApiV1UsersUpdateUserBankDetails(requestBody) {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/update-user-bank-details',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1UsersGetBankDetails() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/get-bank-details',
        });
    }
}
