import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgentsService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static postApiV1AgentsRegisterAgent(requestBody) {
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
    static postApiV1AgentsRegisterCompanyAgent(requestBody) {
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
    static getApiV1AgentsGetAllAgents() {
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
    static getApiV1AgentsGetAgentById(id) {
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
    static getApiV1AgentsGetAgentByCompanyId(companyId) {
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
    static getApiV1AgentsGetAllAgentsByCompanyId(companyId) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/agents/get-all-agents-by-companyId',
            query: {
                'companyId': companyId,
            },
        });
    }
}
