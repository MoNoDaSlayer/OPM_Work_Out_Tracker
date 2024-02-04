// script.js
document.addEventListener('DOMContentLoaded', function() {
    initializeTracker();
});

function initializeTracker() {
    var exerciseList = document.getElementById('exerciseList');
    var exercises = [
        { name: 'Push-ups', target: 100 },
        { name: 'Sit-ups', target: 100 },
        { name: 'Squats', target: 100 },
        { name: '10km Run', target: 10 }
    ];

    for (var i = 0; i < exercises.length; i++) {
        var exerciseItem = document.createElement('li');
        exerciseItem.className = 'exercise';

        var exerciseText = document.createElement('span');
        exerciseText.textContent = exercises[i].name;

        var inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';

        var inputField = document.createElement('input');
        inputField.type = 'text';

        var progressBox = document.createElement('div');
        progressBox.className = 'progress';

        inputContainer.appendChild(inputField);
        exerciseItem.appendChild(exerciseText);
        exerciseItem.appendChild(inputContainer);
        exerciseItem.appendChild(progressBox);
        exerciseList.appendChild(exerciseItem);
    }

    loadProgress();
}

function loadProgress() {
    // Load progress from localStorage
    var exerciseList = document.getElementById('exerciseList');
    var items = exerciseList.getElementsByTagName('li');

    for (var i = 0; i < items.length; i++) {
        var exercise = items[i].getElementsByTagName('span')[0];
        var inputField = items[i].getElementsByTagName('input')[0];

        var savedProgress = localStorage.getItem(exercise.textContent);

        if (savedProgress !== null) {
            inputField.value = savedProgress;
        }
    }

    updateProgress();
}

function updateProgress() {
    var exerciseList = document.getElementById('exerciseList');
    var items = exerciseList.getElementsByTagName('li');

    for (var i = 0; i < items.length; i++) {
        var inputField = items[i].getElementsByTagName('input')[0];
        var progressBox = items[i].getElementsByClassName('progress')[0];
        var exercise = items[i].getElementsByTagName('span')[0];

        if (inputField.value.trim() !== '') {
            var completed = parseInt(inputField.value);
            var target = getTargetValue(exercise.textContent);

            if (completed >= target) {
                exercise.classList.add('completed');
                progressBox.textContent = '100%';
            } else {
                exercise.classList.remove('completed');
                var percentage = Math.round((completed / target) * 100);
                progressBox.textContent = percentage + '%';
            }
        } else {
            exercise.classList.remove('completed');
            progressBox.textContent = '0%';
        }
    }
}

function saveProgress() {
    var exerciseList = document.getElementById('exerciseList');
    var items = exerciseList.getElementsByTagName('li');

    for (var i = 0; i < items.length; i++) {
        var exercise = items[i].getElementsByTagName('span')[0];
        var inputField = items[i].getElementsByTagName('input')[0];

        if (inputField.value.trim() !== '') {
            localStorage.setItem(exercise.textContent, inputField.value);
        }
    }

    updateProgress();
}

function restartRoutine() {
    var exerciseList = document.getElementById('exerciseList');
    var items = exerciseList.getElementsByTagName('li');

    for (var i = 0; i < items.length; i++) {
        var exercise = items[i].getElementsByTagName('span')[0];
        var inputField = items[i].getElementsByTagName('input')[0];

        localStorage.removeItem(exercise.textContent);
        inputField.value = '';
    }

    updateProgress();
}

function getTargetValue(exerciseName) {
    var exercises = {
        'Push-ups': 100,
        'Sit-ups': 100,
        'Squats': 100,
        '10km Run': 10
    };

    return exercises[exerciseName] || 0;
}

function completeWorkout() {
    var inputFields = document.querySelectorAll('.input-container input');

    inputFields.forEach(function(inputField) {
        inputField.value = getTargetValue(inputField.closest('.exercise').getElementsByTagName('span')[0].textContent);
    });

    updateProgress();
}
