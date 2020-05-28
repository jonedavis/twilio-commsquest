// type definitions for Cypress object "cy"
// eslint-disable-next-line
/// <reference types="cypress" />

// check this file using TypeScript if available
// @ts-check

describe('/', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('contains input field', () => {
    cy.get('#txtPhoneNumber').should('exist');
  });

  it('gets an access token', () => {
    cy.get('#txtPhoneNumber').type('15555555555');
    cy.server();
    cy.route('GET', '/token/15555555555', 'fixture:token.json').as('token');
    cy.get('#btnStart').click();

    cy.wait('@token').then(xhr => {
      assert.equal(
        xhr.response.body.identity,
        '15555555555',
        'Equals Identity'
      );
      assert.isNotNull(xhr.response.body.token, 'Contains Access Token');
    });
  });
});
