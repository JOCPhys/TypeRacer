document.addEventListener('DOMContentLoaded', function() {
    const sampleText = document.getElementById('sampleText');
    const difficultySelector = document.getElementById('difficultySelector');
    const typingArea = document.getElementById('typingArea');
    const timeDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const levelDisplay = document.getElementById('level');
    const retryButton = document.getElementById('retryButton');
    const instructionsButton = document.getElementById('instructions-button');
    let startTime, endTime;

    const texts = {
        easy: [
            "The quick brown fox jumps over the lazy dog.",
            "A journey of a thousand miles begins with a single step.",
            "To be or not to be, that is the question."
        ],
        medium: [
            "All that glitters is not gold; often have you heard that told.",
            "The only thing we have to fear is fear itself.",
            "In the beginning God created the heavens and the earth."
        ],
        hard: [
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
            "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
            "The only limit to our realization of tomorrow is our doubts of today."
        ]
    };

    function updateSampleText() {
        const selectedDifficulty = difficultySelector.value;
        const randomText = texts[selectedDifficulty][Math.floor(Math.random() * texts[selectedDifficulty].length)];
        sampleText.textContent = randomText;
        typingArea.value = ''; // Clear the typing area
    }

    function startTest() {
        startTime = new Date();
        typingArea.disabled = false;
        typingArea.value = ''; // Clear the typing area
        typingArea.focus(); // Focus on the typing area
        retryButton.disabled = true; // Disable the retry button
    }

    function stopTest() {
        endTime = new Date();
        const testTime = (endTime - startTime) / 1000; // time in seconds
        timeDisplay.textContent = testTime.toFixed(2) + 's';
        typingArea.disabled = true;
        retryButton.disabled = false; // Enable the retry button

        // Calculate WPM
        const typedText = typingArea.value.trim();
        const sampleWords = sampleText.textContent.trim().split(/\s+/);
        const typedWords = typedText.split(/\s+/);
        let correctWords = 0;

        for (let i = 0; i < typedWords.length; i++) {
            if (typedWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        const wpm = Math.round((correctWords / testTime) * 60);
        wpmDisplay.textContent = wpm;

        // Display difficulty level
        levelDisplay.textContent = difficultySelector.value.charAt(0).toUpperCase() + difficultySelector.value.slice(1);
    }

    function highlightTyping() {
        const typedText = typingArea.value;
        const sampleWords = sampleText.textContent.split(/\s+/);
        const typedWords = typedText.split(/\s+/);
        let highlightedText = '';

        for (let i = 0; i < sampleWords.length; i++) {
            if (typedWords[i] === undefined) {
                highlightedText += `<span>${sampleWords[i]}</span> `;
            } else if (typedWords[i] === sampleWords[i]) {
                highlightedText += `<span style="color: blue;">${sampleWords[i]}</span> `;
            } else {
                highlightedText += `<span style="color: red;">${sampleWords[i]}</span> `;
            }
        }

        sampleText.innerHTML = highlightedText.trim();
    }

    function handleTyping(event) {
        if (!startTime) {
            startTest();
        }
        if (event.key === 'Enter') {
            stopTest();
        } else {
            highlightTyping();
        }
    }

    function resetTest() {
        startTime = null;
        endTime = null;
        typingArea.value = '';
        timeDisplay.textContent = '0';
        wpmDisplay.textContent = '0';
        levelDisplay.textContent = difficultySelector.value.charAt(0).toUpperCase() + difficultySelector.value.slice(1);
        updateSampleText(); // Load a new sample sentence
        typingArea.disabled = false;
        typingArea.focus();
        retryButton.disabled = false; // Enable the retry button
    }

    difficultySelector.addEventListener('change', updateSampleText);
    typingArea.addEventListener('input', highlightTyping);
    typingArea.addEventListener('keydown', handleTyping);
    retryButton.addEventListener('click', resetTest);

     // Instructions button event listener
     instructionsButton.addEventListener('click', function() {
        const instructionsModal = new bootstrap.Modal(document.getElementById('instructionsModal'));
        instructionsModal.show();
    });
});