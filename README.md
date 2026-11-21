# Cypress eXpress · Automação E2E do Mark L

**Douglas Antonio · Projeto de portfólio em automação de testes web**

Neste projeto, construo uma suíte Cypress para o **Mark L**, um gerenciador de tarefas web. Comecei pelo caminho que um usuário percorre para criar uma tarefa, desde a abertura da aplicação até o envio do formulário. A cada etapa do curso, acrescento cenários e aprofundo as verificações dos fluxos que já automatizei.

**Stack** · JavaScript · Cypress 16 · Faker 10 · Node.js · Yarn 4

## Como apliquei QA neste projeto

- **Comecei por uma verificação de entrada.** Antes de testar as tarefas, fiz o navegador abrir o Mark L e validar o título exato da página. Isso dá um ponto de partida simples para investigar falhas de acesso à aplicação.
- **Automatizei um fluxo central pelo navegador.** O cenário de tarefas localiza o campo pelo seletor `#newTask` e aciona o botão pelo texto `Create`, como ele aparece na interface.
- **Gerei dados durante o teste.** Usei `faker.music.songName()` como fonte de nomes para as tarefas. Assim consigo exercitar o mesmo formulário com entradas variadas sem depender de um título fixo no código.
- **Organizei a suíte por contexto.** A página inicial e as tarefas têm specs próprias. Posso executar cada uma separadamente e acrescentar novos cenários ao fluxo correspondente.

## Cobertura atual

| Cenário | O que a spec cobre | Código |
| --- | --- | --- |
| Abertura do Mark L | Acessa a aplicação e confirma o título `Gerencie suas tarefas com Mark L`. | [home.cy.js](cypress/e2e/home.cy.js) |
| Envio de uma tarefa | Gera um nome, preenche o formulário e clica em `Create`. | [tasks.cy.js](cypress/e2e/tasks.cy.js) |

Os dois cenários passaram em uma execução local com Cypress 16.3.0, o Mark L e um banco temporário.

## Trilha de estudo

O repositório acompanha minha prática no **Cypress eXpress**, ministrado por **Fernando Papito**. As aulas iniciais de testes de ponta a ponta passam por campos de texto, botões e dados dinâmicos com Faker. Esses tópicos já aparecem no cenário de tarefas. [Ementa oficial na Udemy](https://www.udemy.com/course/cypress-express/)

Conforme avanço no curso, quero aplicar os próximos tópicos à suíte.

- **Resultado do cadastro e preparação de dados.** Conferir a tarefa na lista e usar a API do Mark L para preparar e limpar dados de teste.
- **Independência e reuso.** Evoluir os cenários para que possam rodar isoladamente e extrair comandos reutilizáveis onde houver repetição.
- **Execução e evidências.** Experimentar fixtures, diferentes tamanhos de tela e navegadores, além de registrar falhas com capturas e explorar os relatórios abordados no curso.

## Como executar

### 1. Inicie a aplicação Mark L

Baixe o pacote `mark-dev-build-r2` no material do curso. Para a API e a interface desse pacote, use **Node.js 18**.

No diretório `api` do Mark L, instale as dependências, prepare o banco local e inicie a API na porta `3333`.

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
