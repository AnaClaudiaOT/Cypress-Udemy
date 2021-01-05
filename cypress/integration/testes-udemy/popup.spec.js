/// <reference types="Cypress" />

// * Interagindo com IFrame -> 


describe('Work with Popups', () => {

    it('Deve testar Popup diretamente', () => {
        cy.visit('https://www.wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })

    });

    it('Deve verificar se o popup foi invocado - através de Mocks', () => { // TODO
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })

        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')

    });

    describe.only('Work with Links - Popups', () => {

        beforeEach(() => {
            cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        })

        it('Check popup URL', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://www.wcaquino.me/cypress/frame.html')
        });

        it('Should access popup dinamically', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })

        });

        it('Should force link on same page', () => { // forçar para que não abra outra página, que execute o teste na mesma página
            cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            .click()
            cy.get('#tfield').type('funciona')
        });



    })

})

