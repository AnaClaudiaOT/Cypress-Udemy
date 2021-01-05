/// <reference types="Cypress" />

// * Tipos de Esperas (TimeOut) Cypress * //

describe('Esperas...', () =>{

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() =>{
        cy.reload()
    })

    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it('Retrys', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
        .should('exist')
        .type('funciona')
    })

    it('Uso do Find', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
        .find('span')
        .should('contain','Item 1')

        // cy.get('#lista li')          NÃO ENCONTRA O ELEMENTO 2, POIS CONTINUA BUSCANDO O ITEM 1
        // .find('span')
        // .should('contain','Item 2')

        cy.get('#lista li span')
        .should('contain','Item 2')
    })

    it.only('Uso do Timeout', ()=>{
        // // cy.get('#buttonDelay').click()
        // // cy.get('#novoCampo', { timeout: 1000 }).should('exist')

        // cy.get('#buttonListDOM').click()    
        // // cy.wait(5000) // espera fixa

        // cy.get('#lista li span', {timeout: 30000})
        // .should('contain','Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span',)
        .should('have.length', 1)
   
        cy.get('#lista li span',)
        .should('have.length', 2)   
  
    })

    it.only('Uso do Timeout', ()=>{
        cy.get('#buttonCount')
        .click()
        .click()
        .should('have.value', '111')

  
    })

    
})