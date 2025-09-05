import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SystemSetupService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    static postApiSetupsInitialSetup() {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setups/initial-setup',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    static postApiSetupsSetupCountries() {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setups/Setup-countries',
        });
    }
}
