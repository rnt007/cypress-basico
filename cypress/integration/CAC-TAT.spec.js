/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        // antes de cada teste, roda esta funcao
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').should('be.visible').type('Patricia').should('have.value', 'Patricia')
        cy.get('#lastName').should('be.visible').type('Possari').should('have.value', 'Possari')
        cy.get('#email').should('be.visible').type('patricia.possari@teste.com').should('have.value', 'patricia.possari@teste.com')
        cy.get('#open-text-area').should('be.visible').type('Teste de envio').should('have.value', 'Teste de envio')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })


    it('EXTRA1 - preenche os campos obrigatórios e envia o formulário', function () {
        const longText = "Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi."
        cy.get('#firstName').type('Patricia').should('have.value', 'Patricia')
        cy.get('#lastName').type('Possari').should('have.value', 'Possari')
        cy.get('#email').type('patricia.possari@teste.com').should('have.value', 'patricia.possari@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }).should('have.value',longText)
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('EXTRA 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Possari')
        cy.get('#email').type('patricia.possari_teste.com')
        cy.get('#open-text-area').type("Texto de teste")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('EXTRA3 - campo de telefone, validar que, se um valor não-numérico for digitado, seu valor continuará vazio', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Possari')
        cy.get('#email').type('patricia.possari_teste.com')
        cy.get('#phone').type('abcdef').should('have.value', '')
        cy.get('#open-text-area').type("Texto de teste")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('EXTRA4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulár', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Possari')
        cy.get('#email').type('patricia.possari@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Texto de teste")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('EXTRA5 - preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Possari')
        cy.get('#email').type('patricia.possari@teste.com')
        cy.get('#phone').should('be.visible').type('47988556644').should('have.value', '47988556644')
        cy.get('#open-text-area').type("Texto de teste")
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.get('#firstName').clear()
        cy.get('#lastName').clear()
        cy.get('#email').clear()
        cy.get('#phone').clear()
        cy.get('#open-text-area').clear()
    })

    it('EXTRA6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('EXTRA7 - envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('EXTRA8 - uso do contains', function () {
        cy.contains( 'button', 'Enviar')
        
    })

//********************** Aula 03 **********************\\
it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('select').select('YouTube').should('have.value','youtube')
    
})

it('EXTRA 1 - seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('select').select('mentoria').should('have.value','mentoria')
    
})

it.only('EXTRA 2 - seleciona um produto (Blog) por seu índice', function () {
    cy.get('select').select(1).should('have.value','blog')
    
})


})
