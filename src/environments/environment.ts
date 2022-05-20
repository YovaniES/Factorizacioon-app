// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   urlApi: 'https://localhost:3061/api/configurador/',
  //apiSeguridadUrl: 'http://localhost:3080/aut/seguridad/',
  //apiSeguridadUrl: 'http://b2bsecurityservice.indratools.com/aut/seguridad/',
  //urlApi: 'http://backsupport.indratools.com/api/configurador/',
  apiSeguridadUrl: 'http://b2bsecurityservice.indratools.com/aut/seguridad/',
  apiFiles: 'http://b2bfileservice.indratools.net/upload.php',
  apiSendEmail: 'http://b2bemailservice.indratools.net/emailService.php',
  apiReports: 'http://b2bback.indratools.com/wsconsulta/api/util/GetQuery'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
