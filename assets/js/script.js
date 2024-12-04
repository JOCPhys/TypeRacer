document.addEventListener('DOMContentLoaded', function() {
    const sampleText = document.getElementById('sampleText');
    const difficultySelector = document.getElementById('difficultySelector');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const timeDisplay = document.getElementById('time');
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
    }

    function startTest() {
        startTime = new Date();
        startButton.disabled = true;
        stopButton.disabled = false;
    }

    function stopTest() {
        endTime = new Date();
        const testTime = (endTime - startTime) / 1000; // time in seconds
        timeDisplay.textContent = testTime.toFixed(2);
        startButton.disabled = false;
        stopButton.disabled = true;
    }

    startButton.addEventListener('click', startTest);
    stopButton.addEventListener('click', stopTest);
    difficultySelector.addEventListener('change', updateSampleText);
});
