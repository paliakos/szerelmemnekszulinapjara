const questions = [
    {
        question: "Szeretnél velem eljönni randizni?",
        answers: [
            "Igennn❤️",
            "Nem😭",
        ]
    },
    {
        question: "Hova mennél el velem legszívesebben?",
        answers: [
            "Étterem, ami a kiszserbo kedvence",
            "Füvészkert, ahol a kiszserbó fotózgatja a fákat",
            "Egy moziba, a cukim kedvenc filmjére",
            "Piknikezni a vadonba, ahol fél kiszserbó az oroszlántól"
        ]
    },
    {
        question: "Szerinted mennyire szeretlek?",
        answers: [
            "Nagyon nagyon nagyon nagyon nagyon nagyon szeretlek",
            "Kibaszottul nagyon imadosan nagyon szeretlek",
            "Annyira szeretlek ahogy a csillag jár az égen",
            "Nadon zserbosan szeretem a mommimat"
        ]
    },
    {
        question: "Mikor menjünk?",
        answers: [
            "Holnap",
            "Holnapután",
            "Kiskedden",
            "Majd megbeszeljük, hogy mikor szeretne menni a világ legcukibb barátnője"
        ]
    }
];

let currentQuestion = 0;
let selectedAnswer = null;
const savedAnswers = [];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-button");

function showQuestion() {
    const questionData = questions[currentQuestion];

    questionElement.textContent = questionData.question;
    answersElement.innerHTML = "";

    selectedAnswer = null;
    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Befejezés ❤️"
            : "Kövi →";

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer");
        button.type = "button";

        button.addEventListener("click", () => {
            selectedAnswer = index;

            document.querySelectorAll(".answer").forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");
            nextButton.disabled = false;
        });

        answersElement.appendChild(button);
    });
}

nextButton.addEventListener("click", () => {
    if (selectedAnswer === null) {
        return;
    }

    // --- ITT JÖN A FELUGRÓ ABLAK (ALERT) HA A NEM-ET VÁLASZTJA ---
    if (currentQuestion === 0 && selectedAnswer === 1) {
        alert("Helytelen válasz! Ígyis úgyis el kell velem jönnöd! 😡❤️");
        showQuestion(); // Újraindítja az első kérdést, hogy kötelezően az igent iktassa be
        return;
    }

    savedAnswers[currentQuestion] =
        questions[currentQuestion].answers[selectedAnswer];

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionElement.textContent = "Köszönöm a válaszaidat! ❤️";
    answersElement.innerHTML = "";

    savedAnswers.forEach((answer, index) => {
        const item = document.createElement("p");

        item.textContent =
            `${index + 1}. kérdés: ${answer}`;

        answersElement.appendChild(item);
    });

    nextButton.textContent = "Befejezve ✓";
    nextButton.disabled = true;
}

showQuestion();
