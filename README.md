# QA Automation Technical Test

This project is a full-stack test automation suite for a sample web application using Cypress. It includes:

- Frontend UI tests (Login, Registration, Accessibility)
- Backend API tests (User and Shift management)
- Allure reporting
- Cross-browser execution (Chrome, Edge, Firefox)
- Page Object Model (POM) structure

### 🧪 Accessibility Testing (Axe-core with Cypress)

Accessibility testing is implemented using Cypress and the axe-core plugin.

- The test scans the **registration form** for violations using `cy.injectAxe()` and `cy.checkA11y()`.
- It currently targets only **'critical' impact issues** to ensure fast, focused feedback during CI runs.
- This includes blockers such as missing labels, invalid ARIA roles, or elements with no accessible name.
- In a production environment, the scope would be expanded to include `'serious'` and `'moderate'` impacts.
- Doing so would surface additional WCAG violations like **poor colour contrast**, **tab order issues**, and **missing semantic HTML structure**.
- This approach balances test coverage with pipeline performance, avoiding unnecessary noise from low-impact findings.

---

## ✅ All Tests Passed

This project uses Cypress with Allure Reporting to validate both frontend and backend functionality.

![Allure Report - 100% Passed](./assets/allure-report.png)

- **Total Tests:** 24  
- **Passed:** 24  
- **Failed:** 0  
- **Suites Covered:**  
  - User Login  
  - User Registration  
  - Shift Management  
  - Backend API Tests  
  - Accessibility Testing (Axe-core)  
- **Cross-browser tested:** Chrome, Edge, Firefox  
- **Reporting Tool:** Allure

---

## 📁 Folder Structure

```bash
cypress/
├── e2e/
│   ├── Backend-API-Tests/
│   │   └── apiTest.cy.js
│   ├── Frontend-UI-Tests/
│   │   ├── accessibility/
│   │   │   └── accessibilityTest.cy.js
│   │   ├── auth/
│   │   │   ├── login.test.cy.js
│   │   │   └── registration.test.cy.js
│   │   └── shifts/
│   │       └── shift-management.test.cy.js
│   ├── fixtures/
│   │   └── loginUsers.json
│   └── support/
│       ├── pageObjects/
│       │   ├── LoginPage.js
│       │   ├── RegisterPage.js
│       │   └── ShiftPage.js
│       └── utils/
│           ├── commands.js
│           ├── e2e.js
│           └── environs.js
```

## 🚀 How to Run Tests

### 1. Install Dependencies

```bash
npm install
```
### 2. Run All Tests with Allure Reporting

```bash
npm run cypress:test:allure
```
### 3. View Allure Report

```bash
npm run cypress:report
```
### 4. Cross-Browser Testing

```bash
npm run cypress:test:chrome
npm run cypress:test:edge
npm run cypress:test:firefox
```

---

## 📊 Coverage Report (Static Badge)

![Test Coverage](https://img.shields.io/badge/Test--Run-24%20passed-brightgreen)
![Allure Report](https://img.shields.io/badge/Allure-Report-blueviolet)

---

## 🧪 Tools & Libraries

- [Cypress](https://www.cypress.io/)
- [Allure Reports](https://docs.qameta.io/allure/)
- [Axe-Core Accessibility](https://github.com/dequelabs/axe-core)
- [Cypress Real Events](https://github.com/dmtrKovalenko/cypress-real-events)

---

## 👤 Author

Akan Antia  
📧 [akan_antia@live.co.uk]  
🔗 