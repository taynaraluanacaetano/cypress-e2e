import { faker } from '@faker-js/faker';

Cypress.Commands.add('createAccount', () => {

    //visitar a página de cadastro
    cy.visit('https://magento2-demo.magebit.com/customer/account/create/')

    //gerar dados randomicos
    const primeiroNome = faker.person.firstName()
    const sobrenome = faker.person.lastName()
    const email = faker.internet.email()
    const senha = faker.internet.password()

    //preencher os dados para cadastro
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


