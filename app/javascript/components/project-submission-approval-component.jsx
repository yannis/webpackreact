import React from 'react';
import Flash from '../utilities/flash';

class ProjectSubmissionApprovalComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    let _this = this;
    let value = e.target.value;
    let setValue = true;
    if (value === 'rejected') {
      setValue = window.confirm("Are you sure you want to reject this? It will notify the learner by email and ask him to resubmit.")
    }
    if (value === 'approved') {
      setValue = window.confirm("Are you sure you want to approve this? It will notify the learner by email and congratulate her!")
    }
    if (setValue) {
      this.setState({
        value
      })
      let data = {
        approves: {
          value
        }
      }
      $.ajax({
        beforeSend: function(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))} ,
        url: this.props.url,
        type: 'post',
        data
      }).done( (response, message, xhr) => {
        Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
        _this.setState({value: response.value})
      }).fail((response, message, xhr) => {
        Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      });
    }
  }

  render() {
    let _this = this;
    let radios = [];
    let disabled = _.includes(['approved', 'rejected'], this.state.value);
    ['approved', 'rejected', 'pending'].forEach((value, i) => {
      let text = value === 'approval_required' ? "don't know" : value;
      radios.push(<div key={i} className="form-check form-check-inline">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type='radio'
            name='approve'
            value={value}
            checked={value === _this.state.value}
            onChange={_this.handleChange}
            disabled={ disabled } />
          { text }
        </label>
      </div>)
    })

    return(
      <form>
        { radios }
      </form>
    )
  }
}

export default ProjectSubmissionApprovalComponent;
