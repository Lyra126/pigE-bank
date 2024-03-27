describe('Fail Login', () => {
  it('Prove that logging in with a user that isn\'t in the database fails', () => {
    cy.visit('http://localhost:3000/');

    cy.contains("Login").click();
    cy.url().should('include', "/login")
    
    cy.get('.form-control[type="email"]').type('thisDoesntExist@gmail.com');
    cy.get('.form-control[type="password"]').type('notReal');

    cy.contains("Login").click();
    cy.contains("Login failed. Invalid email or password.").should('be.visible');
  })
})

describe('Login Sucess', () => {
  it('logging in with an existing user should redirect the user to the dashboard and add a user cookie', () => {
    cy.visit('http://localhost:3000/');

    cy.contains("Login").click();
    cy.url().should('include', "/login")
    
    cy.get('.form-control[type="email"]').type('huffandpuff@threepigs.edu');
    cy.get('.form-control[type="password"]').type('Refrence1!');

    cy.contains("Login").click();
    cy.url().should('include', "/dashboard");
  })
})

/*
describe('Create Account', () => {
  it('Checks backend to see that account is successfully created, user cookie created, and redirected to dashboard', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('Create Account').click();
    cy.url().should('include', '/createAccount');

    cy.get('.form-control[placeholder="Enter your first name"]').type('testName');
    cy.get('.form-control[placeholder="Enter your last name"]').type('testLast');

    cy.get('.form-control[placeholder="Enter your email"]').type('test@cypress.com');
    cy.get('.form-control[placeholder="Enter Username"]').type('testUsername');
    cy.get('[type="password"]').eq(0).type('Testpassword1!');
    cy.get('[type="password"]').eq(1).type('Testpassword1!');


    cy.contains('Create Account').click();


  })
})
*/


