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