// see http://stackoverflow.com/questions/26964974/handle-rails-flash-messages-after-ajax-calls-using-reactjs
import React from 'react';

class FlashMessages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages
    }
    this.messages = this.messages.bind(this)
  }

  messages(messageObject) {
    this.setState({
      messages: messageObject,
    });
  }

  render() {
    let flashNodes = [];
    this.state.messages.map(function(message, index) {
      flashNodes.push(<FlashMessage key={ index } level={ message.type } text={ message.text } />)
    })
    return (
      <div className='flash_messages_component'>
        { flashNodes }
      </div>
    )
  }
};

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    let flash = ['alert fade show', 'alert-'+props.level];
    if (props.level === 'notice') {
      flash.push('alert-success');
    }
    if (props.level === 'error') {
      flash.push('alert-danger');
    }
    this.state = {
      flashClass: flash.join(' ')
    }
  }

  render() {
    let clazz = this.state.flashClass;
    return (
      <div key={ this.props.index } role='alert' className={ clazz } title={ this.props.type } >
        <div className="container">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          { this.props.text }
        </div>
      </div>
    )
  }
};

export default FlashMessages;
