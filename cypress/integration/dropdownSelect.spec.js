/ <reference types="cypress" />


// context('testing get requests', () => {
//     beforeEach(() => {
//       cy.visit('http://localhost:3000')
//     })
   
  
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