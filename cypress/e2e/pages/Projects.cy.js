describe('Projects', () => {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.wait(500)
    })
  
    it(`should check if user can create a project and see it on the list after`, () => {
      cy.get('[data-cy-create-project-btn]').click()
      cy.get('[data-cy-name-input]').type('My Patio16')
      cy.get('[data-cy-save-project-btn]').click()

      cy.contains('My Patio16')
    })

    it(`should check if user can create and delete the same project after`, () => {
      cy.get('[data-cy-create-project-btn]').click()
      cy.get('[data-cy-name-input]').type('patio17')
      cy.get('[data-cy-save-project-btn]').click()

      cy.contains('patio17')
      cy.get('[data-cy="delete-btn-patio17"]').click()
      cy.get('#__nuxt').should('not.contain', 'patio17')
    })
  })