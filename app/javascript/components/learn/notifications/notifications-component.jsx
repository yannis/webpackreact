import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import '../../flash';

class LearnNotificationNav extends React.Component {

  constructor(props) {
    super(props);
    // this.loadSteps = this.loadSteps.bind(this);
    this.state = {
      notifications: []
    };
  }

  componentDidMount() {
    let _this = this;
    $.ajax({
      // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: this.props.url,
      type: 'get',
      data: {
        status: 'unread',
        format: 'json'
      }
    }).done( (response) => {
      let notifications = response.data;
      _this.setState(() => {
        return {
          notifications: notifications,
        }
      })
    });
    this.setupSubscription();
  }

  setupSubscription() {
    let _this = this;
    App.notifications = App.cable.subscriptions.create("NotificationsChannel", {
      // connected: function() {
      //   // Called when the subscription is ready for use on the server
      // },

      // disconnected: function() {
      //   // Called when the subscription has been terminated by the server
      // },

      received: function(notifData) {
        let notification = notifData.data;
        _this.setState(() => {
          return {
            notifications: [notification].concat(_this.state.notifications)
          }
        });
        _this.flashNotification(notification);
      }
    });
  }

  flashNotification(notification) {
    let message = { type: 'notice', text: notification.attributes.text }
    Utilities.FMessages.push(message);
    setTimeout(function(data) {
      Utilities.FMessages.splice(message, 1);
      window.flashDiv.messages(Utilities.FMessages);
    }, 4000);
    window.flashDiv.messages(Utilities.FMessages);
  }

  render() {
    let notificationsLink = [];
    $.each(this.state.notifications, (i, notif) => {
      notificationsLink.push(<NotificationLink notification={ notif } key={ notif.id } />)
    })
    let badgeClasses = "badge badge-pill badge-danger";
    if (this.state.notifications.length < 1) {
      badgeClasses += ' not-shown';
    }
    let notificationCounter;
    if (this.state.notifications.length > 0) {
      notificationCounter = <div className="notification-counter">{this.state.notifications.length}</div>
    }
    return (
      <div>
        <div className="dropdown">
          <a href="#" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <svg className="icon icon-lg icon"><use xlinkHref={ window.SpritePath + '#notifications-active' }/></svg>
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton3">
            { notificationsLink }
            <a className="dropdown-item text-center text-secondary" href={ this.props.notificationsUrl }>View all</a>
          </div>
        </div>
        { notificationCounter }
      </div>
      // <div>
      //   <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
      //     <i className="fa fa-bell"></i><span className={ badgeClasses }>{ this.state.notifications.length }</span>
      //     <b className="caret"></b>
      //   </a>
      //   <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
      //     { notificationsLink }
      //     <div className="dropdown-divider"></div>
      //     <a className="dropdown-item" href={this.props.notificationsUrl}>All notifications</a>
      //   </div>
      // </div>
    );
  }

}

class NotificationLink extends React.Component {
  render() {
    const notification = this.props.notification;
    let shortTitle = jQuery.trim(notification.attributes.title).substring(0, 25);
    return (
      <div>
        <a className="dropdown-item" href={notification.attributes.path} >
          <div>
            { shortTitle }<br />
            <small>{ moment(notification.attributes.createdAt).fromNow() }</small>
          </div>
        </a>
        <div className="dropdown-divider"></div>
      </div>

    )
  }
}

$(document).on('turbolinks:load', function(){
  let $el = $('#learn-navigation-notifications');
  if ($el.length) {
    let url = $el.data('url');
    let notificationsUrl = $el.data('notifications-url');
    render(<LearnNotificationNav url={ url } notificationsUrl={ notificationsUrl } />, $el[0]);
  }
})

export default LearnNotificationNav;
