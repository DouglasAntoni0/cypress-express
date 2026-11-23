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

    cy.contains('main div p', 'ler um livro de node.js').should('be.visible')
  })

  it('não deve permitir tarefa duplicada', () => {

    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: { name: 'Estudar JavaScript' }

    }).then(response => {
      expect(response.status).to.eq(204)
    })

    cy.request({
      url: 'http://localhost:3333/tasks',
      method: 'POST',
      body: { name: 'Estudar JavaScript', is_done: false }
    }).then(response => {
      expect(response.status).to.eq(201)
    })

    cy.visit('http://localhost:3000')

    cy.get('#newTask').type('Estudar JavaScript')
    cy.contains('button', 'Create').click()

    cy.get('.swal2-html-container').should('be.visible').should('have.text', 'Task already exists!')

  })
})
