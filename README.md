# Cypress eXpress · Automação E2E do Mark L

**Douglas Antonio · Projeto de portfólio em automação de testes web**

Neste projeto, construo uma suíte Cypress para o **Mark L**, um gerenciador de tarefas web. Comecei pela abertura da página inicial e pelo envio do formulário de tarefas. Nesta etapa, integrei a API do Mark L ao teste para controlar os dados antes de interagir com a interface. A cada etapa do curso, acrescento cenários e aprofundo as verificações dos fluxos que já automatizei.

**Stack** · JavaScript · Cypress 16 · Node.js · Yarn 4

## Como apliquei QA neste projeto

- **Comecei por uma verificação de entrada.** Antes de testar as tarefas, fiz o navegador abrir o Mark L e validar o título exato da página. Isso dá um ponto de partida simples para investigar falhas de acesso à aplicação.
- **Preparei a massa de teste pela API.** Uso `cy.request()` para remover, pelo nome, um possível registro anterior em `DELETE /helper/tasks`. O teste confirma o `204 No Content` antes de abrir a página. Assim, posso enviar o mesmo título em execuções consecutivas sem esbarrar no registro anterior.
- **Automatizei o envio pelo navegador.** O cenário preenche `#newTask` com o mesmo título usado na preparação e aciona o botão `Create`, como ele aparece na interface.
- **Organizei a suíte por contexto.** A página inicial e as tarefas têm specs próprias. Posso executar cada uma separadamente e acrescentar novos cenários ao fluxo correspondente.

## Cobertura atual

| Cenário | O que a spec cobre | Código |
| --- | --- | --- |
| Abertura do Mark L | Acessa a aplicação e confirma o título `Gerencie suas tarefas com Mark L`. | [home.cy.js](cypress/e2e/home.cy.js) |
| Envio de uma tarefa | Recebe `204` da rota de limpeza e envia `ler um livro de node.js` pelo formulário. | [tasks.cy.js](cypress/e2e/tasks.cy.js) |

Os dois cenários passaram em duas execuções consecutivas no mesmo banco temporário com Cypress 16.3.0. Em cada rodada, conferi pela API que havia exatamente uma tarefa com o título esperado e que o segundo envio criou um novo registro.

## Trilha de estudo

O repositório acompanha minha prática no **Cypress eXpress**, ministrado por **Fernando Papito**. Nas primeiras aulas, pratiquei a interação com campos e botões e gerei nomes com Faker. A etapa atual aplica a aula de consumo da API REST para preparar os dados de teste. [Ementa oficial na Udemy](https://www.udemy.com/course/cypress-express/)

Conforme avanço no curso, quero aplicar os próximos tópicos à suíte.

- **Resultado do cadastro.** Verificar na interface se a tarefa enviada aparece na lista e acrescentar cenários para as validações do formulário.
- **Independência e reuso.** Evoluir os cenários para que possam rodar isoladamente e extrair comandos reutilizáveis onde houver repetição.
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
