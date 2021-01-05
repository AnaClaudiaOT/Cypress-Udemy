/// <reference types="Cypress" />

// Testar a nivel funcional //

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at a functional level', () => {
    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login('aadv@.aadv.com', 'senhaerrada')          // criado comando '.support/commands'
        cy.get(loc.MENU.HOME).click()
        // cy.resetApp()
    })



    // Criar conta //
    it('Should create an account', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: { id: 3, "nome": "Conta de teste", "visivel": true, "usuario_id": 1 }
        }).as('saveConta')


        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
                { id: 2, "nome": "Banco", "visivel": true, "usuario_id": 1 },
                { id: 3, "nome": "Conta de teste", "visivel": true, "usuario_id": 1 }
            ]
        }).as('contaSave')

        // criado comando '.support/commandsContas'
        cy.inserirConta('Conta de Teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida')

    })

    it('Should update an account', () => {
        cy.route({
            method: 'PUT',
            url: '/contas/**', // pode-se identificar qual a conta pelo id /contas/1 ou aceitar que ele busque por qualquer id que contenha a conta especificada
            response: { id: 1, "nome": "Conta de testes", "visivel": true, "usuario_id": 1 }
        })

        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()        //encontrando o elemento por xpath (colocar aspas duplas pois dentro do elemento possui aspas simples)
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta de testes')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create an account with same name', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: { "error": "Já existe uma conta com esse nome!" },
            status: 400

        }).as('saveContaMesmoNome')

        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'code 400')

    })

    it('Should create a transaction', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: { "id": 322148, "descricao": "asdasd", "envolvido": "asdasd", "observacao": null, "tipo": "REC", "data_transacao": "2020-12-15T03:00:00.000Z", "data_pagamento": "2020-12-15T03:00:00.000Z", "valor": "232.00", "status": false, "conta_id": 353709, "usuario_id": 12644, "transferencia_id": null, "parcelamento_id": null }
        })

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Conta B')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Luz')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        // criar locators e validar se a conta foi criada 
        cy.wait(1000)
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Conta B', '123')).should('exist')
    })

    it('Should get balance', () => {

        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response: {
                "conta": "Conta para saldo",
                "id": 322026,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2020-12-15T03:00:00.000Z",
                "data_pagamento": "2020-12-15T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 353713,
                "usuario_id": 12644,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response: {
                "conta": "Conta para saldo",
                "id": 322026,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2020-12-15T03:00:00.000Z",
                "data_pagamento": "2020-12-15T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 353713,
                "usuario_id": 12644,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })



        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 999,
                conta: "Carteira",
                saldo: "4034.00"
            },
            {
                conta_id: 9099,
                conta: "Banco",
                saldo: "1000000.00"

            },
            ]
        }).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')


    })

    it('Shoul remove a transaction', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('del')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    // Validando uma conta sendo enviado um dado vazio //
    it('Should validate data send to create an account', () => {
        const reqStub = cy.stub()
        cy.route({
            method: 'POST',
            url: '/contas',
            response: { id: 3, "nome": "Conta de teste", "visivel": true, "usuario_id": 1 },
            // onRequest: req => {
            //     console.log(req)
            //     expect(req.request.body.nome).to.be.empty
            //     expect(req.request.headers).to.have.property('Authorization')
            // }
            onRequest: reqStub

        }).as('saveConta')


        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
                { id: 2, "nome": "Banco", "visivel": true, "usuario_id": 1 },
                { id: 3, "nome": "Conta de teste", "visivel": true, "usuario_id": 1 }
            ]
        }).as('contaSave')

        // criado comando '.support/commandsContas'
        cy.inserirConta('{CONTROL}')
        // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
        cy.wait('@saveConta').then(()=> {
            console.log(reqStub.args[0][0])
            expect(reqStub.args[0][0].request.body.nome).to.be.empty
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida')

    })

    it('Shoul test colors', () => {

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
            {"conta":"Conta para alterar","id":322148,"descricao":"Receita paga","envolvido":"asdasd","observacao":null,"tipo":"REC","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"232.00","status":true,"conta_id":353709,"usuario_id":12644,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para movimentacoes","id":322024,"descricao":"Receita pendentes","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":353711,"usuario_id":12644,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta com movimentacao","id":322025,"descricao":"Despesa paga","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":353712,"usuario_id":12644,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":322026,"descricao":"Despesa pendente","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":353713,"usuario_id":12644,"transferencia_id":null,"parcelamento_id":null}
            ]
        })    

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')

    })

    it('Should test the responsiviness', () => {
        cy.get('[data-test=menu-home]').should('exist')
            .and('be.visible')
            cy.viewport(500, 700)
            cy.get('[data-test=menu-home]').should('exist')
            .and('be.not.visible')
            cy.viewport('iphone-5')
            cy.get('[data-test=menu-home]').should('exist')
            .and('be.not.visible')
            cy.viewport('ipad-2')
            cy.get('[data-test=menu-home]').should('exist')
            .and('be.visible')

    })



})