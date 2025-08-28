import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AdminRoles(requestBody) {
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
    static postApiV1AdminRolesAssign(requestBody) {
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
    static postApiV1AdminPermissionsAssign(requestBody) {
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
    static getApiV1AdminRoles(companyId) {
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
    static getApiV1AdminPermissions(companyId) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/permissions/{companyId}',
            path: {
                'companyId': companyId,
            },
        });
    }
}
