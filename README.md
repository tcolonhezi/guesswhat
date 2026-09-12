# Adivinhe

Jogo de adivinhar palavras, feito em React + TypeScript + Vite.

## Como funciona

- Uma palavra é sorteada de uma lista de desafios, cada um com uma dica.
- O jogador digita uma letra por vez e confirma o palpite.
- Se a letra existir na palavra, ela é revelada em todas as posições onde aparece.
- Cada palpite (certo ou errado) consome uma tentativa.
- O número máximo de tentativas é `tamanho da palavra x 2`.
- O jogo termina em vitória (todas as letras reveladas) ou derrota (tentativas esgotadas), com opção de reiniciar.

## Stack

- React
- TypeScript
- Vite
- CSS Modules
- [react-confetti](https://www.npmjs.com/package/react-confetti) (efeito de confete na vitória)

## Estrutura

```
src/
  App.tsx              # lógica principal do jogo
  App.module.css
  components/
    button/
    input/
    letter/            # exibe cada letra da palavra (revelada ou oculta)
    lettersUsed/        # lista de letras já tentadas
    header/             # contador de tentativas + botão de reiniciar
    tip/                # exibe a dica do desafio atual
  utils/
    words.ts            # lista de desafios (palavra + dica)
  assets/
    restart.svg
    tip.svg
    logo.png
```

## Rodando localmente

```bash
npm install
npm run dev
```

## Próximos passos

- Gerar palavras e dicas via chamada de IA (backend próprio, escolha de tema), com a lista atual de `words.ts` como fallback caso a chamada falhe.