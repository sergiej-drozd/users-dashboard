describe('Users List', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display users list', () => {
    cy.get('table tbody tr').should('have.length.gt', 0);
  });

  it('should open form when clicking edit user', () => {
    cy.get('button[data-cy="edit-user"]').first().click();
    cy.get('form').should('be.visible');
  });

  it('should update user', () => {
    cy.get('button[data-cy="edit-user"]').first().click();
    cy.get('input[formControlName="name"]').clear().type('Updated Name');
    cy.get('button[type="submit"]').click();
    cy.get('table tbody tr').first().should('contain', 'Updated Name');
  });

  it('should sign out successfully', () => {
    cy.get('button[data-cy="sign-out"]').click();
    cy.url().should('include', '/login');
    cy.window().its('localStorage.authToken').should('be.undefined');
    cy.window().its('localStorage.user').should('be.undefined');
  });

  it('should show loading state while fetching users', () => {
    cy.visit('/users');
    cy.get('[data-cy="loading-spinner"]').should('exist');
    cy.get('[data-cy="loading-spinner"]').should('not.exist');
  });
});
