# Cypress eXpress · Automação E2E do Mark L

**Douglas Antonio · Projeto de portfólio em automação de testes web**

Neste projeto, construo uma suíte Cypress para o **Mark L**, um gerenciador de tarefas web. Nesta etapa, extraí comandos customizados para reaproveitar ações de interface e chamadas à API, validei o campo obrigatório no formulário e adicionei o fluxo de conclusão de tarefas.

**Stack** · JavaScript · Cypress 16 · Node.js · Yarn 4

## Como apliquei QA neste projeto

- **Controlei o estado inicial pela API.** Os cenários que dependem de registros prévios usam `cy.removeTaskByName()` (`DELETE /helper/tasks` com `204 No Content`) e `cy.postTask()` (`POST /tasks` com `201 Created`) para limpar resíduos e preparar tarefas pendentes antes de abrir o navegador, com títulos distintos por caso.
- **Centralizei ações recorrentes em Custom Commands.** Extraí em [commands.js](cypress/support/commands.js) os comandos `createTask`, `isRequired`, `removeTaskByName` e `postTask`, reduzindo repetição na spec e concentrando seletores como `#newTask` (com alias `@inputTask`) em um único ponto.
- **Validei restrições nativas e regras de negócio no cadastro.** Além de conferir o alerta `Task already exists!` ao repetir um título já cadastrado pela API, exercito o envio vazio e leio a propriedade nativa `validationMessage` do campo para confirmar `This is a required field`.
- **Verifiquei a conclusão da tarefa pela interface.** Após preparar uma tarefa pendente pela API, localizo o item na lista pelo texto, aciono o botão de alternância (`button[class*=ItemToggle]`) a partir do elemento pai e confirmo a aplicação do estilo `text-decoration-line: line-through`.
- **Organizei a suíte por contexto.** A página inicial mantém uma spec própria de disponibilidade em [home.cy.js](cypress/e2e/home.cy.js), enquanto [tasks.cy.js](cypress/e2e/tasks.cy.js) agrupa os cenários em `context('cadastro')` e `context('atualização')`.

## Cobertura atual

| Cenário | O que a spec cobre | Código |
| --- | --- | --- |
| Abertura do Mark L | Acessa a aplicação e confirma o título `Gerencie suas tarefas com Mark L`. | [home.cy.js](cypress/e2e/home.cy.js) |
| Cadastro de uma tarefa | Limpa eventual registro pela API, envia `ler um livro de node.js` pelo formulário e confirma que a tarefa aparece visível na lista. | [tasks.cy.js](cypress/e2e/tasks.cy.js) |
| Rejeição de tarefa duplicada | Prepara `Estudar JavaScript` pela API, repete o título no formulário e confere o alerta visível com o texto exato `Task already exists!`. | [tasks.cy.js](cypress/e2e/tasks.cy.js) |
| Campo obrigatório no cadastro | Submete o formulário sem preencher o nome e valida na propriedade `validationMessage` do campo o texto `This is a required field`. | [tasks.cy.js](cypress/e2e/tasks.cy.js) |
| Conclusão de uma tarefa | Prepara `Pagar algumas contas` pela API, aciona o botão de conclusão do item na lista e confirma o estilo `line-through` no texto. | [tasks.cy.js](cypress/e2e/tasks.cy.js) |

Os comandos reutilizáveis de preparação pela API (`removeTaskByName` e `postTask`) e de interação e validação na interface (`createTask` e `isRequired`) ficam concentrados em [commands.js](cypress/support/commands.js).

## Trilha de estudo

O repositório acompanha minha prática no **Cypress eXpress**, ministrado por **Fernando Papito**. Comecei com campos, botões e dados dinâmicos com Faker, incorporei o consumo da API REST para preparar os testes e evoluí a suíte com Custom Commands, validação de campo obrigatório e conclusão de tarefas na lista. [Ementa oficial na Udemy](https://www.udemy.com/course/cypress-express/)

Conforme avanço no curso, quero aplicar os próximos tópicos à suíte.

- **Exclusão de tarefas.** Cobrir a remoção de itens pela interface e confirmar que deixam de aparecer na lista.
- **Massa de dados e configuração.** Explorar fixtures JSON para organizar dados de teste e centralizar URLs em variáveis de configuração do Cypress (`baseUrl` e `env`).
- **Execução e evidências.** Testar diferentes tamanhos de tela (`viewport`) e navegadores, além de registrar falhas com capturas e explorar os relatórios abordados no curso.

## Como executar

### 1. Inicie a aplicação Mark L

Baixe o pacote `mark-dev-build-r2` no material do curso. Para a API e a interface desse pacote, use **Node.js 18**.

No diretório `api` de uma cópia do Mark L dedicada aos testes, instale as dependências, prepare o banco local e inicie a API na porta `3333`. Mantenha a API em modo de desenvolvimento para disponibilizar a rota que remove a tarefa pelo nome.

```sh
npm ci
npm run db:init
npm start
```

Em outro terminal, no diretório `web`, inicie a interface. Ela estará disponível em `http://localhost:3000`.

```sh
npm ci
npm start
```

### 2. Clone este repositório e instale a suíte

Em um terceiro terminal, use **Node.js 24** com o Corepack disponível. O Corepack usa a versão `4.12.0` do Yarn definida no `package.json`.

```sh
git clone https://github.com/DouglasAntoni0/cypress-express.git
cd cypress-express
corepack yarn install --immutable
```

### 3. Rode os testes

| Objetivo | Comando |
| --- | --- |
| Executar toda a suíte no terminal | `corepack yarn cypress run` |
| Acompanhar os testes no modo interativo | `corepack yarn cypress open` |
| Executar somente a spec de tarefas | `corepack yarn cypress run --spec cypress/e2e/tasks.cy.js` |

Se o Cypress informar que o binário ainda não foi instalado, execute `corepack yarn cypress install` e rode a suíte novamente.

## Créditos

**Douglas Antonio** desenvolve e mantém a suíte de automação deste repositório. [Perfil no GitHub](https://github.com/DouglasAntoni0)

**Fernando Papito** é o instrutor do curso e autor da aplicação didática Mark L usada nos testes. [Curso Cypress eXpress](https://www.udemy.com/course/cypress-express/)
