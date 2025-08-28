import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompaniesService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1CompaniesCreateCompany(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/companies/create-company',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @param roleId
     * @param companyId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1CompaniesCreateCompanyStaffAssignRole(userId, roleId, companyId, requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/companies/create-company-staff-assign-role',
            query: {
                'UserId': userId,
                'RoleId': roleId,
                'CompanyId': companyId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1CompaniesCreateCompanyAdmin(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/companies/create-company-admin',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1CompaniesGetAllCompanies() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/companies/get-all-companies',
        });
    }
    /**
     * @param companyId
     * @param email
     * @param roleId
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1CompaniesInviteMember(companyId, email, roleId) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/companies/invite-member',
            query: {
                'companyId': companyId,
                'email': email,
                'roleId': roleId,
            },
        });
    }
    /**
     * @param token
     * @param password
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1CompaniesAcceptInvite(token, password) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/companies/accept-invite',
            query: {
                'token': token,
                'password': password,
            },
        });
    }
    /**
     * @param companyId
     * @returns any OK
     * @throws ApiError
     */
    static getApiV1CompaniesMembers(companyId) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/companies/members',
            query: {
                'companyId': companyId,
            },
        });
    }
}
