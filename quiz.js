const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const quizScreen = document.getElementById('quiz-screen');
const startScreen = document.getElementById('start-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const resultText = document.getElementById('result-text');
const usernameInput = document.getElementById('username');

let currentQuestionIndex = 0;
let score = 0;
let username = "";

const questions = [
  {
    question: "What is Gensyn primarily building?",
    answers: [
      { text: "A decentralized protocol for AI model training", correct: true },
      { text: "A centralized AI marketplace", correct: false },
      { text: "A cloud storage network", correct: false },
      { text: "A gaming blockchain", correct: false }
    ]
  },
  {
    question: "Which technology underpins Gensyn’s decentralized nature?",
    answers: [
      { text: "Blockchain", correct: true },
      { text: "Traditional cloud servers", correct: false },
      { text: "Central databases", correct: false },
      { text: "Private hosting", correct: false }
    ]
  },
  {
    question: "What key issue does Gensyn aim to solve?",
    answers: [
      { text: "High compute costs for AI training", correct: true },
      { text: "Poor mobile connectivity", correct: false },
      { text: "Video rendering speeds", correct: false },
      { text: "Low-resolution datasets", correct: false }
    ]
  },
  {
    question: "What token mechanism does Gensyn use for rewards?",
    answers: [
      { text: "Proof-of-Compute", correct: true },
      { text: "Proof-of-Stake", correct: false },
      { text: "Proof-of-Work", correct: false },
      { text: "Proof-of-Identity", correct: false }
    ]
  },
  {
    question: "Gensyn allows anyone with compute to:",
    answers: [
      { text: "Contribute to AI training and earn rewards", correct: true },
      { text: "Store data only", correct: false },
      { text: "Access confidential AI models", correct: false },
      { text: "Run advertising campaigns", correct: false }
    ]
  },
  {
    question: "The Gensyn network ensures trust using:",
    answers: [
      { text: "Cryptographic verification", correct: true },
      { text: "Manual reviews", correct: false },
      { text: "AI monitoring", correct: false },
      { text: "Central auditing", correct: false }
    ]
  },
  {
    question: "Which of the following best describes Gensyn’s vision?",
    answers: [
      { text: "Making AI compute globally accessible and decentralized", correct: true },
      { text: "Creating private AI labs", correct: false },
      { text: "Building an NFT marketplace", correct: false },
      { text: "Designing a social media AI bot", correct: false }
    ]
  },
  {
    question: "Gensyn integrates with existing AI frameworks to:",
    answers: [
      { text: "Distribute training workloads", correct: true },
      { text: "Replace neural networks", correct: false },
      { text: "Host static websites", correct: false },
      { text: "Manage user wallets", correct: false }
    ]
  },
  {
    question: "What is an advantage of Gensyn’s decentralized compute network?",
    answers: [
      { text: "Lower AI training costs", correct: true },
      { text: "Slower performance", correct: false },
      { text: "Data silos", correct: false },
      { text: "Centralized failures", correct: false }
    ]
  },
  {
    question: "Which community benefits most from Gensyn?",
    answers: [
      { text: "AI researchers and developers", correct: true },
      { text: "Graphic designers", correct: false },
      { text: "Gamers", correct: false },
      { text: "Social media influencers", correct: false }
    ]
  }
];

startBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  if (username === "") {
    alert("Please enter your name before starting the quiz!");
    return;
  }
  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
});

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener('click', () => {
  resultScreen.classList.remove('active');
  startScreen.classList.add('active');
});

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionText.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(answer) {
  if (answer.correct) {
    score++;
  }
  nextBtn.style.display = 'block';
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.innerText === answer.text && answer.correct) {
      button.style.backgroundColor = '#4CAF50';
    } else if (button.innerText === answer.text && !answer.correct) {
      button.style.backgroundColor = '#E53935';
    }
  });
}

function showResult() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');
  resultText.innerText = `${username}, you scored ${score} out of ${questions.length}!`;
}