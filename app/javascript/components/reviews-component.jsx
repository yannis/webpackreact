import React from 'react';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReviewComponent from './review-component';
import ReviewFormComponent from './review-form-component';
import autosize from 'autosize/dist/autosize.js';

class ReviewsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.destroyReview = this.destroyReview.bind(this);
    this.editReview = this.editReview.bind(this);
  }

  destroyReview(payload) {
    this.props.actions.fetchData({
      url: payload.url,
      method: 'delete',
      success: Actions.REMOVE_REVIEW
    })
  }

  editReview(review) {
    this.props.actions.editElement(review)
  }

  render() {
    let reviews = <p>No reviews yet</p>;
    if (this.props.reviews.length) {
      reviews = this.props.reviews.map((review, index) => {
        return(<ReviewComponent review={ review } key={ index } destroyReview={ this.destroyReview } editReview={ this.editReview } />)
      })
    }
    let reviewLink;
    if (this.props.unit.attributes.reviewable) {
      reviewLink = <a onClick={ this.props.setBlockForm } href="#" data-block_type='review'>+</a>
      // reviewForm = <li className='list-group-item'><ReviewFormComponent url={ this.props.url } /></li>;
    }
    return(
      <div className='unit-reviews'>
        <h2>Reviews { reviewLink }</h2>
        <div className='list-group'>
          { reviews }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reviews: state.reviews.reviews,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsComponent);
