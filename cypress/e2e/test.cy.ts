describe('Hotel reservation Test', () => {
  it('visita la raíz del sitio', () => {
    cy.visit('/')
    cy.contains('label', 'Tipo de cliente:')
  })
  it('puede filtrar hoteles', () => {
    cy.visit('/')
    cy.contains('button', '+').click()
    cy.get('#hotelsFiltering')
  })
  it('puede cargar todos los hoteles', () => {
    cy.visit('/')
    cy.get('#hotels')
  })
})

