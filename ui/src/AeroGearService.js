/* eslint-disable no-console */
import { PushRegistration } from "@aerogear/push"
import { ConfigurationService } from "@aerogear/core";
import { init } from "@aerogear/app";
import {
    createClient
} from '@aerogear/voyager-client';
import gql from 'graphql-tag';

class AeroGearService {


    constructor() {
        const validConfig ={
            "version": 1,
            "namespace": "devnexus-mobile",
            "clientId": "devnexus-client",
            "services": [
                {
                    "id": "push",
                    "name": "push",
                    "type": "push",
                    "url": "http://localhost:9999/",
                    "config": {
                      "web_push": {
                        "variantId": "F85A9650-1FC1-4240-A6D6-D8E1052598D8",
                        "variantSecret": "E37A1C22-046A-4DC4-AFBD-B4A745F466D1",
                        "appServerKey": "BIk8YK3iWC3BfMt3GLEghzY4v5GwaZsTWKxDKm-FZry3Nx2E_q-4VW3501DkQ5TX1Pe7c3yIsajUk9hQAo3sT-0"
                      }
                    }
                  }
            ]
        };
        this.register = this.register.bind(this);

        const config = new ConfigurationService(validConfig);        
    }

    async register() {
        const registration = new PushRegistrationWebpushImpl(config);
        await registration.register();
    }


}

export default new AeroGearService();