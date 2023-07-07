import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy, OIDCStrategy } from 'passport-azure-ad';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  // BearerStrategy,
  OIDCStrategy,
  'azure-ad',
) {
  constructor(configService: ConfigService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${configService.get(
        'azure.tenantId',
      )}/v2.0/.well-known/openid-configuration`,
      clientID: configService.get('azure.clientId'),
      responseType: 'id_token',
      responseMode: 'form_post',
      allowHttpForRedirectUrl: true,
      redirectUrl: configService.get('azure.redirectUrl'),
    });
  }

  async validate(data) {
    // console.log(data);
    throw new UnauthorizedException();

    return data;
  }
}
