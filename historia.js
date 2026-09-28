/* O Gato Preto — Edgar Allan Poe ("The Black Cat", 1843, domínio público).
   Tradução integral para o português, dividida em 13 partes para leitura interativa.
   Trechos marcados com <span class="gatilho" data-susto="..."> disparam um susto
   quando o aluno chega até eles na leitura. */

window.HISTORIA = [
  {
    id: 'confissao',
    numero: 'I',
    titulo: 'A confissão',
    legenda: 'amanhã eu morro',
    som: 'cela',
    lanterna: 'tudo',
    texto: [
      `Para a narrativa mais extravagante e, ao mesmo tempo, mais comum que estou prestes a escrever, não espero nem peço que acreditem em mim. Louco eu seria se esperasse, num caso em que os meus próprios sentidos rejeitam aquilo que testemunharam. Mas louco eu não sou — e com toda a certeza não estou sonhando. <span class="gatilho" data-susto="sussurro">Amanhã, porém, eu morro</span>, e hoje quero aliviar a minha alma. Meu objetivo imediato é apresentar ao mundo, de modo simples, sucinto e sem comentários, uma série de meros acontecimentos domésticos. Em suas consequências, esses acontecimentos me aterrorizaram — me torturaram — me destruíram. Ainda assim, não tentarei explicá-los. Para mim, eles não representaram nada além de Horror; para muitos, parecerão menos terríveis do que extravagantes. Mais tarde, talvez, surja alguma inteligência capaz de reduzir o meu fantasma ao lugar-comum — uma inteligência mais calma, mais lógica e muito menos excitável do que a minha, que perceberá, nas circunstâncias que descrevo com pavor, nada além de uma sucessão ordinária de causas e efeitos muito naturais.`
    ],
    perguntas: [
      ['O narrador diz que “amanhã” morre. Onde ele está e por que decide contar a sua história?',
       'Ele está numa cela, condenado à morte (mais adiante ele fala da “cela de condenado” e do “carrasco”). Quer “aliviar a alma” antes da execução.'],
      ['Ele garante: “louco eu não sou”. Você acredita nele? Anote a sua resposta — vamos voltar a ela no final.',
       'Pergunta aberta. Repare que o narrador tenta convencer o leitor da própria sanidade logo na primeira página: é o chamado narrador não confiável.']
    ]
  },
  {
    id: 'plutao',
    numero: 'II',
    titulo: 'Plutão',
    legenda: 'bruxas disfarçadas',
    som: 'lar',
    texto: [
      `Desde a infância, fui conhecido pela docilidade e pela bondade do meu temperamento. A ternura do meu coração era tão evidente que me tornava motivo de piada entre os meus companheiros. Eu gostava especialmente de animais, e meus pais me deixaram ter uma grande variedade de bichos de estimação. Passava com eles a maior parte do tempo, e nunca era tão feliz como quando os alimentava e acariciava. Essa peculiaridade de caráter cresceu comigo e, já adulto, tornou-se uma das minhas principais fontes de prazer. Àqueles que já sentiram afeição por um cão fiel e inteligente, não preciso explicar a natureza nem a intensidade da satisfação que isso proporciona. Há algo no amor desinteressado e abnegado de um animal que vai direto ao coração de quem já teve muitas ocasiões de pôr à prova a amizade mesquinha e a fidelidade frágil como teia de aranha do simples Homem.`,
      `Casei-me cedo e fiquei feliz por encontrar em minha esposa um temperamento parecido com o meu. Percebendo a minha predileção pelos animais domésticos, ela não perdia nenhuma oportunidade de conseguir os mais agradáveis. Tínhamos pássaros, peixinhos dourados, um belo cão, coelhos, um pequeno macaco e <em>um gato</em>.`,
      `Este último era um animal notavelmente grande e bonito, inteiramente preto e inteligente a um grau espantoso. Ao falar de sua inteligência, minha esposa, que no fundo tinha não pouca superstição, fazia frequentes alusões à antiga crença popular de que <span class="gatilho" data-susto="sussurro">todos os gatos pretos são bruxas disfarçadas</span>. Não que ela falasse sério sobre isso — e só menciono o assunto porque, neste exato momento, ele me veio à lembrança.`,
      `Plutão — esse era o nome do gato — era o meu bicho favorito e o meu companheiro de brincadeiras. Só eu o alimentava, e ele me acompanhava por toda parte dentro de casa. Era até difícil impedi-lo de me seguir pelas ruas.`
    ],
    perguntas: [
      ['Como o narrador se descreve na infância? Por que essa descrição é importante para o conto?',
       'Dócil, bondoso, apaixonado por animais. O contraste entre esse menino e o homem que ele se torna deixa a transformação muito mais chocante.'],
      ['Que crença a esposa menciona sobre os gatos pretos? Por que o narrador diz que só a lembrou “neste exato momento”?',
       'A de que gatos pretos seriam bruxas disfarçadas. Ele finge que é um detalhe sem importância, mas assim planta no leitor a semente do sobrenatural.']
    ]
  },
  {
    id: 'alcool',
    numero: 'III',
    titulo: 'O Demônio da Intemperança',
    legenda: 'que doença se compara ao Álcool?',
    som: 'taverna',
    texto: [
      `Nossa amizade durou assim por vários anos, durante os quais o meu temperamento e o meu caráter — por obra do Demônio da Intemperança — sofreram (envergonho-me de confessar) uma mudança radical para pior. Fui me tornando, dia após dia, mais sombrio, mais irritável, mais indiferente aos sentimentos dos outros. Permiti-me usar palavras grosseiras com a minha esposa. <span class="gatilho" data-susto="tremor">Por fim, cheguei a usar de violência contra ela.</span> Meus animais, naturalmente, sentiram a mudança do meu humor. Eu não apenas os negligenciava: maltratava-os. Por Plutão, no entanto, eu ainda tinha consideração suficiente para me impedir de maltratá-lo, ao passo que não tinha escrúpulo algum em maltratar os coelhos, o macaco ou mesmo o cão quando, por acaso ou por afeição, eles cruzavam o meu caminho. Mas a minha doença foi crescendo — pois que doença se compara ao Álcool? — e, por fim, até Plutão, que já estava ficando velho e, por isso, um tanto rabugento, <span class="gatilho" data-susto="sombra">até Plutão começou a sentir os efeitos do meu mau humor.</span>`
    ],
    perguntas: [
      ['Qual é o “demônio” que transforma o narrador?',
       'A intemperança: o vício em álcool. Repare que ele escreve “Álcool” com letra maiúscula, como se fosse uma personagem.'],
      ['Quem sofre primeiro com a mudança? Por que Plutão é poupado no começo?',
       'A esposa e os outros animais. Plutão ainda é o favorito, e o narrador tem por ele “consideração suficiente” — por enquanto.']
    ]
  },
  {
    id: 'olho',
    numero: 'IV',
    titulo: 'O olho',
    legenda: 'coro, ardo, estremeço',
    som: 'tensao',
    estados: true,
    texto: [
      `Certa noite, ao voltar para casa muito embriagado de uma das tavernas que eu frequentava pela cidade, tive a impressão de que o gato evitava a minha presença. Agarrei-o; e ele, assustado com a minha violência, feriu levemente a minha mão com os dentes. Uma fúria demoníaca apoderou-se de mim no mesmo instante. Eu já não me reconhecia. Minha alma original pareceu, de repente, fugir do meu corpo; e uma maldade mais que diabólica, alimentada pelo gim, fez vibrar cada fibra do meu ser. Tirei do bolso do colete um canivete, abri-o, agarrei o pobre animal pela garganta e, deliberadamente, <span class="gatilho" data-susto="olho">arranquei-lhe um dos olhos da órbita!</span> Coro, ardo, estremeço enquanto escrevo essa atrocidade maldita.`,
      `Quando a razão voltou com a manhã — quando o sono dissipou os vapores da orgia da noite —, experimentei um sentimento meio de horror, meio de remorso, pelo crime que havia cometido; mas era, quando muito, um sentimento fraco e ambíguo, e a alma permaneceu intocada. Mergulhei de novo nos excessos e logo afoguei no vinho qualquer lembrança do ato.`
    ],
    perguntas: [
      ['O que provoca a fúria do narrador naquela noite?',
       'Ele acha que o gato o evita, agarra o animal à força e leva uma mordida leve na mão. A reação é totalmente desproporcional.'],
      ['Na manhã seguinte, o narrador sente remorso de verdade? Justifique com uma expressão do texto.',
       'Não. Ele mesmo diz que foi “um sentimento fraco e ambíguo” e que “a alma permaneceu intocada”. Depois, afoga a lembrança no vinho.']
    ]
  },
  {
    id: 'arvore',
    numero: 'V',
    titulo: 'O espírito da perversidade',
    legenda: 'porque sabia que ele me amara',
    som: 'vento',
    texto: [
      `Enquanto isso, o gato se recuperou lentamente. A órbita do olho perdido tinha, é verdade, uma aparência assustadora, mas ele já não parecia sentir dor. Andava pela casa como sempre, mas, como era de esperar, fugia apavorado quando eu me aproximava. Restava-me ainda tanto do meu antigo coração que, a princípio, fiquei magoado com essa evidente aversão por parte de uma criatura que antes me amara tanto. Mas esse sentimento logo deu lugar à irritação. E então surgiu, como para a minha ruína final e irrevogável, o espírito da PERVERSIDADE.`,
      `Desse espírito a filosofia não se ocupa. No entanto, não tenho mais certeza de que a minha alma vive do que tenho de que a perversidade é um dos impulsos primitivos do coração humano — uma das faculdades primárias e indivisíveis, ou sentimentos, que dão direção ao caráter do Homem. Quem nunca se surpreendeu, cem vezes, cometendo uma ação vil ou tola sem outra razão senão saber que não deveria cometê-la? Não temos nós uma inclinação perpétua, contra o nosso melhor juízo, a violar aquilo que é Lei, simplesmente porque entendemos que é Lei?`,
      `Esse espírito de perversidade, repito, veio para a minha ruína final. Foi esse desejo insondável da alma de atormentar a si mesma — de violentar a própria natureza —, de fazer o mal apenas pelo mal, que me levou a continuar e, finalmente, a consumar o dano que eu havia infligido ao animal inofensivo. Certa manhã, a sangue-frio, <span class="gatilho" data-susto="relampago">passei um laço em volta do seu pescoço e o enforquei no galho de uma árvore</span>; — enforquei-o com as lágrimas escorrendo dos olhos e com o mais amargo remorso no coração; — enforquei-o porque sabia que ele me amara e porque sentia que ele não me dera motivo algum de ofensa; — enforquei-o porque sabia que, ao fazê-lo, estava cometendo um pecado — um pecado mortal que colocaria a minha alma imortal em tamanho perigo que a poria — se tal coisa fosse possível — até mesmo fora do alcance da misericórdia infinita do Deus Misericordiosíssimo e Terribilíssimo.`
    ],
    perguntas: [
      ['O que é o “espírito da perversidade”, segundo o narrador?',
       'Um impulso de fazer o mal justamente porque se sabe que é errado — “fazer o mal apenas pelo mal”.'],
      ['O narrador chora enquanto enforca o gato. Isso diminui ou aumenta a crueldade do ato? Discuta com a turma.',
       'Pergunta aberta. Um caminho: ele sabe que é pecado e faz exatamente por isso, e sabe que o gato o amava — o choro mostra consciência, o que torna o ato ainda mais cruel.']
    ]
  },
  {
    id: 'fogo',
    numero: 'VI',
    titulo: 'O fogo e a parede',
    legenda: 'estranho! singular!',
    som: 'fogo',
    lanterna: 'arte',
    texto: [
      `Na noite do dia em que cometi esse ato cruel, fui despertado pelo grito de <span class="gatilho" data-susto="fogo">«fogo!»</span>. As cortinas da minha cama estavam em chamas. A casa inteira ardia. Foi com grande dificuldade que minha esposa, uma criada e eu conseguimos escapar do incêndio. A destruição foi completa. Toda a minha riqueza material foi engolida, e desde então me entreguei ao desespero.`,
      `Estou acima da fraqueza de tentar estabelecer uma relação de causa e efeito entre o desastre e a atrocidade. Mas estou descrevendo uma cadeia de fatos — e não quero deixar incompleto nem um elo possível. No dia seguinte ao incêndio, visitei as ruínas. As paredes, com uma exceção, haviam desabado. A exceção era uma parede interna, não muito grossa, que ficava mais ou menos no meio da casa e contra a qual ficava a cabeceira da minha cama. O reboco ali resistira, em grande parte, à ação do fogo — fato que atribuí a ele ter sido aplicado recentemente. Em volta dessa parede havia uma multidão reunida, e muitas pessoas pareciam examinar uma parte específica dela com atenção minuciosa e ávida. As palavras «estranho!», «singular!» e outras expressões semelhantes despertaram a minha curiosidade. Aproximei-me e vi, como se estivesse esculpida em baixo-relevo sobre a superfície branca, <span class="gatilho" data-susto="parede">a figura de um gato gigantesco</span>. A imagem fora gravada com uma precisão verdadeiramente espantosa. Havia uma corda em volta do pescoço do animal.`,
      `Quando vi pela primeira vez essa aparição — pois eu dificilmente poderia considerá-la outra coisa —, meu espanto e meu terror foram extremos. Mas, por fim, a reflexão veio em meu auxílio. O gato, lembrei-me, fora enforcado num jardim ao lado da casa. Ao alarme de incêndio, esse jardim se enchera imediatamente de gente — e alguém devia ter cortado a corda e atirado o animal, por uma janela aberta, para dentro do meu quarto. Isso fora feito, provavelmente, com a intenção de me acordar. A queda das outras paredes comprimira a vítima da minha crueldade contra o reboco recém-aplicado; e a cal, junto com as chamas e o amoníaco do cadáver, completara o retrato tal como eu o vira.`
    ],
    perguntas: [
      ['Que imagem aparece na única parede que sobrou do incêndio?',
       'A figura de um gato gigantesco, como um baixo-relevo, com uma corda em volta do pescoço.'],
      ['Como o narrador explica “racionalmente” essa imagem? A explicação convence você?',
       'Alguém teria cortado a corda e jogado o gato pela janela para acordá-lo; a queda das paredes comprimiu o corpo contra o reboco fresco, e a cal, o fogo e o amoníaco formaram o retrato. Se convence ou não, é pergunta aberta — Poe deixa as duas leituras possíveis.']
    ]
  },
  {
    id: 'taverna',
    numero: 'VII',
    titulo: 'O segundo gato',
    legenda: 'nunca o tinha visto antes',
    som: 'taverna',
    texto: [
      `Embora eu tenha assim explicado facilmente à minha razão, se não inteiramente à minha consciência, o fato assombroso que acabo de narrar, ele não deixou de causar uma impressão profunda na minha imaginação. Durante meses não consegui me livrar do fantasma do gato; e, nesse período, voltou ao meu espírito um meio-sentimento que parecia remorso, mas não era. Cheguei a lamentar a perda do animal e a procurar, entre os antros miseráveis que eu agora frequentava habitualmente, outro bicho da mesma espécie e de aparência parecida para ocupar o seu lugar.`,
      `Certa noite, quando eu estava sentado, meio entorpecido, num antro mais que infame, minha atenção foi subitamente atraída por <span class="gatilho" data-susto="olhos">um objeto preto</span> que repousava sobre um dos imensos barris de gim, ou de rum, que constituíam a principal mobília do lugar. Eu olhava fixamente para o alto daquele barril havia alguns minutos, e o que me surpreendeu foi não ter percebido antes o objeto que estava ali. Aproximei-me e toquei-o com a mão. Era um gato preto — um gato muito grande —, tão grande quanto Plutão e muito parecido com ele em todos os aspectos, exceto um. Plutão não tinha um único pelo branco em nenhuma parte do corpo; mas este gato tinha uma mancha branca, grande, embora indefinida, que cobria quase toda a região do peito.`,
      `Quando o toquei, ele se levantou imediatamente, ronronou alto, esfregou-se na minha mão e pareceu encantado com a minha atenção. Aquela era, então, exatamente a criatura que eu procurava. Ofereci-me de imediato para comprá-lo do dono da taverna; mas o homem não reivindicou o animal — não sabia nada sobre ele — <span class="gatilho" data-susto="sussurro">nunca o tinha visto antes</span>.`,
      `Continuei a acariciá-lo e, quando me preparei para ir para casa, o animal mostrou vontade de me acompanhar. Deixei que viesse, abaixando-me de vez em quando para afagá-lo enquanto caminhava. Ao chegar à casa, ele se instalou imediatamente e logo se tornou o grande favorito da minha esposa.`
    ],
    perguntas: [
      ['Em que o segundo gato é igual a Plutão, e em que é diferente?',
       'Mesmo tamanho, mesma cor, muito parecido “em todos os aspectos, exceto um”: tem uma grande mancha branca, indefinida, no peito.'],
      ['O dono da taverna nunca tinha visto aquele gato. O que esse detalhe sugere?',
       'Que o gato surgiu do nada, de modo misterioso — talvez sobrenatural, talvez o próprio Plutão de volta. Poe não confirma: deixa o leitor desconfiado.']
    ]
  },
  {
    id: 'segue',
    numero: 'VIII',
    titulo: 'O olho que falta',
    legenda: 'ele me segue',
    som: 'ronrom',
    texto: [
      `Quanto a mim, logo senti nascer dentro de mim uma aversão por ele. Era exatamente o contrário do que eu esperava; mas — não sei como nem por quê — o seu evidente carinho por mim me enojava e me irritava. Pouco a pouco, esses sentimentos de nojo e irritação transformaram-se na amargura do ódio. Eu evitava a criatura; certo sentimento de vergonha e a lembrança do meu antigo ato de crueldade me impediam de maltratá-la fisicamente. Durante algumas semanas, não bati nele nem o maltratei com violência; mas, aos poucos — muito aos poucos —, passei a olhá-lo com uma repugnância indizível e a fugir em silêncio da sua presença odiosa, como quem foge do hálito de uma peste.`,
      `O que aumentou, sem dúvida, o meu ódio pelo animal foi a descoberta, na manhã seguinte à que o trouxe para casa, de que, <span class="gatilho" data-susto="olhos">como Plutão, também ele fora privado de um dos olhos</span>. Essa circunstância, porém, só o tornou mais querido para a minha esposa, que, como já disse, possuía em alto grau aquela bondade de sentimentos que um dia fora o meu traço mais marcante e a fonte de muitos dos meus prazeres mais simples e mais puros.`,
      `Com a minha aversão por esse gato, no entanto, sua predileção por mim parecia aumentar. Seguia os meus passos com uma insistência que seria difícil fazer o leitor compreender. Sempre que eu me sentava, ele se encolhia debaixo da minha cadeira ou saltava para os meus joelhos, cobrindo-me com as suas carícias repugnantes. Se eu me levantava para andar, ele se enfiava entre os meus pés e quase me derrubava, ou então, <span class="gatilho" data-susto="garras">cravando as garras longas e afiadas na minha roupa, subia assim até o meu peito</span>. Nesses momentos, embora eu desejasse destruí-lo com um golpe, algo ainda me detinha: em parte a lembrança do meu crime anterior, mas principalmente — deixe-me confessar de uma vez — um pavor absoluto do animal.`
    ],
    perguntas: [
      ['Que descoberta aumenta o ódio do narrador pelo segundo gato?',
       'Na manhã seguinte, ele percebe que o gato também não tem um dos olhos — exatamente como Plutão.'],
      ['O que realmente impede o narrador de matar o gato?',
       'Em parte a lembrança do crime anterior, mas “principalmente” um pavor absoluto do animal.']
    ]
  },
  {
    id: 'forca',
    numero: 'IX',
    titulo: 'A forca no peito',
    legenda: 'a FORCA',
    som: 'pesadelo',
    texto: [
      `Esse pavor não era exatamente o medo de um mal físico — e, no entanto, eu não saberia defini-lo de outra forma. Tenho quase vergonha de admitir — sim, mesmo nesta cela de condenado, tenho quase vergonha de admitir — que o terror e o horror que o animal me inspirava tinham sido aumentados por uma das quimeras mais absurdas que se possam imaginar. Minha esposa chamara a minha atenção, mais de uma vez, para a forma da mancha de pelos brancos de que falei, e que constituía a única diferença visível entre o estranho animal e aquele que eu havia destruído. O leitor há de se lembrar que essa mancha, embora grande, era a princípio muito indefinida; mas, lentamente — de modo quase imperceptível, e que durante muito tempo a minha Razão lutou para rejeitar como fantasia —, ela acabara por assumir um contorno de rigorosa nitidez. Era agora a imagem de um objeto que eu estremeço ao nomear — e por isso, acima de tudo, eu odiava e temia o monstro, e dele me teria livrado se tivesse coragem —, era agora, repito, a imagem de uma coisa horrenda — de uma coisa medonha — <span class="gatilho grita" data-susto="forca">da FORCA!</span> — oh, lúgubre e terrível máquina do Horror e do Crime — da Agonia e da Morte!`,
      `E agora eu era, de fato, miserável além de toda a miséria humana. E um animal irracional — cujo semelhante eu destruíra com desprezo —, um animal irracional causar a mim — a mim, um homem feito à imagem do Deus Altíssimo — tamanha e tão insuportável desgraça! Ai de mim! Nem de dia nem de noite eu conheci mais a bênção do Descanso! Durante o dia, a criatura não me deixava sozinho um só momento; e, à noite, eu acordava sobressaltado, de hora em hora, de sonhos de um medo indizível, para encontrar <span class="gatilho" data-susto="halito">o hálito quente da coisa no meu rosto</span> e o seu peso enorme — um Pesadelo encarnado do qual eu não tinha forças para me livrar — pousado eternamente sobre o meu coração!`,
      `Sob a pressão de tormentos como esses, o frágil resto de bondade que havia em mim sucumbiu. Os maus pensamentos tornaram-se os meus únicos companheiros — os mais sombrios e perversos pensamentos. O mau humor habitual do meu temperamento transformou-se em ódio a todas as coisas e a toda a humanidade; e, das explosões de fúria súbitas, frequentes e incontroláveis às quais eu agora me entregava cegamente, a minha esposa, que nunca se queixava, era — ai! — a vítima mais comum e mais paciente.`
    ],
    perguntas: [
      ['Em que forma a mancha branca se transforma? Por que essa imagem apavora tanto o narrador?',
       'Na forma de uma forca. Ela lembra o enforcamento de Plutão e anuncia o destino do próprio narrador: a execução.'],
      ['A palavra “Pesadelo” aparece com letra maiúscula. Que imagem ela cria?',
       'A de um ser que senta no peito de quem dorme e o sufoca — como na pintura “O Pesadelo” (Füssli, 1781). O gato vira um demônio noturno.']
    ]
  },
  {
    id: 'machado',
    numero: 'X',
    titulo: 'O machado',
    legenda: 'sem um gemido',
    som: 'porao',
    estados: true,
    texto: [
      `Certo dia, ela me acompanhou, para uma tarefa doméstica qualquer, até o porão do velho prédio onde a nossa pobreza nos obrigava a morar. O gato me seguiu pela escada íngreme e, quase me fazendo cair de cabeça, exasperou-me até a loucura. Erguendo um machado e esquecendo, na minha ira, o medo infantil que até então detivera a minha mão, desferi contra o animal um golpe que, é claro, teria sido fatal se tivesse caído como eu queria. Mas o golpe foi detido pela mão da minha esposa. Enfurecido com a interferência, tomado de uma raiva mais que demoníaca, livrei o braço da mão dela e <span class="gatilho" data-susto="machado">enterrei-lhe o machado no cérebro</span>. Ela caiu morta ali mesmo, sem um gemido.`
    ],
    perguntas: [
      ['A quem o golpe do machado era destinado? Quem foi atingido?',
       'O golpe era para o gato. A esposa segurou o braço do narrador para impedir, e foi ela quem morreu.'],
      ['Releia a última frase: “Ela caiu morta ali mesmo, sem um gemido.” Que efeito essa frase curta e seca produz?',
       'Frieza. O narrador conta o assassinato sem nenhuma emoção — e é justamente essa calma que deixa a cena mais horrível.']
    ]
  },
  {
    id: 'parede',
    numero: 'XI',
    titulo: 'A parede do porão',
    legenda: 'não foi em vão',
    som: 'porao',
    tijolos: true,
    texto: [
      `Cometido esse assassinato horrendo, dediquei-me imediatamente, e com toda a calma, à tarefa de esconder o corpo. Eu sabia que não poderia tirá-lo de casa, nem de dia nem de noite, sem o risco de ser visto pelos vizinhos. Muitos planos passaram pela minha cabeça. Em certo momento, pensei em cortar o cadáver em pedaços minúsculos e destruí-los no fogo. Em outro, resolvi cavar uma cova para ele no chão do porão. Depois, pensei em atirá-lo no poço do quintal — ou em embalá-lo numa caixa, como se fosse mercadoria, com os arranjos de costume, e assim pedir a um carregador que o levasse de casa. Por fim, tive uma ideia que me pareceu muito melhor do que todas essas. Decidi emparedá-lo no porão — como, segundo contam, os monges da Idade Média emparedavam as suas vítimas.`,
      `Para um propósito como esse, o porão era bem adequado. As paredes tinham sido construídas sem muito cuidado e pouco antes haviam sido rebocadas por inteiro com um reboco grosseiro, que a umidade do ar impedira de endurecer. Além disso, numa das paredes havia uma saliência, formada por uma falsa chaminé, ou lareira, que fora tapada para ficar parecida com o resto do porão. Não tive dúvidas de que poderia facilmente retirar os tijolos naquele ponto, colocar ali o cadáver e fechar tudo de novo como antes, de modo que nenhum olho pudesse descobrir nada de suspeito.`,
      `E não me enganei nesse cálculo. Com um pé de cabra, arranquei facilmente os tijolos e, depois de encostar com cuidado o corpo na parede interna, escorei-o naquela posição, enquanto, sem grande esforço, reconstruía toda a estrutura como era originalmente. Tendo conseguido argamassa, areia e crina, preparei, com todas as precauções possíveis, um reboco que não se distinguia do antigo, e com ele cobri com muito cuidado a nova alvenaria. Quando terminei, fiquei satisfeito: estava tudo certo. A parede não mostrava o menor sinal de ter sido mexida. O entulho do chão foi recolhido com o mais minucioso cuidado. Olhei em volta, triunfante, e disse a mim mesmo: <span class="gatilho" data-susto="sussurro">«Aqui, pelo menos, o meu trabalho não foi em vão.»</span>`,
      `Meu passo seguinte foi procurar o animal que fora a causa de tanta desgraça; pois eu estava, finalmente, decidido a matá-lo. Se o tivesse encontrado naquele momento, não haveria dúvida quanto ao seu destino; mas parecia que o animal astuto se assustara com a violência da minha raiva e evitava aparecer enquanto eu estivesse naquele estado. É impossível descrever, ou imaginar, a profunda e abençoada sensação de alívio que a ausência da criatura detestada provocou em meu peito. Ela não apareceu durante a noite — e assim, ao menos por uma noite desde que entrara naquela casa, dormi profunda e tranquilamente; sim, <span class="gatilho" data-susto="sombra">dormi, mesmo com o peso de um assassinato na alma!</span>`,
      `Passaram-se o segundo e o terceiro dia, e o meu algoz não apareceu. Mais uma vez respirei como um homem livre. O monstro, aterrorizado, fugira da casa para sempre! Eu não o veria nunca mais! Minha felicidade era suprema! A culpa do meu ato sombrio pouco me perturbava. Algumas perguntas foram feitas, mas logo respondidas. Chegou-se a fazer uma busca — mas, é claro, nada foi descoberto. Eu considerava garantida a minha felicidade futura.`
    ],
    perguntas: [
      ['Que planos o narrador considera para esconder o corpo? Qual ele escolhe?',
       'Cortar o corpo e queimar, enterrar no chão do porão, jogar no poço, despachar numa caixa como mercadoria. Escolhe emparedá-lo na falsa chaminé do porão.'],
      ['Depois do crime, ele dorme “profunda e tranquilamente”. O que isso revela sobre ele?',
       'Que não sente culpa: o alívio pelo sumiço do gato é maior do que qualquer remorso pela morte da esposa.']
    ]
  },
  {
    id: 'policia',
    numero: 'XII',
    titulo: 'A visita da polícia',
    legenda: 'paredes muito sólidas',
    som: 'policia',
    bater: true,
    texto: [
      `No quarto dia após o assassinato, um grupo de policiais chegou, de modo totalmente inesperado, à casa e voltou a fazer uma investigação rigorosa do local. Confiante, porém, em que o meu esconderijo era impenetrável, não senti o menor embaraço. Os policiais me pediram que os acompanhasse na busca. Não deixaram canto nem recanto sem explorar. Por fim, pela terceira ou quarta vez, desceram ao porão. Não tremi um só músculo. <span class="gatilho" data-susto="calma">Meu coração batia calmo como o de quem dorme na inocência.</span> Andei pelo porão de um extremo ao outro. Cruzei os braços sobre o peito e passeei tranquilamente de um lado para o outro. Os policiais ficaram inteiramente satisfeitos e se prepararam para partir. A alegria do meu coração era forte demais para ser contida. Eu ardia de vontade de dizer uma palavra que fosse, em tom de triunfo, para tornar duplamente certa a convicção deles da minha inocência.`,
      `— Senhores — eu disse, por fim, enquanto o grupo subia a escada —, fico encantado por ter dissipado as suas suspeitas. Desejo a todos muita saúde e um pouco mais de cortesia. A propósito, senhores, esta… esta é uma casa muito bem construída. (No desejo furioso de dizer alguma coisa com naturalidade, eu mal sabia o que estava falando.) — Posso dizer que é uma casa <em>excelentemente</em> bem construída. Estas paredes — os senhores já vão? —, estas paredes são muito sólidas. — E, nesse ponto, por puro frenesi de bravata, bati com força, com a bengala que tinha na mão, exatamente naquela parte da alvenaria atrás da qual estava o cadáver da esposa do meu coração.`
    ],
    perguntas: [
      ['Os policiais já estavam indo embora. Por que o narrador bate na parede?',
       'Por orgulho e bravata: ele quer “triunfar”, provar que é inocente — e acaba se entregando.'],
      ['Relacione esse gesto ao “espírito da perversidade” da Parte V.',
       'É o mesmo impulso: fazer exatamente o que não deveria, justamente porque sabe que não deveria.']
    ]
  },
  {
    id: 'grito',
    numero: 'XIII',
    titulo: 'A voz no túmulo',
    legenda: 'EU HAVIA EMPAREDADO O MONSTRO',
    som: 'grito',
    lanterna: 'tudo',
    texto: [
      `Mas que Deus me proteja e me livre das garras do Arqui-Inimigo! Mal o eco das minhas batidas mergulhou no silêncio, fui respondido por uma voz de dentro do túmulo! — por um grito, a princípio abafado e entrecortado, como o soluço de uma criança, e que logo cresceu num único grito longo, alto e contínuo, completamente anormal e inumano — um uivo — <span class="gatilho" data-susto="uivo">um guincho lamentoso, metade horror, metade triunfo</span>, como só poderia ter subido do inferno, das gargantas dos condenados em sua agonia e dos demônios que exultam com a danação.`,
      `Dos meus próprios pensamentos é loucura falar. Quase desmaiando, cambaleei até a parede oposta. Por um instante, o grupo na escada ficou imóvel, no extremo do terror e do espanto. No instante seguinte, uma dúzia de braços fortes trabalhava na parede. Ela caiu inteira. O cadáver, já muito decomposto e coberto de sangue coagulado, estava de pé diante dos olhos dos espectadores. Sobre a sua cabeça, <span class="gatilho" data-susto="final">com a boca vermelha escancarada e o único olho em chamas</span>, estava sentado o animal horrendo cuja astúcia me levara ao assassinato e cuja voz delatora me entregara ao carrasco. <strong class="ultima">Eu havia emparedado o monstro dentro do túmulo!</strong>`
    ],
    perguntas: [
      ['De onde vem o grito? O que os policiais encontram quando derrubam a parede?',
       'De dentro da parede. Encontram o cadáver da esposa, de pé, e o gato preto sentado sobre a cabeça dela, vivo.'],
      ['Na primeira página, o narrador dizia: “louco eu não sou”. E agora: loucura, culpa ou sobrenatural? Escolha uma explicação e defenda-a com trechos do conto.',
       'Pergunta aberta. Loucura: o álcool e a paranoia deformam tudo o que ele vê. Culpa: a consciência “fala” pela voz do gato. Sobrenatural: o gato seria Plutão voltando para se vingar (lembre das “bruxas disfarçadas”).']
    ]
  }
];

window.FINAL_PERGUNTAS = [
  'Por que o conto se chama “O Gato Preto”, se o crime mais grave é contra a esposa? O que isso diz sobre o narrador?',
  'Faça uma lista das “provas” de que o segundo gato é Plutão de volta. Depois, uma lista das explicações racionais. Qual lista é mais forte?',
  'Poe nunca dá nome à esposa. Por que ela é a única personagem sem nome, enquanto o gato se chama Plutão (o deus romano dos mortos)?',
  'Reescreva a última cena do ponto de vista de um dos policiais, em primeira pessoa, em até 10 linhas.'
];
