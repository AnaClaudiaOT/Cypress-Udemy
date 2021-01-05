/// <reference types="Cypress" />

describe('Dinamic test', () => {
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {
        it(`Cadastro com comida variada ${food}`, () => {                  // colocar entre crases e fazer interpolação para identificar quais são os testes por tipo de comida

            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('qualquer')
            cy.get(`[name=formSexo][value=F]`).click()             // colocar a String entre "" e chamar o valor pela variável de userData
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

        })

    })


    // Um teste para selecionar todas as comidas // 

    it.only('Deve seleciona todos usando o each', () => {
        cy.get('#formNome').type('Usuario')
        cy.get('#formSobrenome').type('qualquer')
        cy.get(`[name=formSexo][value=F]`).click() 
                    
        // cy.get('[name=formComidaFavorita]').click({multiple:true})   // forçando a selecionar todos os elementos        
        
        cy.get('[name=formComidaFavorita]').each($el =>  {
            // $el.click() // perde quais os elementos foram selecionados
            if($el.val() != 'vegetariano')
            cy.wrap($el).click()
            
        })


        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?') // quando todos as comidas são selecionadas
    });

})


