# Introdução

Este é o Design System para uma interface de chatbot simples, moderna e intuitiva. O foco é proporcionar uma experiência de conversa fluida com uma hierarquia visual clara entre as mensagens do usuário e as respostas da IA.

# Fundações

## Paleta de Cores (Tema Dark/Moderno):

--text: #E1E1E6 (Texto principal claro e de alto contraste)

--background: #121214 (Fundo escuro principal)

--primary: #8257E5 (Cor de destaque / Balão do Usuário)

--secondary: #202024 (Fundo dos containers / Balão do Bot)

--accent: #04D361 (Indicadores de estado / Botão de envio)

## Tipografia:

Títulos e Destaques: Inter, sans-serif (via Google Fonts)

Texto das Mensagens: Inter ou sistema fallback sans-serif

## Espaçamento:

Base de espaçamento: 8px e 16px (padding interno e lacunas de elementos)

# Componentes

## Balões de Mensagem (Chat Bubbles):

### Todos os balões vão:

- Ter padding interno de 12px 16px;

- Ter bordas arredondadas de 12px;

- Seguir o espaçamento de 8px entre mensagens consecutivas.

## Variações:

- Usuário: Fundo em --primary, texto em #FFFFFF, alinhado à direita com canto inferior direito reto (border-bottom-right-radius: 2px).

- Bot: Fundo em --secondary, texto em --text, alinhado à esquerda com canto inferior esquerdo reto (border-bottom-left-radius: 2px).

## Botões (Envio e Ações):

### Todos os botões vão:

- Ter uma sombra leve na parte inferior (box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2));

- Ter arredondamento de 6px;

- Ter fonte em negrito (font-weight: 600);

- Seguir o espaçamento definido na fundação (8px/16px padding).

### Variações:

- Primário (Enviar): Fundo em --primary ou --accent, texto escuro ou claro em alto contraste.

- Secundário (Limpar/Ações): Fundo transparente com borda discreta ou inverter tom do fundo.

## Campo de Texto (Input de Mensagem):

### Todos os inputs vão:

- Ter arredondamento de 6px;

- Fundo em --secondary com texto em --text;

- Borda discreta de 1px solid #323238;

- Seguir o espaçamento interno de 12px 16px.

# Layout Responsivo

- Desktop: Card centralizado de no máximo 480px de largura e 650px de altura.

- Mobile (width <= 600px): O chat deve ocupar 100% da largura e altura da viewport (100vh).

# Guia de Uso

- No CSS, sempre utilizar as variáveis :root para cores, fontes e espaçamentos, evitando valores absolutos (hardcoded) espalhados pelo código.

- O container do chat deve estar centralizado na tela em visões desktop e ocupar 100% da altura em telas mobile.