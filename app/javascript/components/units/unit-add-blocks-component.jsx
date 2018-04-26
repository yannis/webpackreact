import React from 'react';
import ReactDom from 'react-dom';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class UnitAddBlocksComponent extends React.Component {

  constructor(props) {
    super(props);
    this.setBlockForm = this.setBlockForm.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    $(document).on('click', (e) => {
      let target = e.target;
      if (!$(target).is('.dropdown-link dropdown-item')) {
        $('.dropdown-btn').removeClass('open');
      }
    });
  }

  setBlockForm(e) {
    e.preventDefault();
    let value = e.target.dataset.block_type;
    this.props.setBlockForm(value);
  }

  toggle(e) {
    e.preventDefault();
    $(e.target).parents('.dropdown-btn').toggleClass('open');
  }

  render() {
    return (
      <div className='dropdown'>
        <a href='#' onClick={ this.toggle } className="dropdown-toggle btn btn-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add <svg className="icon sz-12 is-light"><use xlinkHref={ SpritePath + '#navigate-down' } /></svg></a>
        <div className='dropdown-menu dropdown-menu-right'>
          <a onClick={ this.setBlockForm } href="#" className='dropdown-item' data-block_type='videos'>Video</a>
          <a onClick={ this.setBlockForm } href="#" className='dropdown-item' data-block_type='pages'>Page</a>
          <a onClick={ this.setBlockForm } href="#" className='dropdown-item' data-block_type='single_choice_quizzs'>Single choice quizz</a>
          <a onClick={ this.setBlockForm } href="#" className='dropdown-item' data-block_type='multiple_choice_quizzs'>Multiple choice quizz</a>
          <a onClick={ this.setBlockForm } href="#" className='dropdown-item' data-block_type='text_quizzs'>Text quizz</a>
          <a onClick={ this.setBlockForm } href="#" className='dropdown-item' data-block_type='figures'>Figure</a>
          <a onClick={ this.setBlockForm } href="#" className='dropdown-item' data-block_type='feedbacks'>Feedback</a>
        </div>
      </div>
    );
  }
}

export default UnitAddBlocksComponent;
