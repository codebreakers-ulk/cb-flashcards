// Storage Key
const STORAGE_KEY = "codebreakers_flashcards_vault";

// State
let cards = [];
let currentIndex = 0;
let isFlipped = false;

// DOM Elements
const flashcard = document.getElementById("flashcard");
const displayTopic = document.getElementById("displayTopic");
const displayContent = document.getElementById("displayContent");
const cardHint = document.getElementById("cardHint");
const cardProgress = document.getElementById("cardProgress");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const flipBtn = document.getElementById("flipBtn");
const deleteCardBtn = document.getElementById("deleteCardBtn");

const toggleFormBtn = document.getElementById("toggleFormBtn");
const cardFormContainer = document.getElementById("cardFormContainer");
const newCardForm = document.getElementById("newCardForm");
const cancelFormBtn = document.getElementById("cancelFormBtn");

// 1. Initialize Cards from LocalStorage or defaultCards
function loadCards() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      cards = JSON.parse(stored);
    } catch (e) {
      cards = [...defaultCards];
    }
  } else {
    cards = [...defaultCards];
    saveCards();
  }
}

function saveCards() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

// 2. Render Current Card
function renderCard() {
  if (cards.length === 0) {
    displayTopic.textContent = "Empty";
    displayContent.textContent = "No flashcards in your vault. Click '+ Add New Card' to create one!";
    cardHint.textContent = "";
    cardProgress.textContent = "0 of 0";
    flashcard.classList.remove("is-flipped");
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    flipBtn.disabled = true;
    deleteCardBtn.classList.add("hidden");
    return;
  }

  prevBtn.disabled = false;
  nextBtn.disabled = false;
  flipBtn.disabled = false;
  deleteCardBtn.classList.remove("hidden");

  const current = cards[currentIndex];
  cardProgress.textContent = `Card ${currentIndex + 1} of ${cards.length}`;
  displayTopic.textContent = current.topic;

  if (isFlipped) {
    displayContent.textContent = current.answer;
    cardHint.textContent = "Click or press Flip to view question";
    flashcard.classList.add("is-flipped");
  } else {
    displayContent.textContent = current.question;
    cardHint.textContent = "Click or press Flip to view answer";
    flashcard.classList.remove("is-flipped");
  }
}

// 3. Flip Card Handler
function toggleFlip() {
  if (cards.length === 0) return;
  isFlipped = !isFlipped;
  renderCard();
}

// 4. Navigation Handlers
function handleNext() {
  if (cards.length === 0) return;
  currentIndex = (currentIndex + 1) % cards.length;
  isFlipped = false;
  renderCard();
}

function handlePrev() {
  if (cards.length === 0) return;
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  isFlipped = false;
  renderCard();
}

// 5. Add New Card Handler
function handleCreateCard(e) {
  e.preventDefault();
  const topic = document.getElementById("cardTopic").value.trim();
  const question = document.getElementById("cardQuestion").value.trim();
  const answer = document.getElementById("cardAnswer").value.trim();

  if (!topic || !question || !answer) return;

  const newCard = {
    id: Date.now(),
    topic,
    question,
    answer
  };

  cards.push(newCard);
  saveCards();

  newCardForm.reset();
  cardFormContainer.classList.add("hidden");

  // Move to newly created card
  currentIndex = cards.length - 1;
  isFlipped = false;
  renderCard();
}

// 6. Delete Current Card
function handleDeleteCard() {
  if (cards.length === 0) return;
  
  const confirmDelete = confirm("Are you sure you want to delete this card?");
  if (!confirmDelete) return;

  cards.splice(currentIndex, 1);
  if (currentIndex >= cards.length) {
    currentIndex = Math.max(0, cards.length - 1);
  }
  saveCards();
  isFlipped = false;
  renderCard();
}

// Event Listeners
flashcard.addEventListener("click", toggleFlip);
flipBtn.addEventListener("click", toggleFlip);
nextBtn.addEventListener("click", handleNext);
prevBtn.addEventListener("click", handlePrev);
deleteCardBtn.addEventListener("click", handleDeleteCard);

toggleFormBtn.addEventListener("click", () => {
  cardFormContainer.classList.toggle("hidden");
});

cancelFormBtn.addEventListener("click", () => {
  newCardForm.reset();
  cardFormContainer.classList.add("hidden");
});

newCardForm.addEventListener("submit", handleCreateCard);

// Initial Execution
document.addEventListener("DOMContentLoaded", () => {
  loadCards();
  renderCard();
});