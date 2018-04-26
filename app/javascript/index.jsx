import React from 'react';
import ReactDom, { render } from 'react-dom';
import UnitContainer from './containers/unit';
import UnitsContainer from './containers/units';
import SubjectsContainer from './containers/subjects';
import QuestionContainer from './containers/question';
import LearnCommentsContainer from './containers/learn/comments';
import LearnCommentFormComponent from './components/learn/comments/learn-comment-form-component';
import SubscriptionsComponent from './components/subscriptions/subscriptions-component';
import UnitsDashboardComponent from './components/units/units-dashboard-component';
import ApprovalComponent from './components/approval-component';
import ResourcesComponent from './components/resources/resources-component';
import ProjectSubmissionApprovalComponent from './components/project-submission-approval-component';
import NotesComponent from './components/notes/notes-component';
import MarkdownPreviewTextarea from './components/markdown-preview-textarea-component';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'

const store = configureStore();

document.addEventListener("turbolinks:load", () => {
  let unitElement = document.getElementById('unit-component');
  if (unitElement) {
    let unitUrl = unitElement.dataset.url;
    let teachersUrl = unitElement.dataset.teachersUrl;
    let resourcesBucket = unitElement.dataset.resourcesBucket;
    render(
      <Provider store={ store }>
        <UnitContainer unitUrl={ unitUrl } teachersUrl={ teachersUrl } resourcesBucket={resourcesBucket}/>
      </Provider>,
    unitElement);
  }

  let unitsElement = document.getElementById('units-table-component');
  if (unitsElement) {
    let unitsUrl = unitsElement.dataset.url;
    let unitsNewUrl = unitsElement.dataset.unitsNewUrl;
    let unitsParam = unitsElement.dataset.param;
    render(
      <Provider store={ store }>
        <UnitsContainer
          unitsUrl={ unitsUrl }
          unitsNewUrl={ unitsNewUrl }
          unitsParam={unitsParam}
        />
      </Provider>,
    unitsElement);
  }

  let subjectsElement = document.getElementById('subjects-table-component');
  if (subjectsElement) {
    let subjectsUrl = subjectsElement.dataset.url;
    let subjectsNewUrl = subjectsElement.dataset.subjectsNewUrl;
    let subjectsParam = subjectsElement.dataset.param;
    render(
      <Provider store={ store }>
        <SubjectsContainer
          subjectsUrl={ subjectsUrl }
          subjectsNewUrl={ subjectsNewUrl }
          subjectsParam={ subjectsParam }
        />
      </Provider>,
    subjectsElement);
  }

  let subscriptionsElement = document.getElementById('subscriptions-table-component');
  if (subscriptionsElement) {
    let subscriptionsUrl = subscriptionsElement.dataset.url;
    render(
      <SubscriptionsComponent
        subscriptionsUrl={subscriptionsUrl}
      />,
    subscriptionsElement);
  }

  let approvables = document.getElementsByClassName('approval-component');
  [].forEach.call(approvables, (approvable) => {
    let url = approvable.dataset.url;
    let objectName = approvable.dataset.object;
    let value = approvable.dataset.value;
    render(<ApprovalComponent
            url={url}
            objectName={objectName}
            value={value}
          />, approvable);
  })

  let projectSubmissions = document.getElementsByClassName('project-submission-approval-component');
  [].forEach.call(projectSubmissions, (projectSubmission) => {
    let url = projectSubmission.dataset.url;
    let value = projectSubmission.dataset.value;
    render(<ProjectSubmissionApprovalComponent
            url={url}
            value={value}
          />, projectSubmission);
  })

  let notesComponents = document.getElementsByClassName('learner-notes-component');
  [].forEach.call(notesComponents, (notesComponent) => {
    let url = notesComponent.dataset.url;
    render(<NotesComponent url={url} />, notesComponent);
  })

  let unitsDashboardElement = document.getElementById('units-dashboard-component');
  if (unitsDashboardElement) {
    let unitsUrl = unitsDashboardElement.dataset.url;
    render(<UnitsDashboardComponent unitsUrl={ unitsUrl } />, unitsDashboardElement);
  }

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
        label={ label }
        labelClassName={ labelClassName }
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

  let questionComponent = document.getElementById('question-component');
  if (questionComponent) {
    let question = questionComponent.dataset.question;
    let currentUserAvatarUrl = questionComponent.dataset.currentUserAvatarUrl;
    render(
      <Provider store={store}>
        <QuestionContainer
          question={question}
          currentUserAvatarUrl={currentUserAvatarUrl}
        />
      </Provider>, questionComponent);
  }

  let resourcesComponent = document.getElementById('resources-component');
  if (resourcesComponent) {
    let url = resourcesComponent.dataset.url;
    let sorterUrl = resourcesComponent.dataset.sorterUrl;
    let resourcesBucket = resourcesComponent.dataset.resourcesBucket;
    render(
      <Provider store={store}>
        <ResourcesComponent
          url={url}
          sorterUrl={sorterUrl}
          resourcesBucket={resourcesBucket}
        />
      </Provider>, resourcesComponent);
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