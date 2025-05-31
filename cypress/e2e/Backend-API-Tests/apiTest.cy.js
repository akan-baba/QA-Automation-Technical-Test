import { Environment } from "../../support/utils/environs"; // Import environment config helper
import { faker } from '@faker-js/faker'; // Import faker for random user data
import 'cypress-plugin-api'; // Import Cypress plugin for API testing

// Set the base URL for API from environment config
const apiBaseUrl = Environment.getBaseUrl('api');

// Generate dynamic test data using faker
const name = faker.person.fullName();
const email = faker.internet.email();

describe('API Tests', () => {

  //TC01: Register a user successfully via API
  it('TC01 - User can register via API', () => {
    cy.api({
      method: 'POST',
      url: `${apiBaseUrl}/user/register`, // Endpoint to register a new user
      body: {
        name: name,    // Use dynamically generated name
        email: email,  // Use dynamically generated email
        password: "StrongPass123!"  // Valid strong password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);   // Assert successful registration
      expect(response.body).to.have.property('user'); // Response should include 'user' object
    });
  });

  // TC02: Log in with correct credentials
  it('TC02 - User can log in with valid credentials', () => {
    cy.api({
      method: 'POST',
      url: `${apiBaseUrl}/user/login`, // Login endpoint
      body: {
        email: "john@example.com",  // Registered user
        password: "StrongPass123!"  // Correct password
      },
      failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status
    }).then((response) => {
      expect(response.status).to.eq(200);  // Expect successful login
      expect(response.body).to.have.property('token'); // Should return token
      expect(response.body.user).to.have.property('email', 'john@example.com'); // Validate correct user returned
    });
  });

  //TC03: Login fails with wrong password
  it('TC03 - Login fails with invalid password', () => {
    cy.api({
      method: 'POST',
      url: `${apiBaseUrl}/user/login`, // Login endpoint
      body: {
        email: "john@example.com",  // Registered email
        password: "WrongPassword123" // Incorrect password
      },
      failOnStatusCode: false // Needed to manually assert failure
    }).then((response) => {
      expect(response.status).to.eq(400); // 400 = validation/auth error
      expect(response.body).to.have.property('message', 'Invalid credentials'); // Assert correct error message
    });
  });

  it('TC04 - Adds a new shift with valid title and description', () => {
    // Step 1: Log in to get auth token
    cy.api({
      method: 'POST',
      url: `${apiBaseUrl}/user/login`,
      body: {
        email: "john@example.com",
        password: "StrongPass123!"
      }
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      const token = loginResponse.body.token;

      // Step 2: Add a new shift using the token
      cy.api({
        method: 'POST',
        url: `${apiBaseUrl}/shift/addShift`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "Night Shift",
          description: "10pm to 6am in Zone A"
        }
      }).then((shiftResponse) => {
        expect(shiftResponse.status).to.eq(200);
        expect(shiftResponse.body).to.have.property('message'); // Confirm successful message
      });
    });
  });
  it('TC05 - Retrieves all shifts for the authenticated user and validates schema', () => {
    // Step 1: Login and retrieve token
    cy.request('POST', `${apiBaseUrl}/user/login`, {
      email: "john@example.com",
      password: "StrongPass123!"
    }).then((loginResponse) => {
      const token = loginResponse.body.token;
  
      // Step 2: Fetch shifts with token
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/shift/getShift`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((shiftResponse) => {
        // Validate response status
        expect(shiftResponse.status).to.eq(200);
  
        // Validate body is an array
        expect(shiftResponse.body).to.be.an('array');
  
        // Validate shape of first shift object if present
        if (shiftResponse.body.length > 0) {
          expect(shiftResponse.body[0]).to.include.all.keys(
            '_id',
            'title',
            'description',
            'completed',
            'createdAt',
            'updatedAt'
          );
        }
      });
    });
  });
  
  it('TC06 - Deletes a shift by ID', () => {
    // Step 1: Login and get token
    cy.request('POST', `${apiBaseUrl}/user/login`, {
      email: "john@example.com",
      password: "StrongPass123!"
    }).then((loginResponse) => {
      const token = loginResponse.body.token;
  
      // Step 2: Get existing shifts
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/shift/getShift`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((getShiftResponse) => {
        const shifts = getShiftResponse.body;
  
        expect(shifts).to.be.an('array');
  
        if (shifts.length > 0) {
          const shiftIdToDelete = shifts[0]._id;
  
          // Step 3: Delete that shift
          cy.request({
            method: 'GET', // As required by your API
            url: `${apiBaseUrl}/shift/removeShift?id=${shiftIdToDelete}`,
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(200);
            // Optionally check response body if any
          });
        } else {
          throw new Error("No shifts available to delete.");
        }
      });
    });
  });
  

});
