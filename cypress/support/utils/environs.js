
export class Environment {
  static getBaseUrl(type = 'ui') {
    const env = Cypress.env('ENV') || 'qa'; // fallback to qa
    let baseUrl;

    switch (env) {
      case 'preprod':
        baseUrl = type === 'api'
          ? 'http://preprod.example.com/api'
          : 'http://preprod.example.com/';
        break;
      case 'prod':
        baseUrl = type === 'api'
          ? 'https://prod.example.com/api'
          : 'https://prod.example.com/';
        break;
      case 'qa':
      default:
        baseUrl = type === 'api'
          ? 'http://localhost:8000/api'
          : 'http://localhost:3000/';
        break;
    }

    console.log(`${type.toUpperCase()} Base URL:`, baseUrl);
    return baseUrl;
  }
}
