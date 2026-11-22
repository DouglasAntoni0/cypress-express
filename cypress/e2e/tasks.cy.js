import { faker } from '@faker-js/faker'

describe('tarefas', () => {
  it('deve cadastras uma nova tarefa', () => {

    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: { name: 'ler um livro de node.js' }

    }).then(response => {
      expect(response.status).to.eq(204)
    })

    cy.visit('http://localhost:3000')

    cy.get('#newTask').type('ler um livro de node.js')
    cy.contains('button', 'Create').click()
  })
})
