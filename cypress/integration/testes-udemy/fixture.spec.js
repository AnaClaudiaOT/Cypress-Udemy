/// <reference types="Cypress" />

// Dados de um arquivo externo - cypress/fixtures/userData.json//

describe('Fixtures tests', () => {
    it('Get data from a fixture file', function() {                                       // o usuario procura dentro do this -  quando utiliza o this ele não identifica a arrow function como função
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.fixture('userData').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()             // colocar a String entre "" e chamar o valor pela variável de userData
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    })
})