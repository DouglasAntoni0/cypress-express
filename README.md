# Cypress eXpress · Automação E2E do Mark L

**Douglas Antonio · Projeto de portfólio em automação de testes web**

Neste projeto, construo uma suíte Cypress para o **Mark L**, um gerenciador de tarefas web. Nesta etapa, evoluí o teste de cadastro para verificar o resultado que o usuário vê. A suíte confirma que uma tarefa nova aparece na lista e que a tentativa de cadastrar um título repetido gera o aviso esperado.

**Stack** · JavaScript · Cypress 16 · Node.js · Yarn 4

## Como apliquei QA neste projeto

- **Controlei o estado inicial pela API.** Cada cenário de tarefas usa `cy.request()` para remover um possível registro pelo nome em `DELETE /helper/tasks` e confirma `204 No Content`. Os cenários usam títulos distintos para preparar os dados de cada caso.
- **Montei o cenário de duplicidade antes de abrir a página.** Crio uma tarefa pendente em `POST /tasks` e confirmo `201 Created`. Em seguida, tento cadastrar o mesmo título pelo formulário para exercitar a regra de negócio pelo navegador.
- **Organizei a suíte por contexto.** A página inicial tem uma verificação própria de acesso. Na spec de tarefas, mantenho um cenário para o cadastro válido e outro para a rejeição de um título repetido.

## Cobertura atual

| Cenário | O que a spec cobre | Código |
| --- | --- | --- |
| Abertura do Mark L | Acessa a aplicação e confirma o título `Gerencie suas tarefas com Mark L`. | [home.cy.js](cypress/e2e/home.cy.js) |
| Cadastro de uma tarefa | Envia `ler um livro de node.js` pelo formulário e confirma que a tarefa aparece na lista. | [tasks.cy.js](cypress/e2e/tasks.cy.js) |
| Rejeição de tarefa duplicada | Prepara `Estudar JavaScript` pela API, repete o título no formulário e confere o alerta visível com o texto exato `Task already exists!`. | [tasks.cy.js](cypress/e2e/tasks.cy.js) |

Os três cenários passaram em duas execuções consecutivas no mesmo banco temporário com Cypress 16.3.0. Após cada rodada, uma consulta à API confirmou um único registro para cada título esperado.

## Trilha de estudo

O repositório acompanha minha prática no **Cypress eXpress**, ministrado por **Fernando Papito**. Comecei com campos, botões e dados dinâmicos com Faker. Depois, incorporei o consumo da API REST para preparar os testes e avancei para a validação do comportamento esperado na interface. [Ementa oficial na Udemy](https://www.udemy.com/course/cypress-express/)

Conforme avanço no curso, quero aplicar os próximos tópicos à suíte.

- **Validações do formulário.** Ampliar os cenários de erro e conferir as mensagens exibidas ao usuário.
- **Reuso.** Extrair comandos reutilizáveis para preparar as tarefas pela API.
- **Execução e evidências.** Experimentar fixtures, diferentes tamanhos de tela e navegadores, além de registrar falhas com capturas e explorar os relatórios abordados no curso.

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
