// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  baseUrl: 'http://localhost:3000',
  auth0appDomain: 'https://mlfordummies.eu.auth0.com',
  auth0audience: 'lm-api',
  auth0ClientId: 'W3Sj3qkRSTsDHUh6C3nWDogb33I7nDNK',
  auth0ClientSecret: '3D-SmhRsZZBXNgUq1gRkhkYfTbxpE9sCr2d7_vdQ8W2EIZB63STg76TObhuEgJpl',
  auth0Connection: 'Username-Password-Authentication'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
