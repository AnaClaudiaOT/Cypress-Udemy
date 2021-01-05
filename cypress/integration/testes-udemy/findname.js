/// <reference types="Cypress" />

describe("Google Search", function () {

    it("Search Ana Cláudia Tavares", function () {
        cy.visit('http://www.google.com')
        cy.get('.gLFyf')
            .type('Ana Cláudia Tavares - Analista de Testes').debug()
            .type('{enter}')
        cy.contains('Ana Cláudia Tavares - Analista de Testes - Grupo GFT')
    })
})