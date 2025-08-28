import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountsService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AccountsRegisterUser(requestBody) {
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
    static postApiV1AccountsUserLogin(requestBody) {
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
    static postApiV1AccountsForgotPassword(email) {
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
    static postApiV1AccountsVerifyPhonenumber(requestBody) {
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
    static postApiV1AccountsVerifyEmail(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/verify-email',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
