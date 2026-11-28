import { faker } from '@faker-js/faker'

describe('tarefas', () => {
  context('cadastro', () => {
    it('deve cadastras uma nova tarefa', () => {
      const taskName = 'ler um livro de node.js'

      cy.removeTaskByName(taskName)

      cy.createTask(taskName)

      cy.contains('main div p', taskName).should('be.visible')
    })

    it('não deve permitir tarefa duplicada', () => {
      const task = {
        name: 'Estudar JavaScript',
        is_done: false
      }

      cy.removeTaskByName(task.name)
      cy.postTask(task)

      cy.createTask(task.name)

      cy.get('.swal2-html-container').should('be.visible').should('have.text', 'Task already exists!')
    })

    it('campo obrigatorio', () => {
      cy.createTask()

      cy.isRequired('This is a required field')
    })
  })

  context('atualização', () => {
    it('deve concluir uma tarefa', () => {
      const task = {
        name: 'Pagar algumas contas',
        is_done: false
      }

      cy.removeTaskByName(task.name)
      cy.postTask(task)

      cy.visit('http://localhost:3000')
      cy.contains('p', task.name).parent().find('button[class*=ItemToggle]').click()

      cy.contains('p', task.name).should('have.css', 'text-decoration-line', 'line-through')
    })
  })
})
