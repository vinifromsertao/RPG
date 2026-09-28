# O Gato Preto — leitura interativa

O conto **“O Gato Preto”** (*The Black Cat*, 1843), de Edgar Allan Poe, em tradução integral para o português, dividido em **13 partes** para ser lido parte por parte, como um livro pop-up de terror desenhado a carvão.

> ⚠️ Contém violência explícita contra animais e contra uma pessoa (texto e ilustrações). Indicado a partir de 14 anos.

## Como usar em aula

1. Abra `index.html` em qualquer navegador (computador, tablet ou celular). Funciona sem internet; só as fontes vêm do Google Fonts.
2. Na capa, clique em **Abrir o livro**. O clique também liga o som, porque os navegadores exigem um toque antes de tocar áudio.
3. Leia cada parte e responda ao **Pare e pense** no fim da página. Cada pergunta tem uma **resposta sugerida** escondida.
4. Clique em **Virar a página →** para seguir. As setas ← e → do teclado também viram as páginas.

Dicas para criar o clima: apague as luzes, use caixas de som ou fones de ouvido e projete a tela.

### Botões da barra superior

| Botão | O que faz |
|---|---|
| **sumário** | pula para qualquer parte (útil para retomar a leitura) |
| **som** | liga ou desliga todos os sons |
| **lanterna** | liga ou desliga o escuro: nas partes I, VI e XIII a página fica escura e o aluno ilumina com o mouse ou o dedo |
| **sustos** | liga ou desliga os sustos (flashes, tremores, sombras). Desligue para alunos sensíveis; o texto e as ilustrações continuam |

As escolhas ficam salvas no navegador.

### Abrir direto numa parte

Acrescente `#parte-N` ao endereço, por exemplo `index.html#parte-9`. A capa mostra **Abrir na parte IX**. Use `#fim` para abrir nas perguntas finais.

## As 13 partes

| Parte | Título | O que acontece na página |
|---|---|---|
| I | A confissão | cela escura: a lanterna revela o condenado e um olho brilhando na sombra do gato |
| II | Plutão | a família, os bichos e a sombra de bruxa da esposa; caixinha de música desafinada |
| III | O Demônio da Intemperança | o demônio de fumaça sai da garrafa de gim |
| IV | O olho | a ilustração muda quando o aluno lê “arranquei-lhe um dos olhos” |
| V | O espírito da perversidade | o gato enforcado balança na árvore; relâmpago e trovão |
| VI | O fogo e a parede | incêndio; a lanterna procura o gato gravado na parede |
| VII | O segundo gato | a taverna; o gato sobre o barril |
| VIII | O olho que falta | o único olho do gato acompanha o mouse do aluno |
| IX | A forca no peito | a mancha branca vira uma forca diante dos olhos do leitor |
| X | O machado | a cena muda no instante do golpe |
| XI | A parede do porão | os tijolos sobem enquanto o aluno lê |
| XII | A visita da polícia | o aluno bate três vezes na parede… |
| XIII | A voz no túmulo | o grito; a lanterna revela o cadáver e o gato |

No fim há quatro perguntas para discussão em grupo.

## Publicar no GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**, a branch principal e a pasta `/ (root)`.
3. O link fica no formato `https://<seu-usuario>.github.io/<repositorio>/`.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | estrutura da página e filtros SVG (carvão, recorte de papel, brilho) |
| `estilo.css` | visual do livro: papel, capa vermelha, tipografia, efeitos |
| `historia.js` | **o texto do conto**, os títulos e as perguntas de cada parte |
| `arte.js` | as 13 ilustrações, desenhadas em código |
| `som.js` | os sons, sintetizados no navegador (nenhum arquivo de áudio) |
| `app.js` | navegação, pop-up, lanterna, sustos e mecânicas de cada cena |

### Editar o texto ou as perguntas

Tudo está em `historia.js`. Cada parte tem `titulo`, `texto` (um item por parágrafo) e `perguntas` (pares `[pergunta, resposta sugerida]`).

Um trecho marcado com `<span class="gatilho" data-susto="...">` dispara um susto quando o aluno chega nele. O momento é calculado pelo número de palavras antes do trecho, a cerca de 3 palavras por segundo, para que o susto não chegue antes da leitura. Tipos disponíveis: `sussurro`, `tremor`, `sombra`, `olho`, `relampago`, `fogo`, `parede`, `olhos`, `garras`, `forca`, `halito`, `machado`, `calma`, `uivo`, `final`.

## Créditos

- Texto: Edgar Allan Poe, *The Black Cat* (1843), obra em domínio público. A tradução para o português foi feita para esta leitura.
- Ilustrações: desenhadas em código (SVG), com textura de carvão e recortes de livro pop-up, inspiradas na estética dos livros ilustrados de terror.
- Fontes: IM Fell English e Rock Salt (Google Fonts, licenças livres).
