import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://keycloak.192.168.49.2.nip.io',
  realm: 'tjo',
  clientId: 'tjo-app',
});

export default keycloak;
