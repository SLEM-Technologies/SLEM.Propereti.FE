/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InitialiseTransactionRequest } from '../models/InitialiseTransactionRequest';
import type { WebhookPaystackTransactionResponse } from '../models/WebhookPaystackTransactionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaystackService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1Paystack(
        requestBody?: InitialiseTransactionRequest,
    ): CancelablePromise<any> {
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
    public static getApiV1Paystack(
        reference?: string,
    ): CancelablePromise<any> {
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
    public static getApiV1PaystackReceipt(
        reference?: string,
    ): CancelablePromise<any> {
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
    public static getApiV1PaystackSavedCards(): CancelablePromise<any> {
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
    public static postApiV1PaystackChargeSavedCard(
        authorizationCode?: string,
        amount?: number,
    ): CancelablePromise<any> {
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
    public static postApiV1PaystackWebhook(
        requestBody?: WebhookPaystackTransactionResponse,
    ): CancelablePromise<any> {
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
    public static postApiV1PaystackPaystackWebhook(
        requestBody?: WebhookPaystackTransactionResponse,
    ): CancelablePromise<any> {
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
    public static postApiV1PaystackPaystackTestWebhook(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/paystack/paystack-test-webhook',
        });
    }
}
