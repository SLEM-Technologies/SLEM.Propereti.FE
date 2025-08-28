/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankDetailsRequestDto } from '../models/BankDetailsRequestDto';
import type { UpdateBankDetailsRequestModel } from '../models/UpdateBankDetailsRequestModel';
import type { UpdateUserProfileRequestModel } from '../models/UpdateUserProfileRequestModel';
import type { UserNotificationSetting } from '../models/UserNotificationSetting';
import type { UserPreference } from '../models/UserPreference';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1UsersProfile(): CancelablePromise<any> {
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
    public static postApiV1UsersUploadAvatar(
        requestBody?: string,
    ): CancelablePromise<any> {
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
    public static getApiV1UsersPreferences(): CancelablePromise<any> {
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
    public static putApiV1UsersPreferences(
        requestBody?: UserPreference,
    ): CancelablePromise<any> {
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
    public static getApiV1UsersNotificationSettings(): CancelablePromise<any> {
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
    public static putApiV1UsersNotificationSettings(
        requestBody?: UserNotificationSetting,
    ): CancelablePromise<any> {
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
    public static putApiV1UsersUpdateUserProfile(
        requestBody?: UpdateUserProfileRequestModel,
    ): CancelablePromise<any> {
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
    public static postApiV1UsersAddUserBankDetails(
        requestBody?: BankDetailsRequestDto,
    ): CancelablePromise<any> {
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
    public static putApiV1UsersUpdateUserBankDetails(
        requestBody?: UpdateBankDetailsRequestModel,
    ): CancelablePromise<any> {
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
    public static getApiV1UsersGetBankDetails(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/get-bank-details',
        });
    }
}
