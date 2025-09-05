import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PermissionsService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PeermissionsCreateRole(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/peermissions/create-role',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1PeermissionsAssignUserRole(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/peermissions/assign-user-role',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
