/// <reference types="Cypress" />

describe("Teste de Cálculo", function () {
    function somaInteiros(param1, param2) {
        let result = param1 + param2
        return result
    }
    it("Soma de Inteiros", function() {
        expect(somaInteiros(2, 5)).to.eq(7)
    })

    it("Soma de inteiros (FAIL)", function () {
        expect(somaInteiros(2, 5)).to.eq(7)
    })

})