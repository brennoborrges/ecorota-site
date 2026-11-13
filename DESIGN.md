# EcoRota — direção visual

## Ideia central
Cartografia viva: a linguagem visual deve fazer o visitante sentir que está lendo um território real, sem confundir recursos decorativos com dados geográficos confirmados. A experiência é editorial, acolhedora e informativa. Os mapas e a transparência dos dados são protagonistas.

## Público e tarefa
Pessoas que chegam ao site para conhecer os mapas do projeto de extensão EcoRota, entender o que cada material apresenta e consultar os registros preliminares do mapa interativo. O site não deve sugerir navegação precisa nem substituir a confirmação junto às fontes responsáveis.

## Sistema visual
- Floresta `#103B2B`: identidade principal, títulos e superfícies escuras.
- Floresta profunda `#0B2A20`: rodapé e áreas de maior contraste.
- Folha `#7AA63C` e lima `#C4DC80`: acentos orgânicos e chamadas.
- Azul-esverdeado `#2B8990`: links, interação e informação.
- Papel `#F5F4EC` e papel secundário `#EBECE1`: superfícies editoriais.
- Texto `#1A2C24`; texto secundário `#66736A`.
- Display: Manrope; corpo: DM Sans; destaque editorial: Georgia em itálico, com uso pontual.

## Composição e assinatura
- Hero em duas colunas: tese editorial de um lado e mapa temático enquadrado como prancha cartográfica do outro.
- Contornos topográficos são textura de atmosfera, nunca representação de coordenadas ou relevo real.
- Três mapas são apresentados em cards: Pituaçu, Salvador Mais Verde e mapa interativo.
- O tom informativo e a nota de precisão ficam visíveis, sem ocultar limitações dos dados.

## Movimento
- Motion tokens: rápido 180 ms, base 320 ms, lento 620 ms; easing `cubic-bezier(.22,.8,.24,1)`.
- Usar entradas suaves, hover lift, brilho localizado, pequenos deslocamentos e progressão de leitura.
- Não usar animação para transmitir informação essencial.
- Respeitar `prefers-reduced-motion`; evitar efeitos de cursor contínuos, partículas, WebGL e animações pesadas.
- Preferir `transform`, `translate`, `opacity` e outros efeitos compostos; não usar `transition: all`.

## Tecnologia e restrições
HTML, CSS e JavaScript puros. Leaflet + OpenStreetMap para o mapa interativo. Não migrar para React apenas para importar componentes de demonstração. Adaptar padrões visuais de bibliotecas apenas quando forem adequados à identidade e ao desempenho do projeto.

## Acessibilidade e conteúdo
Contraste legível, foco visível, controles semânticos, navegação por teclado e redução de movimento. Contagens descrevem apenas a base atual do projeto. Coordenadas, acessos e horários permanecem preliminares até validação.
