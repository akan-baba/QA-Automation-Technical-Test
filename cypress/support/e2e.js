
// Import commands.js using ES2015 syntax:
import './commands'

import 'cypress-plugin-api'
require('cypress-plugin-api')

import '@shelex/cypress-allure-plugin';
require('@shelex/cypress-allure-plugin');

import 'cypress-axe'

import '@cypress/code-coverage/support'

// Hide fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
const style = app.document.createElement('style');
style.innerHTML =
'.command-name-request, .command-name-xhr { display: none }';
style.setAttribute('data-hide-command-log-request', '');
app.document.head.appendChild(style);
}