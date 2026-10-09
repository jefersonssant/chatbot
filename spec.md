# Visão Geral

Esta especificação define os requisitos funcionais, visuais e comportamentais para o desenvolvimento de uma interface de chatbot simples. O objetivo é construir uma aplicação leve, responsiva e independente, utilizando exclusivamente tecnologias nativas da web (HTML5, CSS3 e JavaScript Vanilla), sem dependência de bibliotecas ou frameworks externos.

# Requisitos Tecnológicos e Restrições

- Linguagens: HTML5, CSS3, JavaScript (ES6+ Vanilla).

- Dependências Externas: Nenhuma (sem React, Vue, Tailwind, jQuery, etc.).

- Compatibilidade: Navegadores modernos (Chrome, Firefox, Edge, Safari).

- Armazenamento Local: localStorage para persistência básica de histórico de mensagens na sessão do usuário.

# Arquitetura de Arquivos

A estrutura do projeto deve conter apenas os seguintes arquivos:

- index.html: Estrutura semântica do chat
- style.css: Estilização completa e Design Tokens
- script.js: Lógica do chat, estado e manipulação do DOM

# Requisitos Funcionais

## Exibição de Mensagens

- Lista de Mensagens: O chat deve exibir mensagens enviadas pelo usuário e respostas geradas pelo bot.

## Identificação Visual:

- Mensagens do Usuário: Alinhadas à direita, fundo com cor de destaque (ex: roxo/azul).

- Mensagens do Bot: Alinhadas à esquerda, fundo neutro escuro/cinza.

- Carimbo de Hora (Timestamp): Cada mensagem deve exibir o horário de envio no formato HH:MM.

## Envio de Mensagens

### Formas de Envio:

- Clique no botão de "Enviar".

- Pressionar a tecla Enter com o campo de texto focado.

- Shift + Enter deve permitir a quebra de linha sem enviar a mensagem.

- Validação: Não deve ser possível enviar mensagens vazias ou compostas apenas por espaços em branco.

- Limpeza do Campo: Após o envio, o campo de texto deve ser limpo e focado novamente.

## Indicador de Digitação (Typing Indicator)

Enquanto o bot aguarda ou gera uma resposta, a interface deve exibir um indicador visual de "digitando..." (animação simples com três pontos pulsantes).

## Scroll Automático

Sempre que uma nova mensagem for adicionada (ou o indicador de digitação for exibido), a área de mensagens deve rolar automaticamente para a parte inferior (scrollTop = scrollHeight).

## Limpeza de Histórico

Deve haver um botão no cabeçalho do chat para limpar as mensagens da tela e do localStorage.


# Lógica de Negócio e Estados (JavaScript)

## Estrutura do Estado da Mensagem

As mensagens devem ser tratadas como objetos com o seguinte formato:

{
  "id": "string-uuid-ou-timestamp",
  "sender": "user" | "bot",
  "text": "Conteúdo da mensagem",
  "timestamp": "14:32"
}


## Fluxo da Resposta do Bot (Simulado/Mock)

- O usuário envia uma mensagem.

- O sistema exibe a mensagem do usuário no DOM e salva no estado.

- Exibe o indicador de digitação do bot.

- Aguarda um delay simulado de 1.5s (setTimeout).

- Remove o indicador de digitação.

- Adiciona a resposta pré-definida do bot (ex: "Recebi sua mensagem: '[texto]'").

- Atualiza o localStorage.

# Critérios de Aceite e Qualidade

## Acessibilidade básica:

- O campo de texto deve conter aria-label="Digite sua mensagem".

- Elementos interativos devem ser navegáveis via tecla Tab.

## Robustez:

O layout não deve quebrar com textos muito longos (usar word-break: break-word).

## Desempenho:

Zero dependências HTTP externas. O carregamento inicial da página deve ocorrer em menos de 100ms.