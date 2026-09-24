# SINAL MORTO — RPG de terror espacial em 8 bits

RPG narrado frase a frase para **8 jogadores**, com pixel art, sons 8-bit e decisões resolvidas com **1 dado de 6 lados**.
Inspirado no clima de *Dead Space*. Feito para o clube: apague as luzes, use caixas de som e deixe o relógio correr.

## Como jogar

1. Abra `index.html` em qualquer navegador.
2. **INICIAR MISSÃO** → digite o nome de cada jogador (Nº1 a Nº8) e escolha o tempo do reator (padrão: **60 minutos**).
3. **Espaço / Enter / clique** avançam a narração. O mouse funciona como **lanterna** nas cenas escuras.
4. Em cada escolha, o grupo decide o que fazer e **quem faz**. O jogador daquele número rola o dado (virtual ou físico).
5. **PAUSAR** congela o relógio do reator (use para regras, dúvidas ou intervalos).

### Tripulação

| Nº | Função | +1 no dado quando… |
|----|--------|--------------------|
| 1 | Engenharia | mexe em painéis, faz ligação direta, solda |
| 2 | Medicina | examina corpos, pessoas, remédios, operações (e as doses curam 2 enquanto a Nº2 viver) |
| 3 | Segurança | vai na frente, segura portas, enfrenta criaturas |
| 4 | Pilotagem | salta no vazio, pilota a decolagem |
| 5 | Comunicações | — |
| 6 | Mineração | força bruta contra o monólito |
| 7 | Ciência | investiga o duto, o lençol, o monólito |
| 8 | Manutenção | dutos, cabos, servir de isca |

Cada tripulante tem **3 de vida**. Com 1 de vida, rola com **-1**. Infectados também rolam com **-1**.
Com a **MENTE** do grupo abaixo de 20, todos rolam com **-1** (pânico).

### O dado

| 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| Desastre | Fracasso | Por um triz | Sucesso | Grande sucesso | Extraordinário |

## Fase 1 — A Tártaro (10 cenas)

| Cena | Local | O que acontece |
|------|-------|----------------|
| 1 | Cela de contenção | **Enigma:** código de 4 dígitos. O teclado só diz NEGADO, sem dicas. As pistas lógicas estão espalhadas na cela (parede, terminal, armário, corpo). O código e as pistas mudam a cada partida. |
| 2 | Corredor B-7 | Algo nos dutos. Correr, rastejar ou investigar. |
| 3 | Porta de quarentena | **Escolha moral:** Rhea implora para entrar. Pode ser humana... ou não. |
| 4 | Enfermaria | Exploração: remédios, o gravador da médica (pista do enigma final) e o lençol que respira. |
| 5 | Eclusa de pressão | **Sacrifício:** alguém precisa segurar a manivela enquanto a horda chega. |
| 6 | Anel de observação | Gravidade zero diante do planeta partido. |
| 7 | Porão de carga | O monólito vermelho chama um de vocês pelo nome. |
| 8 | Túnel de manutenção | Quem foi infectado? Tratar, operar, abandonar... ou levar assim mesmo. |
| 9 | Hangar 3 | A criatura entre vocês e a nave de fuga. |
| 10 | Nave de fuga | **Enigma:** sequência de 6 cores escondida numa cantiga. A nave tem **8 assentos**. |

### Finais possíveis
- **Todos vivos**, alguns vivos, **último sobrevivente**;
- **Todos mortos** ao longo do caminho;
- **Explosão do reator** se o tempo acabar;
- **Queda da nave** na decolagem com peso extra.

## Onde editar o conteúdo

Cada cena é uma função `scene...()` dentro de `index.html`. Os resultados do dado seguem a ordem 1 a 6:

```js
["{A} fecha a porta, mas leva um corte fundo.", { a: -1, san: -10, time: -2 }]
```

- `{A}` = quem agiu · `{R}` / `{R2}` = outros tripulantes sorteados
- `a`, `r`, `r2`, `all` = vida (−3 mata) · `inf: "a"` = infecta quem agiu
- `san` = mente · `time` = minutos do reator · `doses`, `item`, `next` (+1 no próximo dado)
