/ <reference types="cypress" />


// context('testing get requests', () => {
//     beforeEach(() => {
//       cy.visit('http://localhost:3000')
//     })

//check to see if page loads properly

it ('checks if the page is loading main title',()=>{
  cy.visit('http://localhost:3000')
  cy.contains("Study Buddy")
})
  
//checks to see if we have an add new resources section
it ('checks to see if we have an add new resources section', ()=>{
  cy.visit('http://localhost:3000')
  cy.contains("Add new resource")
})

it('checks if we can select user from dropdown menu', () => {
      
  cy.visit('http://localhost:3000')

  cy.get('button').eq(0).click()

 
  cy
  .get('li').eq(5)
  .should('have.text', 'Tiff').click()
   cy.contains("Current User is Tiff")
})

it('checks if we get back the correct error code for a wrong entry', () => {
      
  cy.visit('http://localhost:3000')

  cy.get('button').eq(0).click()

  cy.get('li').eq(5).should('have.text', 'Tiff').click()
  cy.get('input').eq(0).type('cypress test')
  cy.get('input').eq(1).type('A.Guy')
  cy.get('input').eq(3).type('Build Stage 1')
  cy.get('textarea').eq(1).type('testing our error codes')
  cy.get('button').eq(3).click()

  cy.intercept('POST', 'https://study-resource-catalog-backend.herokuapp.com/resource').as('postResource')
  cy.wait('@postResource').then(({response}) => {
    expect(response.statusCode).to.eq(500)
    //expect(response.body.resource_name).to.eq('thetitle')
  })

  // Cypress.on('window:before:load', (win) => {
  //   cy.spy(win.console, 'error');
  //   cy.spy(win.console, 'warn');
  // });
  
  // afterEach(() => {
  //   cy.window().then((win) => {
  //     expect(win.console.error).to.have.callCount(0);
  //     expect(win.console.warn).to.have.callCount(0);
  //   });
  //});
  

})
  
it('checks if dropdown user is not empty', () => {
      
    // Listen to GET to /users
    //cy.intercept('GET', '/users').as('getUser')
    cy.visit('http://localhost:3000')

    //cy.wait('@getUser').its('response.body').should('have.property', 'status', 200)

    cy.get('button').eq(0).click()
    
    cy.get('li').should('have.length.greaterThan', 3)
  })
  it('checks if dropdown tags is not empty', () => {
    
    // Listen to GET to /users
    //cy.intercept('GET', '/users').as('getUser')
    cy.visit('http://localhost:3000')

    //cy.wait('@getUser').its('response.body').should('have.property', 'status', 200)

    cy.get('button').eq(2).click()
    cy.get('ul').should('have.length.greaterThan', 3)
  })
  it('checks if dropdown content-type is not empty', () => {
    
    // Listen to GET to /users
    //cy.intercept('GET', '/users').as('getUser')
    cy.visit('http://localhost:3000')

    //cy.wait('@getUser').its('response.body').should('have.property', 'status', 200)

    cy.get('button').eq(4).click()
    cy.get('ul').should('have.length.greaterThan', 3)
  })