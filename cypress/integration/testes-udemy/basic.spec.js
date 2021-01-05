/// <reference types="Cypress" />

// * Comandos Básicos do Cypress * //

describe('Cypress Basic', () =>{
    it.only('Should visit a page and assert title', ()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.title().should('be.equal','Campo de Treinamento')
        cy.title().should('contain','Campo').debug()

        cy.title() // ganhou tempo, uma busca e 2 assertivas
            .should('be.equal','Campo de Treinamento')
            .should('contain','Campo')

            cy.title() 
            .should('be.equal','Campo de Treinamento')
            .and('contain','Campo')

            cy.title().debug()

            let syncTitle
            
            cy.title().then(title =>{
                console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title

            })

            cy.get('[data-cy=dataSobrenome]').then($el => {
                $el.val(syncTitle)
            })

            cy.get('#elementosForm\\:sugestoes').then($el => { // colocar duas barras antes dos DOIS PONTOS(:)
                cy.wrap($el).type(syncTitle)
            })

    })

    it('Should find and interact with an element',()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple').click()
        cy.get('#buttonSimple').should('have.value','Obrigado!')

        cy.get('#buttonSimple') //forma mais rapida de executar o teste
        .click()
        .should('have.value','Obrigado!')
    })
})