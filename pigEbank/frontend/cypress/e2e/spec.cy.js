describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('http://localhost:3000/');

    cy.contains("Login").click();
    cy.url().should('include', "/login")
    cy.get('email').type('thisDoesntExist@gmail.com');
    cy.get('password').type('notReal');
  })
})