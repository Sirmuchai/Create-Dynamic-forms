let formData = [];

document.getElementById('add-short-answer').addEventListener('click', function() {
    addQuestionElement('short-answer', 'Short Answer Question');
});

document.getElementById('add-long-answer').addEventListener('click', function() {
    addQuestionElement('long-answer', 'Long Answer Question');
});

document.getElementById('add-calendar').addEventListener('click', function() {
    addQuestionElement('calendar', 'Calendar');
});

document.getElementById('add-time').addEventListener('click', function() {
    addQuestionElement('time', 'Time');
});

document.getElementById('add-file-upload').addEventListener('click', function() {
    addQuestionElement('file-upload', 'File Upload');
});

document.getElementById('add-radio-button').addEventListener('click', function() {
    addQuestionElement('radio-button', 'Radio Button Option', true);
});

document.getElementById('add-checkbox').addEventListener('click', function() {
    addQuestionElement('checkbox', 'Checkbox', true);
});

document.getElementById('preview-form').addEventListener('click', function() {
    localStorage.setItem('formData', JSON.stringify(formData));
    window.location.href = 'preview_form.html';
});

function addQuestionElement(type, label, hasOptions = false) {
    const formBuilder = document.getElementById('form-builder');

    let div = document.createElement('div');
    div.classList.add('mb-3');

    let questionLabel = document.createElement('label');
    questionLabel.classList.add('form-label');
    questionLabel.textContent = label;

    let questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.classList.add('form-control', 'question-text');
    questionInput.placeholder = 'Type your question here';

    div.appendChild(questionLabel);
    div.appendChild(questionInput);

    let questionObject = {
        type: type,
        label: '',
        options: []
    };

    questionInput.addEventListener('input', function() {
        questionObject.label = questionInput.value;
    });

    if (type === 'short-answer') {
        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.classList.add('form-control');
        inputElement.disabled = true;
        inputElement.placeholder = 'Short answer text';
        div.appendChild(inputElement);
    } else if (type === 'long-answer') {
        let textareaElement = document.createElement('textarea');
        textareaElement.classList.add('form-control');
        textareaElement.disabled = true;
        textareaElement.placeholder = 'Long answer text';
        div.appendChild(textareaElement);
    } else if (type === 'calendar') {
        let inputElement = document.createElement('input');
        inputElement.type = 'date';
        inputElement.classList.add('form-control');
        inputElement.disabled = true;
        div.appendChild(inputElement);
    } else if (type === 'time') {
        let inputElement = document.createElement('input');
        inputElement.type = 'time';
        inputElement.classList.add('form-control');
        inputElement.disabled = true;
        div.appendChild(inputElement);
    } else if (type === 'file-upload') {
        let inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.classList.add('form-control');
        inputElement.disabled = true;
        div.appendChild(inputElement);
    } else if (hasOptions) {
        let optionsContainer = document.createElement('div');
        optionsContainer.classList.add('mt-2');

        let addOptionButton = document.createElement('button');
        addOptionButton.type = 'button';
        addOptionButton.classList.add('btn', 'btn-secondary', 'btn-sm');
        addOptionButton.textContent = 'Add Option';
        optionsContainer.appendChild(addOptionButton);

        addOptionButton.addEventListener('click', function() {
            let optionDiv = document.createElement('div');
            optionDiv.classList.add('input-group', 'mb-2');

            let optionInput = document.createElement('input');
            optionInput.type = 'text';
            optionInput.classList.add('form-control', 'option-text');
            optionInput.placeholder = 'Option text';

            let inputElement;
            if (type === 'radio-button') {
                inputElement = document.createElement('input');
                inputElement.type = 'radio';
                inputElement.name = `radio-${formData.length}`;
                inputElement.classList.add('form-check-input');
            } else if (type === 'checkbox') {
                inputElement = document.createElement('input');
                inputElement.type = 'checkbox';
                inputElement.classList.add('form-check-input');
            }

            let inputGroupText = document.createElement('span');
            inputGroupText.classList.add('input-group-text');
            inputGroupText.appendChild(inputElement);

            optionDiv.appendChild(optionInput);
            optionDiv.appendChild(inputGroupText);

            optionsContainer.insertBefore(optionDiv, addOptionButton);

            // Handle the input event when typing
            optionInput.addEventListener('input', function() {
                // Update the last option in the options array
                questionObject.options[questionObject.options.length - 1] = optionInput.value;
            });

            // Handle when the user finishes typing and moves out of the input
            optionInput.addEventListener('blur', function() {
                // If the value is not empty and not already in the options array, add it
                const optionValue = optionInput.value;
                if (optionValue && !questionObject.options.includes(optionValue)) {
                    questionObject.options.push(optionValue);
                }
            });

            // Add a placeholder value to the options array for this option
            questionObject.options.push('');
        });

        div.appendChild(optionsContainer);
    }

    formBuilder.appendChild(div);
    formData.push(questionObject);
}
