import { faker } from '@faker-js/faker'

describe('tarefas', () => {
  it('deve cadastras uma nova tarefa', () => {
    cy.visit('http://localhost:3000')

    cy.get('#newTask').type(faker.music.songName())
    cy.contains('button', 'Create').click()
  })
})
