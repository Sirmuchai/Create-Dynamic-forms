document.addEventListener('DOMContentLoaded', function() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    const formContainer = document.getElementById('form-preview');

    formData.forEach(question => {
        let div = document.createElement('div');
        div.classList.add('mb-3');

        let questionLabel = document.createElement('label');
        questionLabel.classList.add('form-label');
        questionLabel.textContent = question.label;

        div.appendChild(questionLabel);

        if (question.type === 'short-answer') {
            let inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.classList.add('form-control');
            inputElement.placeholder = 'Your answer';
            div.appendChild(inputElement);
        } else if (question.type === 'long-answer') {
            let textareaElement = document.createElement('textarea');
            textareaElement.classList.add('form-control');
            textareaElement.placeholder = 'Your answer';
            div.appendChild(textareaElement);
        } else if (question.type === 'calendar') {
            let inputElement = document.createElement('input');
            inputElement.type = 'date';
            inputElement.classList.add('form-control');
            div.appendChild(inputElement);
        } else if (question.type === 'time') {
            let inputElement = document.createElement('input');
            inputElement.type = 'time';
            inputElement.classList.add('form-control');
            div.appendChild(inputElement);
        } else if (question.type === 'file-upload') {
            let inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.classList.add('form-control');
            div.appendChild(inputElement);
        } else if (question.type === 'radio-button') {
            question.options.forEach(option => {
                let divOption = document.createElement('div');
                divOption.classList.add('form-check');

                let inputElement = document.createElement('input');
                inputElement.type = 'radio';
                inputElement.name = `radio-${question.label}`;
                inputElement.classList.add('form-check-input');

                let labelElement = document.createElement('label');
                labelElement.classList.add('form-check-label');
                labelElement.textContent = option;

                divOption.appendChild(inputElement);
                divOption.appendChild(labelElement);
                div.appendChild(divOption);
            });
        } else if (question.type === 'checkbox') {
            question.options.forEach(option => {
                let divOption = document.createElement('div');
                divOption.classList.add('form-check');

                let inputElement = document.createElement('input');
                inputElement.type = 'checkbox';
                inputElement.classList.add('form-check-input');

                let labelElement = document.createElement('label');
                labelElement.classList.add('form-check-label');
                labelElement.textContent = option;

                divOption.appendChild(inputElement);
                divOption.appendChild(labelElement);
                div.appendChild(divOption);
            });
        }

        formContainer.appendChild(div);
    });
});
