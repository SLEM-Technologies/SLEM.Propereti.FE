/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePropertyRequestModel } from '../models/CreatePropertyRequestModel';
import type { PayForPropertyRequestModel } from '../models/PayForPropertyRequestModel';
import type { SearchRequestModel } from '../models/SearchRequestModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PropertiesService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1PropertiesCreateProperty(
        requestBody?: CreatePropertyRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/properties/create-property',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1PropertiesGetAllProperties(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/get-all-properties',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1PropertiesGetPropertyById(
        id?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/get-property-by-id',
            query: {
                'Id': id,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1PropertiesSearchProperty(
        requestBody?: SearchRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/search-property',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1PropertiesPayForProperty(
        requestBody?: PayForPropertyRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/properties/pay-for-property',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param propertyId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1PropertiesPayments(
        propertyId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/payments',
            query: {
                'propertyId': propertyId,
            },
        });
    }
    /**
     * @param propertyId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1PropertiesInstallmentSchedule(
        propertyId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/installment-schedule',
            query: {
                'propertyId': propertyId,
            },
        });
    }
    /**
     * @param propertyId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1PropertiesCurrentOwner(
        propertyId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/properties/current-owner',
            query: {
                'propertyId': propertyId,
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
    public static postApiV1PropertiesTransferOwnership(
        propertyId?: string,
        buyerUserId?: string,
        sellerUserId?: string,
        amount?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/properties/transfer-ownership',
            query: {
                'propertyId': propertyId,
                'buyerUserId': buyerUserId,
                'sellerUserId': sellerUserId,
                'amount': amount,
            },
        });
    }
}
