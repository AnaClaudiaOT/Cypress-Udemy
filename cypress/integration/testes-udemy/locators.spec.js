/// <reference types="Cypress" />

// TODO

describe('Work with basic elements', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Using Jquery Selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]').click()
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3)').click()
        cy.get("[onclick *='Francisco']").click()
        cy.get('[onclick *=\'Francisco\']').click()
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input')
    });

    it('Using Xpath', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(.,'Francisco')]/..//input[@type='text']")
        cy.xpath("//td[contains(.,'Usuario A')]/following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']").type('funciona?')
    })
})