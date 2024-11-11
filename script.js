// Array to store questions, options, and answers
const questions = [
    {
        question: "What does the expression 'To see eye to eye' mean?",
        options: [
            "a) Descordar",
            "b) Concordar",
            "c) Discutir"
        ],
        answer: "b) Concordar"
    },
    {
        question: "What does 'Once in a blue moon' mean?",
        options: [
            "a) Raramente",
            "b) Frequentemente",
            "c) Muitas vezes"
        ],
        answer: "a) Raramente"
    },
    {
        question: "What does 'To be a piece of cake' mean?",
        options: [
            "a) Ser complicado",
            "b) Ser fácil",
            "c) Ser difícil"
        ],
        answer: "b) Ser fácil"
    },
    {
        question: "What does 'To let the cat out of the bag' mean?",
        options: [
            "a) Manter um segredo",
            "b) Deixar escapar uma informação",
            "c) Cometer um erro"
        ],
        answer: "b) Deixar escapar uma informação"
    },
    {
        question: "What does 'Break a leg' mean?",
        options: [
            "a) Boa sorte",
            "b) Não se preocupe",
            "c) Tome cuidado"
        ],
        answer: "a) Boa sorte"
    },
    {
        question: "What does 'To be raining dogs and cats' mean?",
        options: [
            "a) Estar nevando muito",
            "b) Estar chovendo levemente",
            "c) Estar chovendo canivetes"
        ],
        answer: "c) Estar chovendo canivetes"
    },
    {
        question: "What does 'Cross my heart' mean?",
        options: [
            "a) Juro por Deus",
            "b) Eu não sei",
            "c) Eu prometo"
        ],
        answer: "a) Juro por Deus"
    },
    {
        question: "What does 'Never mind' mean?",
        options: [
            "a) Deixa pra lá",
            "b) Pense nisso",
            "c) Nunca diga isso"
        ],
        answer: "a) Deixa pra lá"
    },
    {
        question: "What does 'Better late than never' mean?",
        options: [
            "a) Antes tarde do que nunca",
            "b) Chegar tarde não é aceitável",
            "c) Melhor estar no horário do que atrasado"
        ],
        answer: "a) Antes tarde do que nunca"
    },
    {
        question: "What does 'To make a long story short' mean?",
        options: [
            "a) Contar uma história detalhada",
            "b) Resumir algo",
            "c) Explicar algo em detalhes"
        ],
        answer: "b) Resumir algo"
    },
    {
        question: "What does 'Once and for all' mean?",
        options: [
            "a) Por um curto período de tempo",
            "b) Para sempre",
            "c) De uma vez por todas"
        ],
        answer: "c) De uma vez por todas"
    },
    {
        question: "What does 'It's up to you' mean?",
        options: [
            "a) Você decide",
            "b) Eu decido",
            "c) Eu não me importo"
        ],
        answer: "a) Você decide"
    },
    {
        question: "What does 'Take your time' mean?",
        options: [
            "a) Se apresse",
            "b) Faça rápido",
            "c) Não tenha pressa"
        ],
        answer: "c) Não tenha pressa"
    },
    {
        question: "What does 'So far, so good' mean?",
        options: [
            "a) Está tudo ruim",
            "b) Está tudo indo bem até agora",
            "c) As coisas poderiam estar melhores"
        ],
        answer: "b) Está tudo indo bem até agora"
    }
];


// Variable to track the current question
let currentQuestionIndex = 0;

// Function to type out the question letter by letter
function typeQuestion(question) {
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = ''; // Clear the previous question

    let charIndex = 0;

    function typeNextChar() {
        if (charIndex < question.length) {
            const char = question[charIndex] === ' ' ? '&nbsp;' : question[charIndex];
            questionElement.innerHTML += char;
            charIndex++;
            setTimeout(typeNextChar, 50); // Time between each letter
        } else {
            // Enable the submit button once the question is fully displayed
            document.getElementById('submit').disabled = false;
        }
    }

    typeNextChar();
}

// Function to use the Web Speech API to convert text to speech
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set language to English
        speechSynthesis.speak(utterance); // Play the text as speech
    } else {
        alert("Text-to-speech is not supported in this browser.");
    }
}

// Function to load and display the current question
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        speakText(currentQuestion.question); // Use Web Speech API to read the question
        typeQuestion(currentQuestion.question); // Display the question letter by letter

        const optionsBox = document.getElementById('options-box');
        optionsBox.innerHTML = ''; // Clear any previous options
        
        currentQuestion.options.forEach(option => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
            optionsBox.appendChild(label); // Add the option to the DOM
        });

        document.getElementById('submit').disabled = true; // Disable the submit button initially
        // Reset the result box (to clear previous messages)
        document.getElementById('result').innerText = ''; 
    } else {
        // If all questions are completed, show the end modal
        showEndModal();
    }
}

// Event listener for the submit button to check the answer
document.getElementById('submit').addEventListener('click', function() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const resultBox = document.getElementById('result');
    
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === questions[currentQuestionIndex].answer) {
            resultBox.innerText = "Correct Answer!";
        } else {
            resultBox.innerText = "Wrong Answer!";
        }
        
        resultBox.classList.add('visible');
        
        // Disable the submit button after answering
        document.getElementById('submit').disabled = true;
        
        // Wait for 2 seconds before showing the next question
        setTimeout(() => {
            resultBox.classList.remove('visible');
            currentQuestionIndex++; // Move to the next question
            loadQuestion(); // Load the next question
        }, 2000); // 2 seconds delay to show result before loading the next question
    } else {
        // If no option is selected, show a message in the result box
        resultBox.innerText = "Please select an answer!";
        resultBox.classList.add('visible');
    }
});

// Start quiz modal functionality
document.getElementById('start-quiz-btn').addEventListener('click', function() {
    // Close the modal when the button is clicked
    document.getElementById('start-modal').style.display = 'none';
    // Start loading the first question
    loadQuestion();
});

// Show the quiz end modal
function showEndModal() {
    document.getElementById('end-modal').style.display = 'flex';
}

// Restart the quiz
document.getElementById('restart-quiz-btn').addEventListener('click', function() {
    // Reset the quiz state
    currentQuestionIndex = 0; // Reset to the first question
    
    // Hide the end modal
    document.getElementById('end-modal').style.display = 'none';
    
    // Reset result display
    document.getElementById('result').classList.remove('visible');
    
    // Load the first question again
    loadQuestion();
});

// Load the modal when the page is ready
window.onload = function() {
    // Show the start modal on page load
    document.getElementById('start-modal').style.display = 'flex';
};
