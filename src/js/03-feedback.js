import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const STORAGE_KEY = 'feedback-form-state';
const feedbackFormData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  // email: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(feedbackFormData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

refs.form.addEventListener('input', evt => {
  // console.log(evt.target.name);
  // console.log(evt.target.value);
  feedbackFormData[evt.target.name] = evt.target.value;
  const feedbackFormDataJSON = JSON.stringify(feedbackFormData);
  // console.log(feedbackFormDataJSON);
});

function onTextareaInput(evt) {
  const feedbackMessage = evt.target.value;

  localStorage.setItem(STORAGE_KEY, feedbackMessage);
}

function populateTextarea() {
  const savedFeedbackNessage = localStorage.getItem(STORAGE_KEY);

  if (savedFeedbackNessage) {
    // console.log(savedFeedbackNessage);
    refs.textarea.value = savedFeedbackNessage;
  }
}
