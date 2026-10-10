# Adivinhe

Jogo de adivinhar palavras desenvolvido com React, TypeScript e Vite. O fluxo atual combina escolha de tema, geração de desafios via API externa e fallback em modo offline para garantir que o jogo continue funcionando mesmo quando o backend estiver indisponível.

## Visão geral

O projeto é um jogo de forca em estilo de adivinhação por letras. O jogador escolhe um tema, recebe uma dica e tenta descobrir a palavra antes de esgotar as tentativas.

A lógica principal está em `src/App.tsx`, que coordena:

- criação da sessão com a API;
- carregamento dos temas disponíveis;
- geração do desafio online;
- uso de uma lista local de palavras como fallback;
- reinício do jogo e troca de tema.

## Como o jogo funciona

- A aplicação tenta criar uma sessão com a API em `src/services/session.ts`.
- Em seguida, busca os temas disponíveis em `src/services/themes.ts`.
- Ao escolher um tema, a aplicação solicita um novo desafio em `src/services/challenge.ts`.
- Se a API estiver indisponível ou retornar erro, o jogo entra em modo offline e usa `src/utils/words.ts`.
- O usuário digita uma letra por vez.
- Letras repetidas não são aceitas.
- Cada tentativa aumenta o contador de erros/acertos.
- A palavra é revelada conforme as letras corretas forem acertadas.
- O jogo termina com vitória quando todas as letras forem descobertas ou derrota quando o limite for atingido.
- Há tela de reinício com confete ao vencer e botão para reiniciar ou trocar de tema.

## Recursos implementados

- seleção de tema antes do início da partida;
- geração dinâmica de desafios via API externa;
- persistência da sessão em `localStorage` por 30 minutos (`SessionContext`);
- fallback offline com lista local de palavras;
- contagem de tentativas e letras já usadas;
- tela de vitória/derrota e reinício do jogo;
- suporte visual com CSS Modules e componente de confete.

## Stack

- React 19
- TypeScript
- Vite
- Axios
- CSS Modules
- [react-confetti](https://www.npmjs.com/package/react-confetti)

## Estrutura do projeto

```text
src/
  App.tsx                 # fluxo principal: tema, sessão, desafio e modo offline
  App.module.css
  api/
    api.ts                # configuração do cliente Axios
  components/
    button/
    game/
    header/
    input/
    letter/
    lettersUsed/
    messages/
    restartScreen/
    themeScreen/
    tip/
  context/
    SessionContext.tsx     # gerenciamento da sessão persistida no localStorage
  hooks/
    useSession.tsx        # hook para acesso ao contexto da sessão
  services/
    challenge.ts          # chamada para gerar desafio via API
    session.ts            # criação da sessão via API
    themes.ts             # busca de temas via API
  utils/
    words.ts              # lista de fallback para desafios offline
  assets/
    logo.png
    restart.svg
    tip.svg
```

## Fluxo de dados

A aplicação usa um cliente Axios configurado em `src/api/api.ts` apontando para a API pública:

```ts
https://guesswhat-api-zj46.onrender.com
```

Os endpoints usados são:

- `POST /session` — cria a sessão do jogo;
- `GET /themes` — retorna os temas disponíveis;
- `POST /challenge` — retorna a palavra e a dica com base no tema e na sessão.

Se o backend não responder, o jogo automaticamente troca para o modo offline usando a lista local em `src/utils/words.ts`.

## Requisitos

- Node.js 18+
- npm

## Como rodar localmente

```bash
npm install
npm run dev
```

A aplicação fica disponível pelo endereço padrão do Vite, normalmente:

```text
http://localhost:5173
```

## Build de produção

```bash
npm run build
```

## Observações de arquitetura

- A sessão é salva em `localStorage` com `@guesswhat:session` e expira após 30 minutos.
- A troca de tema fica desabilitada em modo offline, conforme lógica do componente `Header`.
- O jogo usa `Math.random()` para escolher uma palavra local e também para gerar o `id` do desafio quando a API responde.
- O desafio online e offline têm a mesma estrutura: `id`, `word`, `tip`.

## Próximos passos possíveis
- persistir histórico de partidas;
- adicionar dificuldade por quantidade de letras ou temas;
- melhorar UX com animações, validações e acessibilidade;
- criar testes automatizados para a lógica do jogo.
