import React from 'react';
import { render } from 'react-dom';
import YouTube from 'react-youtube';

class YoutubePlayer extends React.Component {
  render() {
    const opts = {
      height: '360',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        rel: 0,
        modestbranding: 1
      }
    };

    return (
      <YouTube
        videoId={ this.props.videoId }
        opts={opts}
        onReady={this._onReady}
        className='video-player'
      />
    );
  }

  // _onReady(event) {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // }
}

$(document).on('turbolinks:load', () => {
  $('.video-player').each( (index, element) => {
    let videoId = $(element).data('video_id');
    render(<YoutubePlayer videoId={ videoId } />, document.getElementById(element.id));
  })
})



export default YoutubePlayer;
