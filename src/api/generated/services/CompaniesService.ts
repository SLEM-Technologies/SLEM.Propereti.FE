/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCompanyRequestModel } from '../models/CreateCompanyRequestModel';
import type { RegistrationRequestModel } from '../models/RegistrationRequestModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompaniesService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1CompaniesCreateCompany(
        requestBody?: CreateCompanyRequestModel,
    ): CancelablePromise<any> {
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
    public static postApiV1CompaniesCreateCompanyStaffAssignRole(
        userId?: string,
        roleId?: string,
        companyId?: string,
        requestBody?: RegistrationRequestModel,
    ): CancelablePromise<any> {
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
    public static postApiV1CompaniesCreateCompanyAdmin(
        requestBody?: RegistrationRequestModel,
    ): CancelablePromise<any> {
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
    public static getApiV1CompaniesGetAllCompanies(): CancelablePromise<any> {
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
    public static postApiV1CompaniesInviteMember(
        companyId?: string,
        email?: string,
        roleId?: string,
    ): CancelablePromise<any> {
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
    public static postApiV1CompaniesAcceptInvite(
        token?: string,
        password?: string,
    ): CancelablePromise<any> {
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
    public static getApiV1CompaniesMembers(
        companyId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/companies/members',
            query: {
                'companyId': companyId,
            },
        });
    }
}
