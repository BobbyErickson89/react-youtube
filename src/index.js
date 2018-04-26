import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from  './components/video_list';
import VideoDetail from './components/video';
import registerServiceWorker from './registerServiceWorker';
import {YOUTUBE_API_KEY} from "./constants"; //constants is ignored by git.  We don't want api_keys commited.
// const API_KEY = 'AIzaSyCZ0J_1pL_u0YttNcVEfK2xgQUxs5CLJEY';

// Create a new component.  This component should produce some HTML.
class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null,
        };

        this.videoSearch('guns n roses');
    }

    videoSearch(term) {
        YTSearch({ key: YOUTUBE_API_KEY, term: term}, (videos) => {
            console.log(videos);

            this.setState({
                videos: videos,
                selectedVideo: videos[0],
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar
                    onSearchTermChange={videoSearch}
                />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos}
                />
            </div>
        );
    }
}

// Take this component's generated HTML and put it on the page (in the DOM).
ReactDOM.render(<App />, document.querySelector('#root'));

//TODO: look up what registerServieWorker does.  Came with create-react-app.
registerServiceWorker();
