describe('User access an invalid path', () => {
  it('passes', () => {
    cy.visit('some_invalid_path')
    cy.contains('Page Not Found')
  })
})