// @ts-nocheck

const datavalleySelectorBtn = document.querySelector('#Datavalley-selector');
const customerSelectorBtn = document.querySelector('#customer-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessagesContainer = document.getElementById('chatMessages');
const chatInputForm = document.getElementById('chatInputForm');
const chatInput = document.getElementById('chatInput');
const clearChatBtn = document.getElementById('clearChatBtn');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Datavalley' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessagesContainer.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = 'Datavalley';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === 'Datavalley') {
    datavalleySelectorBtn.classList.add('active-person');
    customerSelectorBtn.classList.remove('active-person');
  }
  if (name === 'customer') {
    customerSelectorBtn.classList.add('active-person');
    datavalleySelectorBtn.classList.remove('active-person');
  }

  /* auto-focus the input field */
  chatInput.focus();
};

datavalleySelectorBtn.onclick = () => updateMessageSender('Datavalley');
customerSelectorBtn.onclick = () => updateMessageSender('customer');

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const customerMessage = {
    sender: 'customer',
    text: chatInput.value,
    timestamp,
  };

  /* Save customer message to local storage */
  messages.push(customerMessage);
  localStorage.setItem('messages', JSON.stringify(messages));

  /* Add customer message to DOM */
  chatMessagesContainer.innerHTML += createChatMessageElement(customerMessage);

  // Simple response logic from Datavalley
  const datavalleyResponse = {
    sender: 'Datavalley',
    text: getDatavalleyResponse(chatInput.value), // You can replace this function with a more advanced logic
    timestamp,
  };

  /* Save Datavalley response to local storage */
  messages.push(datavalleyResponse);
  localStorage.setItem('messages', JSON.stringify(messages));

  /* Add Datavalley response to DOM */
  chatMessagesContainer.innerHTML += createChatMessageElement(datavalleyResponse);

  /* Clear input field */
  chatInputForm.reset();

  /*  Scroll to the bottom of chat messages */
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
};

const getDatavalleyResponse = (customerMessage) => {
  // Replace this with your actual response logic based on customer's message
  if (customerMessage.includes('Java fullstack courses')) {
    return 'In Datavalley, there are many internships provided like Javafullstack using Java, Fullstack using Python, and projects are also provided. Thank you for contacting us!';
  } else {
    return 'Datavalley provides a generic response.';
  }
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessagesContainer.innerHTML = '';
});