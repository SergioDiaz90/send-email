// variables
const sendButton = document.querySelector('#enviar');
const sendMail = document.querySelector('#enviar-mail');
const resetButton = document.querySelector('#resetBtn');
// inputs text
const emailInput = document.querySelector('#email');
const subjectInput = document.querySelector('#asunto');
const messageInput = document.querySelector('#mensaje');
// Regex expresion
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/** function for despatch events*/
eventListeners();
function eventListeners() {
	document.addEventListener('DOMContentLoaded', runApp);
	
	// textarea inputs form
	emailInput.addEventListener('blur', validateForm);
	subjectInput.addEventListener('blur', validateForm);
	messageInput.addEventListener('blur', validateForm);
	// send menssage
	sendMail.addEventListener('submit', sendMessage);
	//reset form
	resetButton.addEventListener('click', formReset);
}
// functions
function runApp () {
	// deshabilidar boton
	sendButton.disabled = true;
	sendButton.classList.add('cursor-not-allowed', 'opacity-50');
}

function validateForm (e) {
	switch (e.target.type) {
		case 'email':
			if (e.target.value.length === 0) {
				e.target.classList.add('border', 'border-red-500');
				seeError('This field is required');
				break;
			} else if (!regex.test(emailInput.value)) {
				e.target.classList.add('border', 'border-red-500');
				seeError('this email is not valid');
				break;
			} else {
				removeError(e.target);
			}
		case 'text':
			if (e.target.value.length === 0) {
				e.target.classList.remove('border', 'border-green-500');
				e.target.classList.add('border', 'border-red-500');
				seeError('this field cannot be empty');
			} else {
				removeError(e.target);
			}
			break;
		case 'textarea':
			if (e.target.value.length === 0) {
				e.target.classList.add('border', 'border-red-500');
				seeError('this field cannot be empty');
			} else {
				removeError(e.target);
			}
			break;
	};
	fieldsValue ();
}

function seeError(msn) {
	const messageError = document.createElement('p');
	messageError.textContent = msn;
	messageError.classList.add(
		'border', 'border-red-500', 
		'background-red-100', 'text-red-500', 
		'p-3', 'mt-5', 'text-center', 'error');

	const error = document.querySelectorAll('.error');
	if (error.length === 0){
		// sendMail.appendChild(messageError);
		sendMail.insertBefore(messageError, document.querySelector('.mb-10'));
	}
}

function removeError (msn) {
	try {
		const err = document.querySelector('.error');
		err.remove();
	} catch (error) {
		msn.classList.remove('border', 'border-red-500');
		msn.classList.add('border', 'border-green-500');
	} finally {
		msn.classList.remove('border', 'border-red-500');
		msn.classList.add('border', 'border-green-500');
	}
}

// Function for validate any field empty -> hoisting :P
function fieldsValue () {
	if (regex.test(emailInput.value) && sendMail.value !== '' && messageInput.value !== '') {
		sendButton.disabled = false;
		sendButton.classList.remove('cursor-not-allowed', 'opacity-50');
	}
}

function sendMessage (e) {
	e.preventDefault();
	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';

	//timer
	setTimeout(() => {
		spinner.style.display = 'none';
		const textCorrect = document.createElement('p');
		textCorrect.textContent = 'El mensaje se envió correctamente';
		textCorrect.classList.add('text-center', 'my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold');
		sendMail.insertBefore(textCorrect, spinner);

		// delete menssage
		setTimeout(() => {
			textCorrect.remove();
			formReset();
		}, 3000);
	}, 3000);
}

function formReset() {
	sendMail.reset();
	runApp();
}