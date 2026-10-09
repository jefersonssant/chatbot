"use strict";

/* ==========================================================================
   Estado e Constantes
   ========================================================================== */

const STORAGE_KEY = "chatbot-messages";
const BOT_REPLY_DELAY = 1500; // 1.5s — delay simulado de resposta

/** @type {Array<{id: string, sender: "user" | "bot", text: string, timestamp: string}>} */
let messages = [];

/* ==========================================================================
   Referências do DOM
   ========================================================================== */

const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");

let typingIndicatorEl = null;

/* ==========================================================================
   Utilitários
   ========================================================================== */

/** Gera um identificador único (uuid ou timestamp). */
function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Formata a data atual como HH:MM. */
function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/** Rola a área de mensagens para o final. */
function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

/* ==========================================================================
   Persistência (localStorage)
   ========================================================================== */

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveMessages() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    /* localStorage indisponível (modo privado, etc.) — seguir sem persistir */
  }
}

function clearHistory() {
  messages = [];
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignorar */
  }
  removeTypingIndicator();
  messagesEl.innerHTML = "";
}

/* ==========================================================================
   Renderização
   ========================================================================== */

/**
 * Cria o elemento de um balão de mensagem.
 * @param {{id: string, sender: "user" | "bot", text: string, timestamp: string}} message
 * @returns {HTMLElement}
 */
function createMessageElement(message) {
  const wrapper = document.createElement("article");
  wrapper.className = `message message--${message.sender}`;
  wrapper.dataset.id = message.id;
  wrapper.setAttribute(
    "aria-label",
    message.sender === "user" ? "Sua mensagem" : "Resposta do bot"
  );

  const text = document.createElement("p");
  text.className = "message__text";
  text.textContent = message.text;

  const timestamp = document.createElement("time");
  timestamp.className = "message__timestamp";
  timestamp.textContent = message.timestamp;

  wrapper.append(text, timestamp);
  return wrapper;
}

/** Adiciona uma mensagem ao estado, ao DOM e persiste. */
function appendMessage(message) {
  messages.push(message);
  messagesEl.appendChild(createMessageElement(message));
  saveMessages();
  scrollToBottom();
}

/** Indicador de digitação do bot (três pontos pulsantes). */
function showTypingIndicator() {
  if (typingIndicatorEl) return;

  typingIndicatorEl = document.createElement("div");
  typingIndicatorEl.className = "typing";
  typingIndicatorEl.setAttribute("role", "status");
  typingIndicatorEl.setAttribute("aria-label", "Bot digitando");

  for (let i = 0; i < 3; i += 1) {
    const dot = document.createElement("span");
    dot.className = "typing__dot";
    typingIndicatorEl.appendChild(dot);
  }

  messagesEl.appendChild(typingIndicatorEl);
  scrollToBottom();
}

function removeTypingIndicator() {
  if (!typingIndicatorEl) return;
  typingIndicatorEl.remove();
  typingIndicatorEl = null;
}

/* ==========================================================================
   Fluxo de Envio e Resposta do Bot
   ========================================================================== */

/** Resposta pré-definida do bot (mock). */
function buildBotReply(userText) {
  return `Recebi sua mensagem: '${userText}'`;
}

function handleSend() {
  const text = inputEl.value.trim();

  // Validação: não enviar mensagens vazias ou só com espaços
  if (!text) return;

  // 1. Exibe a mensagem do usuário no DOM e salva no estado
  appendMessage({
    id: generateId(),
    sender: "user",
    text,
    timestamp: formatTimestamp(),
  });

  // 2. Limpa e refoca o campo
  inputEl.value = "";
  autoResizeInput();
  inputEl.focus();

  // 3. Exibe o indicador de digitação
  showTypingIndicator();

  // 4. Aguarda delay simulado de 1.5s e conclui a resposta
  window.setTimeout(() => {
    // 5. Remove o indicador
    removeTypingIndicator();

    // 6. Adiciona a resposta pré-definida do bot
    appendMessage({
      id: generateId(),
      sender: "bot",
      text: buildBotReply(text),
      timestamp: formatTimestamp(),
    });

    // 7. localStorage atualizado em appendMessage
  }, BOT_REPLY_DELAY);
}

/** Ajusta a altura do textarea conforme o conteúdo. */
function autoResizeInput() {
  inputEl.style.height = "auto";
  inputEl.style.height = `${Math.min(inputEl.scrollHeight, 120)}px`;
}

/* ==========================================================================
   Eventos
   ========================================================================== */

sendBtn.addEventListener("click", handleSend);

inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Impede a quebra de linha
    handleSend();
  }
  // Shift + Enter: comportamento padrão do textarea (quebra de linha)
});

inputEl.addEventListener("input", autoResizeInput);

clearBtn.addEventListener("click", () => {
  clearHistory();
  inputEl.focus();
});

/* ==========================================================================
   Inicialização
   ========================================================================== */

function init() {
  messages = loadMessages();

  const fragment = document.createDocumentFragment();
  for (const message of messages) {
    fragment.appendChild(createMessageElement(message));
  }
  messagesEl.appendChild(fragment);
  scrollToBottom();
  inputEl.focus();
}

init();
