/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  const mockUser = {
    id: '1',
    name: 'admin',
    role: 'admin',
    password: 'test1',
  };

  localStorage.setItem('authToken', 'fake-jwt-token');
  localStorage.setItem('backendAuthToken', 'fake-jwt-token');
  localStorage.setItem('user', JSON.stringify(mockUser));

  cy.visit('/');
});
