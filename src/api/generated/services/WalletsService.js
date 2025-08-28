import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WalletsService {
    /**
     * @param userId
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1WalletsGetWalletDetails(userId) {
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
    static postApiV1WalletsWithdraw(amount) {
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
    static getApiV1WalletsStatements(page = 1, pageSize = 20, type, from, to) {
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
