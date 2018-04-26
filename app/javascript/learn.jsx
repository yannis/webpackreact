import React from 'react';
import ReactDom, { render } from 'react-dom';
import LearnUnitComponent from './components/learn/units/learn-unit-component';
import LearnUnitButtonComponent from './components/learn/units/learn-unit-button-component';
import LearnQuestionsContainer from './containers/learn/questions';
import LearnQuestionFormComponent from './components/learn/questions/learn-question-form-component';
import LearnCommentsContainer from './containers/learn/comments';
import LearnCommentFormComponent from './components/learn/comments/learn-comment-form-component';
import BookmarkComponent from './components/learn/bookmarks/bookmark-component';
import PhoneInputComponent from './components/learn/phone-input/phone-input';
import MarkdownPreviewTextarea from './components/markdown-preview-textarea-component';
import { Provider } from 'react-redux';
import configureStore from './store/learn/configureStore'

const store = configureStore();

document.addEventListener("turbolinks:load", () => {
  let unitElement = document.getElementById('learn-unit-component');
  if (unitElement) {
    let data = unitElement.dataset.data;
    let completed = unitElement.dataset.completed;
    render(
      <Provider store={ store }>
        <LearnUnitComponent
          data={ data }
          completed={ completed }
        />
      </Provider>, unitElement);
  }

  let unitButtonElement = document.getElementById('learn-unit-button-component');
  if (unitButtonElement) {
    let progressUrl = unitButtonElement.dataset.progressUrl;
    render(
      <Provider store={ store }>
        <LearnUnitButtonComponent
          progressUrl={ progressUrl }
        />
      </Provider>, unitButtonElement);
  }

  let bookmarkElement = document.getElementById('bookmark-component');
  if (bookmarkElement) {
    let bookmarkId = bookmarkElement.dataset.bookmarkId;
    let url = bookmarkElement.dataset.url;
    render(
      <BookmarkComponent
        bookmarkId={ bookmarkId }
        url={ url }
      />, bookmarkElement);
  }

  let phoneInputs = document.getElementsByClassName('phone-input');
  [].forEach.call(phoneInputs, (phoneInput) => {
    let value = phoneInput.dataset.value;
    let name = phoneInput.dataset.name;
    let flags = phoneInput.dataset.flags;
    let inputId = phoneInput.dataset.inputId;
    render(<PhoneInputComponent
            value={value}
            name={name}
            flags={flags}
            inputId={inputId}
          />, phoneInput);
  })

  let mdInputs = document.getElementsByClassName('form-md-input');
  [].forEach.call(mdInputs, (mdInput) => {
    let label = mdInput.dataset.label;
    let labelClassName = mdInput.dataset.labelClassName;
    let id = mdInput.dataset.id;
    let className = mdInput.dataset.className;
    let mdName = mdInput.dataset.mdName;
    let htmlName = mdInput.dataset.htmlName;
    let value = mdInput.dataset.value;
    let required = mdInput.dataset.required;
    render(
      <MarkdownPreviewTextarea
        label={label}
        labelClassName={labelClassName}
        id={id}
        className={className}
        mdName={mdName}
        htmlName={htmlName}
        value={value}
        required={required}
      />,
      mdInput
    );
  })

  let questionsComponent = document.getElementById('learn-unit-questions-component');
  if (questionsComponent) {
    let url = questionsComponent.dataset.url;
    let currentUserAvatarUrl = questionsComponent.dataset.currentUserAvatarUrl;
    render(
      <Provider store={store}>
        <LearnQuestionsContainer
          url={url}
          currentUserAvatarUrl={currentUserAvatarUrl}
        />
      </Provider>, questionsComponent);
  }

  let questionFormComponent = document.getElementById('learn-unit-question-form-component');
  if (questionFormComponent) {
    let url = questionFormComponent.dataset.url;
    render(
      <Provider store={store}>
        <LearnQuestionFormComponent
          url={url}
        />
      </Provider>, questionFormComponent);
  }

  let commentsComponent = document.getElementById('learn-comments-component');
  if (commentsComponent) {
    let url = commentsComponent.dataset.url;
    let currentUserAvatarUrl = commentsComponent.dataset.currentUserAvatarUrl;
    render(
      <Provider store={store}>
        <LearnCommentsContainer
          url={url}
          currentUserAvatarUrl={currentUserAvatarUrl}
        />
      </Provider>, commentsComponent);
  }

  let commentFormComponent = document.getElementById('learn-project-comment-form-component');
  if (commentFormComponent) {
    let url = commentFormComponent.dataset.url;
    render(
      <Provider store={store}>
        <LearnCommentFormComponent
          url={url}
        />
      </Provider>, commentFormComponent);
  }
})
