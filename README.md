# EcoRota — Salvador Mais Verde (versão 4)

Site estático responsivo, em português, para apresentar os três mapas do projeto EcoRota.

## Estrutura
- `index.html`: página inicial e apresentação dos três mapas.
- `mapa-interativo.html`: mapa interativo Leaflet.
- `assets/`: logotipo oficial e as duas imagens de mapa.
- `data/locais.json`: base de 16 locais do levantamento, preservando os campos e avisos da fonte.
- `css/` e `js/`: estilos e comportamento separados por página.

## Executar no VS Code
1. Extraia a pasta e abra-a no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html` → **Open with Live Server**.
4. O mapa interativo usa Leaflet e os tiles do OpenStreetMap, então precisa de internet.

Alternativa: no terminal, dentro da pasta do projeto, execute `python -m http.server 8000` e acesse `http://localhost:8000`.

## Decisões e cuidados
- HTML, CSS e JavaScript sem framework ou processo de build.
- Leaflet 1.9.4 + OpenStreetMap no mapa interativo; não usa Mapbox nem token privado.
- Os dados do JSON foram mantidos como base preliminar. Coordenadas são aproximadas e não certificam entradas/portões.
- Horários aparecem identificados como “no documento”, não como confirmação de funcionamento atual.
- Os seis registros verdes incluem um equipamento de visitação cuja classificação institucional deve ser confirmada.
- A contagem de 6 + 9 + 1 refere-se somente aos 16 registros presentes no conjunto de dados, não a um inventário completo da cidade.
- Antes de divulgar como guia turístico, validar coordenadas, acessos, horários, materiais aceitos e fontes de cada local.
- Não há formulário, coleta de dados pessoais, analytics ou chaves de API.

## Créditos
- Mapa-base interativo: © OpenStreetMap contributors.
- Logotipo e mapas estáticos: materiais fornecidos no contexto do projeto EcoRota.


## Camada visual e movimento
A versão atual inclui uma camada de acabamento inspirada em padrões de microinteração e transição: entrada suave de seções, destaque de cursor nos cards, detalhes de topografia em movimento lento, realce de botões e indicador de progresso de leitura. Os efeitos são feitos com CSS e JavaScript nativos; o projeto continua sem React ou dependências extras na página inicial. A preferência `prefers-reduced-motion` é respeitada.

O arquivo `DESIGN.md` registra a direção visual, os tokens de cor e movimento e as restrições do projeto para futuras alterações.


## Versão 4 — acabamento de movimento e consistência visual

- Movimento revisado com entradas mais longas e encadeadas (Blur Text, Animated Content e Scroll Reveal), brilho de baixa intensidade nos cards e microinteração magnética muito sutil nos CTAs.
- Efeitos adaptados para HTML/CSS/JavaScript puros; o React Bits é uma biblioteca de componentes React, mas o site não precisa migrar de stack para aproveitar os padrões visuais.
- Rodapé corrigido: a imagem anterior era um PNG com fundo branco submetido a um filtro que tornava a marca branca também. O rodapé agora usa `assets/logo-ecorota-footer.png`, com fundo transparente.
- Mapa interativo mais integrado: legenda transferida para a barra lateral, base cartográfica suavemente dessaturada, marcadores menores, lista e filtros com transições mais graduais.
- Ajuste responsivo específico para tablet; a navegação do mapa também abre em menu móvel.
- `prefers-reduced-motion` continua respeitado.

Referências consultadas: React Bits (Blur Text, Animated Content, Scroll Reveal, Glare Hover, Magnet e Topography); Transitions.dev (tokens de duração/easing, propriedades compostas e reduced motion); Taste Skill (inventário, inspeção responsiva e ciclos de crítica/refino).
