import React from 'react';
import ReactDom from 'react-dom';
import Sortable from 'sortablejs';
import Flash from '../utilities/flash';

class SortableListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    let _this = this;
    this.loadItems();
    const node = ReactDom.findDOMNode(this);
    Sortable.create(node, {
      onUpdate(event)  {
        let itemEl = event.item;  // dragged HTMLElement
        let url = _this.props.sorterUrl;
        let ids = $(this.el.children).map((index, li) => {
          return li.dataset.id;
        });
        $.ajax({
          beforeSend: function(xhr) { xhr.setRequestHeader('X-CSRF-Token', Rails.csrfToken()) },
          url: url,
          type: 'post',
          data: {
            ids: ids.toArray()
          }
        }).done( (response, message, xhr) => {
          Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
          if (_this.props.reload) {
            window.location.reload()
          } else {
            _this.setState(() => {
              return {
                items: response.data
              }
            })
          }
        }).fail((xhr) => {
          Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
        });
      },
    });
  }

  loadItems() {
    $.ajax({
      url: this.props.sorterUrl,
      method: 'get'
    }).done((response) => {
      this.setState(() => {
        return {
          items: response.data
        }
      })
    }).fail(() => {
      debugger
    })
  }

  render() {
    let items = this.state.items.map((item, index) => {
      return <ItemComponent index={index} item={ item } key={ item.id } itemsUrl={ this.props.itemsUrl } />
    })
    return (
      <ul className="list-blank">
        { items }
      </ul>
    );
  }
}

class ItemComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let item = this.props.item;
    let itemUrl = [this.props.itemsUrl, item.attributes.slug].join('/');
    return (
      <li data-id={ item.id }>
        <svg className="icon sz-18"><use xlinkHref={ SpritePath + '#move' } /></svg>
        <span className="badge badge-pill badge-light">{ this.props.index + 1 }</span>
        <a href={ itemUrl } className='link'>{ item.attributes.fullTitle || item.attributes.title }</a>
      </li>
      // <li className='list-group-item justify-content-between' data-id={ item.id } >
      //   <span>
      //     <i className="fa fa-sort" aria-hidden="true"></i>
      //     <span className="badge badge-default badge-pill">{ this.props.index + 1 }</span>
      //     { ' '}
      //     <a href={ itemUrl }>{ item.attributes.fullTitle || item.attributes.title }</a>
      //   </span>
      // </li>
    )
  }
}

$(document).on('turbolinks:load', function(){
  $('.sortable_list').each( (index, element) => {
    let sorterUrl = $(element).data('sorter-url');
    let itemsUrl = $(element).data('items-url');
    let reload = $(element).data('reload');
    ReactDom.render(<SortableListComponent sorterUrl={ sorterUrl } itemsUrl={ itemsUrl } reload={ reload } />, document.getElementById(element.id));
  })
})

export default SortableListComponent;
