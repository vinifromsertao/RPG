# SINAL MORTO — RPG de terror espacial em 8 bits

Um RPG narrado frase a frase, com visual pixel art, sons 8-bit e decisões resolvidas com **1 dado de 6 lados**.
Inspirado no clima de *Dead Space*: nave mineradora à deriva, corredores escuros, trajes com a barra de vida na coluna.

## Como jogar

1. Abra o arquivo `index.html` em qualquer navegador (não precisa instalar nada).
2. Clique em **INICIAR MISSÃO** (o som só liga depois desse clique).
3. **Espaço / Enter / clique** avançam a narração.
4. Escolha o que fazer **clicando nos objetos da cena** (estilo *point and click*) ou na lista de opções.
5. Role o dado virtual **ou use um dado físico** e clique no número que caiu (ótimo para jogar em sala de aula).

| Dado | Resultado |
|------|-----------|
| 1 | Desastre |
| 2 | Fracasso |
| 3 | Por um triz |
| 4 | Sucesso |
| 5 | Grande sucesso |
| 6 | Extraordinário |

## Fase 1 — estrutura

| Cena | Local | Opções |
|------|-------|--------|
| 1 | Cela de contenção | Examinar o teclado · Religar o terminal · Revistar o corpo do engenheiro |
| — | Teclado da porta | Os jogadores digitam o código no teclado da porta (com uma mão enluvada apertando as teclas) |
| 2 | Corredor B-7 | Correr · Esconder-se atrás das caixas · Investigar o duto |
| 3 | Enfermaria | Ouvir o gravador · Pegar suprimentos · Levantar o lençol da maca |
| 4 | Anel de observação (gravidade zero) | Impulsionar-se · Usar o cabo · Religar a gravidade |
| 5 | Hangar 3 | Enfrentar a criatura · Correr para a nave · Distração + sinal de socorro |

- **O código da porta muda a cada partida.** Quanto melhor o dado na cena 1, mais pistas vocês ganham.
- O teclado dá retorno no estilo *Wordle*: verde = posição certa, amarelo = existe em outro lugar, cinza = não existe.
- Depois de 8 erros, o painel entra em curto e a porta abre sozinha (ninguém fica preso).
- **Ninguém morre na Fase 1**: os atributos nunca descem abaixo de 5.
- Itens mudam o jogo: o *cortador de plasma*, a *lanterna* e o *cartão mestre* dão +1 no dado em opções específicas.

## Onde editar o conteúdo

Todo o texto está no objeto `SCENES` dentro de `index.html`. Cada opção tem 6 resultados, na ordem do dado (1 a 6):

```js
["Texto do resultado", { hp: -15, o2: 0, san: -10, item: "lanterna", next: 1 }]
```

`hp` = traje, `o2` = oxigênio, `san` = mente, `next: 1` = +1 no próximo dado.
