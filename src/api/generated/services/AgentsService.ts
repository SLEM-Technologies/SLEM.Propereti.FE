/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAgentRequestModel } from '../models/CreateAgentRequestModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgentsService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AgentsRegisterAgent(
        requestBody?: CreateAgentRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/agents/register-agent',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AgentsRegisterCompanyAgent(
        requestBody?: CreateAgentRequestModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/agents/register-company-agent',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1AgentsGetAllAgents(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/agents/get-all-agents',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1AgentsGetAgentById(
        id?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/agents/get-agent-by-Id',
            query: {
                'Id': id,
            },
        });
    }
    /**
     * @param companyId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1AgentsGetAgentByCompanyId(
        companyId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/agents/get-agent-by-companyId',
            query: {
                'companyId': companyId,
            },
        });
    }
    /**
     * @param companyId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1AgentsGetAllAgentsByCompanyId(
        companyId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/agents/get-all-agents-by-companyId',
            query: {
                'companyId': companyId,
            },
        });
    }
}
