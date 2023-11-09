import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { path } from '../../../configenv/config.path.js';

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ApiConfigService {

    constructor(private configService: ConfigService) { }

    get jwtExpiresIn(): string | undefined {
        if (this.configService.get('API.expiresIn')) {
            return this.configService.get('API.expiresIn');
        }
        return undefined;
    }

    get mongoConnexion(): MongooseModuleOptions {
        if (this.NODE_ENV === "DEV") {
            return {
                uri: this.configService.get('DB.MONGO_URL'),
            }
        }
        else if (this.NODE_ENV === "PROD") {
            return {
                uri: this.configService.get('DB.MONGO_URL'),
            }
        } else if (this.NODE_ENV === "STAGING") {
            return {
                uri: this.configService.get('DB.MONGO_URL'),
                dbName: 'STAGING',
                sslCA: path + '/ca-certificate.crt'
            }
        } else if (this.NODE_ENV === "UAT") {
            return {
                uri: this.configService.get('DB.MONGO_URL'),
                sslCA: path + '/ca-certificate.crt'
            }
        }
    }

    get jwtSecret(): string {
        const jwt = this.configService.get('API.token_secret');
        return jwt;
    }

    get font_url(): any {
        return this.configService.get('CONFIG.FRONT_URL');
    }

    get NODE_ENV(): string {
        return this.configService.get('CONFIG.NODE_ENV');
    }
    get PORT(): number {
        return this.configService.get('CONFIG.port');
    }

}
