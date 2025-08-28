/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressRequestModel } from '../models/AddressRequestModel';
import type { UpdateAddressRequestModel } from '../models/UpdateAddressRequestModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AddressService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AddressAddAddress(
        requestBody?: AddressRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/address/add-address',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiV1AddressUpdateAddress(
        requestBody?: UpdateAddressRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/address/update-address',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
