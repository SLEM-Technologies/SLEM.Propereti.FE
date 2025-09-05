import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaystackService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1Paystack(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/paystack',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param reference
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1Paystack(reference) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/paystack',
            query: {
                'reference': reference,
            },
        });
    }
    /**
     * @param reference
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1PaystackReceipt(reference) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/paystack/receipt',
            query: {
                'reference': reference,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1PaystackSavedCards() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/paystack/saved-cards',
        });
    }
    /**
     * @param authorizationCode
     * @param amount
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PaystackChargeSavedCard(authorizationCode, amount) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/paystack/charge-saved-card',
            query: {
                'authorizationCode': authorizationCode,
                'amount': amount,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PaystackWebhook(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/paystack/webhook',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PaystackPaystackWebhook(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/paystack/paystack-webhook',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PaystackPaystackTestWebhook() {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/paystack/paystack-test-webhook',
        });
    }
}
