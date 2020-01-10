describe('Login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Sy Nguyen',
      username: 'sparrow',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blog List')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('Log in')
        .click()
      cy.get('#username')
        .type('sparrow')
      cy.get('#password')
        .type('123456')
      cy.contains('Login')
        .click()
    })

    it('name of the user is shown', function() {
      cy.contains('Logined with Sy Nguyen')
    })

    it('a new blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('A blog created by cypress')
      cy.get('#author')
        .type('Cypress')
      cy.get('#url')
        .type('https://www.cypress.io/')
      cy.contains('Create')
        .click()
      cy.contains('A blog created by cypress')
    })
  })
})