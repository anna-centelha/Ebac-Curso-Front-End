describe('Funcionalidades principais da Agenda de Contatos', () => {
  
  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/')
  })


 it('Carrega a interface inicial corretamente', () => {
    cy.get('input').should('have.length', 3)
    cy.get('.adicionar').should('exist')
    cy.screenshot('tela-principal')
  })


  it('Permite adicionar um novo contato', () => {
    const nome = 'Lucas Andrade'
    const email = 'lucas.andrade@teste.com'
    const telefone = '(11) 91111-1111'

    cy.get('input[type="text"]').type(nome)
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="tel"]').type(telefone)
    cy.get('.adicionar').click()

    cy.contains(nome).should('exist')
    cy.contains(email).should('exist')
    cy.contains(telefone).should('exist')

    cy.screenshot('contato-adicionado')
  })


it('Permite editar um contato já cadastrado', () => {
    const novoNome = 'Lucas Editado'
    const novoEmail = 'lucas.editado@teste.com'
    const novoTelefone = '(22) 92222-2222'

    cy.get('.contato').contains('Lucas Andrade')
      .parents('.contato')
      .find('.edit')
      .click()

    cy.get('input[type="text"]').clear().type(novoNome)
    cy.get('input[type="email"]').clear().type(novoEmail)
    cy.get('input[type="tel"]').clear().type(novoTelefone)

    cy.get('.alterar').click()

    cy.contains(novoNome).should('exist')
    cy.contains(novoEmail).should('exist')
    cy.contains(novoTelefone).should('exist')

    cy.screenshot('contato-editado')
  })


    it('Permite excluir um contato da lista', () => {
    cy.get('.contato').contains('Lucas Editado')
      .parents('.contato')
      .find('.delete')
      .click()

    cy.contains('Lucas Editado').should('not.exist')
    cy.screenshot('contato-removido')
  })

})