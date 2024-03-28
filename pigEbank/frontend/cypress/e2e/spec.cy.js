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
  it('logging in with all existing users should redirect the user to the dashboard and add a user cookie', async () => {
    cy.visit('http://localhost:3000/');
    
    let accobj;
    
    await cy.request('GET', 'http://localhost:8080/accounts').then(response => {
      accobj = response.body;
      console.log('this is response body');
      console.log(response.body);
    });

       
    accobj.forEach( account => {
      if(account.email != null){
        cy.contains("Login").click();
        cy.url().should('include', "/login");

        cy.get('.form-control[type="email"]').type(account.email);
        cy.get('.form-control[type="password"]').type(account.password);

        cy.contains("Login").click();
        cy.url().should('include', "/dashboard");

      

        cy.getCookie('username').then( cookie => {
          if(cookie) {
            expect(cookie.value).to.eq(account.username);
          } else {
            console.log('failed to get ' + account.username + ' username cookie');
          }
        });

        cy.getCookie('email').then( cookie => {
          if(cookie) {
            expect(cookie.value).to.eq(account.email);
          } else {
            console.log('failed to get ' + account.username + ' email cookie');
          }
        })

        cy.contains('Log Out').click();
      } else {
        console.log('account with null email skipped');
      }

    });
      

  });
});

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


describe('Create New Goal', () => {
  it('After login, can the user make a pig', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('.form-control[type="email"]').type('huffandpuff@threepigs.edu');
    cy.get('.form-control[type="password"]').type('Refrence1!');

    cy.contains("Login").click();
    cy.url().should('include', "/dashboard");

    cy.get('[href="/createNewGoal"]').eq(0).click();
    cy.url().should('include', "/createNewGoal");
    
  
  })
})


*/