/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserRoleRequestModel } from '../models/CreateUserRoleRequestModel';
import type { RoleRequestModel } from '../models/RoleRequestModel';
import type { UserRolePermissionRequestModel } from '../models/UserRolePermissionRequestModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AdminRoles(
        requestBody?: RoleRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/roles',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AdminRolesAssign(
        requestBody?: CreateUserRoleRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/roles/assign',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AdminPermissionsAssign(
        requestBody?: UserRolePermissionRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/permissions/assign',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param companyId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1AdminRoles(
        companyId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/roles/{companyId}',
            path: {
                'companyId': companyId,
            },
        });
    }
    /**
     * @param companyId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1AdminPermissions(
        companyId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/permissions/{companyId}',
            path: {
                'companyId': companyId,
            },
        });
    }
}
