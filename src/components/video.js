import React from 'react';

const VideoDetail = ({video}) => {
    if(!video){
        return <div>Loading...</div>
    }

    const videoId = video.id.videoId;
    const channelLink = `https://www.youtube.com/user/${video.snippet.channelTitle}`;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-container col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url} allowFullScreen></iframe>
            </div>
            <div className="video-details border border-primary">
                <h4>{video.snippet.title}</h4>
                <h6>
                    <a className="video-channel-link" href={channelLink}>{video.snippet.channelTitle}</a>
                </h6>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;