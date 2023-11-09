import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

type JwtPayload = {
    sub: string,
    email: string,
    iat: any
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private authService: AuthService, configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('API.token_secret'),
        })
    }
    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload);
        return done(null, user, payload.iat);
    }
}
