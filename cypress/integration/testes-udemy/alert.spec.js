/// <reference types="Cypress" />

// * Alerts Cypress -> 


describe('Work with alerts', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it.only('Alert', () => { // TODO REVER
        // cy.get('#alert').click()
        // cy.on('window:alert', message => { // cy.on pega eventos que ocorrem na tela, ou seja quando ocorrer um alert, chame esse método (que está passando uma mensagem)
        //     console.log(message)
        //     expect(message).to.be.equal('Alert Simples')

        // })

        cy.clickAlert('#alert', 'Alert Simples') // locator / message
    })

    it('Alert com Stub', () => { // TODO REVER
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })

    })

    it('Alert com Confirm', () => { // 
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples') // neste momento o Cypress interage automaticamente com o botão OK
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')       // validação da mensagem de Confirmado
        })


    })


    it('Alert com Deny(Cancelar)', () => { // 
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples') // neste momento o Cypress interage automaticamente com o botão OK
            return false                                   // essa interação faz com que o Cypress não responda automaticamente e o botão Cancelar seja interagido
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')           // validação da mensagem de Negado
        })


    })

    it('Prompt com Stub', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('50')
        })
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 50?')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    })

    it('Desafio - Validar Cadastro', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Ana claudia')
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Tavares')
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!')
        
    
    });
})
