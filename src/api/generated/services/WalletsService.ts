/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WalletsService {
    /**
     * @param userId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1WalletsGetWalletDetails(
        userId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/wallets/get-wallet-details',
            query: {
                'userId': userId,
            },
        });
    }
    /**
     * @param amount
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1WalletsWithdraw(
        amount?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/wallets/withdraw',
            query: {
                'amount': amount,
            },
        });
    }
    /**
     * @param page
     * @param pageSize
     * @param type
     * @param from
     * @param to
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1WalletsStatements(
        page: number = 1,
        pageSize: number = 20,
        type?: string,
        from?: string,
        to?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/wallets/statements',
            query: {
                'page': page,
                'pageSize': pageSize,
                'type': type,
                'from': from,
                'to': to,
            },
        });
    }
}
