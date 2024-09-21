/*
    - Deve validar um usuário já cadastrado e emitir mensagem 
        - Quando usuário informar todos os dados
        - E as validações não estiverem de acordo com a funcionalidade
        - Ao clicar em criar uma nova conta
        - Então o usuário não deverá ser cadastrado
        - E uma mensagem de erro deverá ser apresentada
*/

import { faker } from '@faker-js/faker';

describe('Suíte de Testes Magento - Com uso de biblioteca faker.', () => {

    //gerar dados randomicos
    const primeiroNome = faker.person.firstName()
    const sobrenome = faker.person.lastName()
    const email = faker.internet.email()
    const senha = faker.internet.password()

    beforeEach(() => {
        cy.visit('http://magento2-demo.magebit.com')
    })

    it('Quando usuário casdastrar um novo registro com todos os campos preenchidos corretamente, então o registro deverá ser cadastrado.', () => {
        cy.contains('Create an Account').first().click()
        cy.url().should('eq', 'https://magento2-demo.magebit.com/customer/account/create/')

        //Inserir valores nos campos
        cy.get('#firstname').type(primeiroNome)
        cy.get('#lastname').type(sobrenome)
        cy.get('#email_address').type(email)
        cy.get('#password').type(senha)
        cy.get('#password-confirmation').type(senha)

        //clicar em criar conta
        cy.get('button[title="Create an Account"]').click()

        //validar mensagem de sucesso
        cy.get('.message-success').should('contain', 'Thank you for registering with Main Website Store.')
    })

    it('Validando duplicidade de usuário. Deve retornar uma mensagem de erro.', () => {
        cy.contains('Create an Account').first().click()
        cy.url().should('eq', 'https://magento2-demo.magebit.com/customer/account/create/')

        //Inserir valores nos campos
        cy.get('#firstname').type(primeiroNome)
        cy.get('#lastname').type(sobrenome)
        cy.get('#email_address').type(email)
        cy.get('#password').type(senha)
        cy.get('#password-confirmation').type(senha)

        //clicar em criar conta
        cy.get('button[title="Create an Account"]').click()

        //validar mensagem de sucesso
        cy.get('.message-error').should('contain', 'There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.')
    })
})
