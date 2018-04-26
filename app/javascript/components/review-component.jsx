import React from 'react';
import moment from 'moment';

class ReviewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.destroyReview = this.destroyReview.bind(this);
    this.editReview = this.editReview.bind(this);
  }

  destroyReview(e) {
    e.preventDefault();
    // let blockId = e.target.dataset.block_id;
    // let blockUrl = e.target.dataset.block_url;
    if (window.confirm("Are you sure?")) {
      this.props.destroyReview({url: this.props.review.links.self})
    }
  }

  editReview(e) {
    e.preventDefault();
    this.props.editReview(this.props.review)
  }

  render() {
    const review = this.props.review;

    let destroyLink;
    let editLink;
    if (review.attributes.destroyable) {
      destroyLink = <i onClick={ this.destroyReview } data-review_id={ review.id } data-review_url={ review.links.self } className="fa fa-trash-o" aria-hidden="true"></i>
    }
    if (review.attributes.updatable) {
      editLink = <i onClick={ this.editReview } data-review_id={ review.id } data-review_url={ review.links.self } className="fa fa-pencil" aria-hidden="true"></i>
    }


    return(
      <div key={ review.id } className="card list-group-item">
        <div className="card-block">
          <small className='pull-right'>{ moment(review.attributes.updatedAt).fromNow() }</small>
          <h5 className="">{ review.attributes.status }</h5>
          <p className="">{ review.attributes.comment }</p>
          <div>
            <small>{ review.attributes.userFullName } <span className='badge badge-info'>{ review.relationships.user.data.type }</span></small>
            <div className='pull-right'>
              { editLink }
              { destroyLink }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewComponent;
