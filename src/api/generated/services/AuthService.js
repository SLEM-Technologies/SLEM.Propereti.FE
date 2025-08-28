import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthRefresh(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthLogout(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthLogoutAll() {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout-all',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthChangePassword(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthPasswordResetRequest(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/password-reset/request',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthPasswordResetConfirm(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/password-reset/confirm',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthResendEmailVerification(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/resend-email-verification',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthMfaEnable() {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/mfa/enable',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthMfaVerify(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/mfa/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AuthMfaDisable() {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/mfa/disable',
        });
    }
}
