describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should show validation errors with empty fields', () => {
    cy.get('input[formControlName="username"]').should(
      'have.class',
      'ng-invalid'
    );
    cy.get('input[formControlName="password"]').should(
      'have.class',
      'ng-invalid'
    );
  });

  it('should show error message with invalid credentials', () => {
    cy.get('input[formControlName="username"]').type('wronguser');
    cy.get('input[formControlName="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('.text-red-500').should('be.visible');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[formControlName="username"]').type('admin');
    cy.get('input[formControlName="password"]').type('test1');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/users');
  });

  it('should show loading state while logging in', () => {
    cy.get('input[formControlName="username"]').type('admin');
    cy.get('input[formControlName="password"]').type('test1');
    cy.get('button[type="submit"]').click();
    cy.get('svg.animate-spin').should('be.visible');
  });
});
