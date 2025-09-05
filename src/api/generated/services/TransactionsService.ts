/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1TransactionsGetTransactionHistory(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions/get-transaction-history',
        });
    }
    /**
     * @param reference
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1TransactionsDetails(
        reference?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions/details',
            query: {
                'reference': reference,
            },
        });
    }
    /**
     * @param receiverId
     * @param amount
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TransactionsTransferFunds(
        receiverId?: string,
        amount?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/transfer-funds',
            query: {
                'receiverId': receiverId,
                'Amount': amount,
            },
        });
    }
    /**
     * @param reference
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TransactionsRefund(
        reference?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/refund',
            query: {
                'reference': reference,
            },
        });
    }
    /**
     * @param reference
     * @param reason
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TransactionsDispute(
        reference?: string,
        reason?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/dispute',
            query: {
                'reference': reference,
                'reason': reason,
            },
        });
    }
    /**
     * @param reference
     * @param approve
     * @param note
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TransactionsDisputeResolve(
        reference?: string,
        approve?: boolean,
        note?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/dispute/resolve',
            query: {
                'reference': reference,
                'approve': approve,
                'note': note,
            },
        });
    }
    /**
     * @param buyerUserId
     * @param sellerUserId
     * @param amount
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TransactionsResale(
        buyerUserId?: string,
        sellerUserId?: string,
        amount?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/resale',
            query: {
                'buyerUserId': buyerUserId,
                'sellerUserId': sellerUserId,
                'amount': amount,
            },
        });
    }
    /**
     * @param propertyId
     * @param buyerUserId
     * @param sellerUserId
     * @param amount
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TransactionsResaleWithOwnership(
        propertyId?: string,
        buyerUserId?: string,
        sellerUserId?: string,
        amount?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/resale-with-ownership',
            query: {
                'propertyId': propertyId,
                'buyerUserId': buyerUserId,
                'sellerUserId': sellerUserId,
                'amount': amount,
            },
        });
    }
    /**
     * @param buyerUserId
     * @param sellerUserId
     * @param amount
     * @param propertyId
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TransactionsEscrowCreate(
        buyerUserId?: string,
        sellerUserId?: string,
        amount?: number,
        propertyId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/escrow/create',
            query: {
                'buyerUserId': buyerUserId,
                'sellerUserId': sellerUserId,
                'amount': amount,
                'propertyId': propertyId,
            },
        });
    }
    /**
     * @param reference
     * @param releaseToSeller
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TransactionsEscrowRelease(
        reference?: string,
        releaseToSeller?: boolean,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/escrow/release',
            query: {
                'reference': reference,
                'releaseToSeller': releaseToSeller,
            },
        });
    }
}
