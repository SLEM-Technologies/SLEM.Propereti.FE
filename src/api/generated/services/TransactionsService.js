import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1TransactionsGetTransactionHistory() {
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
    static getApiV1TransactionsDetails(reference) {
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
    static postApiV1TransactionsTransferFunds(receiverId, amount) {
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
    static postApiV1TransactionsRefund(reference) {
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
    static postApiV1TransactionsDispute(reference, reason) {
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
    static postApiV1TransactionsDisputeResolve(reference, approve, note) {
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
    static postApiV1TransactionsResale(buyerUserId, sellerUserId, amount) {
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
    static postApiV1TransactionsResaleWithOwnership(propertyId, buyerUserId, sellerUserId, amount) {
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
    static postApiV1TransactionsEscrowCreate(buyerUserId, sellerUserId, amount, propertyId) {
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
    static postApiV1TransactionsEscrowRelease(reference, releaseToSeller) {
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
