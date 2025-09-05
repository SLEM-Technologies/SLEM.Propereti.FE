/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequestModel } from '../models/LoginRequestModel';
import type { RegistrationRequestModel } from '../models/RegistrationRequestModel';
import type { VerifyEmailRequest } from '../models/VerifyEmailRequest';
import type { VerifyPhoneRequest } from '../models/VerifyPhoneRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountsService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AccountsRegisterUser(
        requestBody?: RegistrationRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/register-user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AccountsUserLogin(
        requestBody?: LoginRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/user-login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param email
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AccountsForgotPassword(
        email?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/forgot-password',
            query: {
                'Email': email,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AccountsVerifyPhonenumber(
        requestBody?: VerifyPhoneRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/verify-phonenumber',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AccountsVerifyEmail(
        requestBody?: VerifyEmailRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/verify-email',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
