/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SystemSetupService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiSetupsInitialSetup(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setups/initial-setup',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiSetupsSetupCountries(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setups/Setup-countries',
        });
    }
}
