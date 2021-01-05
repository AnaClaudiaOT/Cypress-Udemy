/// <reference types="Cypress" />

// * Estrutura Básica Cypress -> Describe -> It * //

it('A external test...', () => {

})

describe('Should group test...', () => {
    describe('Should groupe more specific tests...', () => {

        it.skip('A specific test...', () => {

        })
        
    })

    describe('Should groupe more specific tests...2', () => {

        it('A specific test...', () => {

        })
        
    })


    it('A internal test...', () => {

    })

})   