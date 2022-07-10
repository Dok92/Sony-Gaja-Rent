describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/') // change URL to match your dev URL
  })
})

describe('logs in', () => {
  it('using UI', () => {
    cy.visit('http://localhost:3000/')

    // enter valid username and password
    cy.get('[name=email]').type(Cypress.env('email'))
    cy.get('[name=password]').type(Cypress.env('password'))
    cy.contains('button', 'Prijavi se').click().then(() => {
      cy.get('*[class^="ps5-btn ps5-btn-mono ps5-btn-lg focus ps5-home-btn"]').click()
    })
  })
})


