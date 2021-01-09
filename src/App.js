import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieSearchReturnValues: [],
      movieSearchTerms: '',
    }
  }
  
  useMovieSearchEngine = (e) => {
    e.preventDefault();

    this.setState({
      movieSearchReturnValues: []
    });

    const pointerToThis = this;

    let tempArr = [];

    var url = "http://www.omdbapi.com/?apikey=b3315029&s=";
    var imdbURL = "https://www.imdb.com/title/";
    var plotURL = "http://www.omdbapi.com/?apikey=b3315029&i=";

    url = url + this.state.movieSearchTerms;

    fetch(url)
      .then(
        function (response) {
          if (response) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        }
      )
      .then(
        function (data) {
          tempArr = data;
          for (var key in tempArr.Search) {
            return fetch(plotURL + tempArr.Search[key].imdbID);
          }
        }
      )
      .then(
        function(response) {
          if (response) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        }
      )
      .then(
        function(response) {
          // console.log(tempArr)
          for (var key2 in tempArr.Search) {
            if (tempArr.Search[key2].Type === "movie") {
              pointerToThis.state.movieSearchReturnValues.push({
                title: tempArr.Search[key2].Title,
                year: tempArr.Search[key2].Year,
                imdbURL: imdbURL + tempArr.Search[key2].imdbID,
                plot: response.Plot
              });
            }
          }
          pointerToThis.forceUpdate();
        }
      )
  }

  changemovieSearchTerms = (e) => {
    this.setState({
      movieSearchTerms: e.target.value
    });
  }

  render() {
    let movieSearchResults = [];
    console.log(this.state.movieSearchReturnValues)

    for (var key3 in this.state.movieSearchReturnValues) {
      movieSearchResults.push(
        <div className="searchResultDiv" key={key3}>
          <h3><a target="_blank" rel="noreferrer" href={this.state.movieSearchReturnValues[key3].imdbURL}>{this.state.movieSearchReturnValues[key3].title}</a></h3>
          <p>({this.state.movieSearchReturnValues[key3].year})</p>
          <p className="description" dangerouslySetInnerHTML={{__html: this.state.movieSearchReturnValues[key3].plot}}></p>
          <button> Nominate
          <svg className="smallIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
            <path
              fill="#FFF"
              d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
              transform="translate(-72.78 -19.613)"
            ></path>
          </svg>
          </button>
        </div>
      );
    }
    console.log(movieSearchResults)

    return (
      <div className="App">
        <svg
          className = "icon"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 512 512"
          version="1.1"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <path
            fill="#5C5560"
            d="M512 256c0 46.049-12.152 89.255-33.447 126.589a253.796 253.796 0 01-5.256 8.808c-27.136 43.468-66.957 78.211-114.291 99.035a252.423 252.423 0 01-23.98 9.132 248.773 248.773 0 01-14.66 4.274 244.656 244.656 0 01-13.27 3.062A257.095 257.095 0 01256 512c-50.761 0-98.053-14.764-137.843-40.249-26.049-16.666-48.87-37.93-67.344-62.631C18.902 366.414 0 313.407 0 256 0 119.986 106.078 8.746 240.013.491c3.323-.209 6.656-.345 10.01-.418h.042C252.04.021 254.015 0 256 0c141.385 0 256 114.615 256 256z"
          ></path>
          <path
            fill="#3E8E33"
            d="M478.553 382.589a253.796 253.796 0 01-5.256 8.808c-27.136 43.468-66.957 78.211-114.291 99.035a252.423 252.423 0 01-23.98 9.132 248.773 248.773 0 01-14.66 4.274l32.172-444.771 39.999 34.994 42.998 1.003 43.018 287.525z"
          ></path>
          <path
            fill="#7FC029"
            d="M334.503 64.92c-10.909-28.421-28.212-53.77-56.592-49.246-6.51-8.631-15.475-14.858-27.847-15.6h-.042A38.22 38.22 0 00247.536 0c-2.529 0-5.036.167-7.523.491-44.116 5.778-80.238 61.67-93.8 125.555l-61.67 20.02-33.73 263.053c18.474 24.701 41.294 45.965 67.344 62.631l188.938 35.15a252.045 252.045 0 0027.93-7.335l17.512-440.498-18.034 5.853zm-168.74 54.784s8.777-27.638 20.773-52.642c12.006-24.994 51.001-61.001 73.007-47.501.658.408 1.296.846 1.902 1.317-25.266 11.661-45.108 38.922-55.223 85.692l-40.459 13.134zm110.978-36.029l-49.622 16.102s9.467-51.493 44.534-64.136c7.753 19.916 5.088 48.034 5.088 48.034zm18.296-5.945s0-23.291-7.795-44.377c17.983 1.881 27.209 21.138 31.754 36.603l-23.959 7.774z"
          ></path>
          <path
            fill="#FDFEFD"
            d="M124.166 361.18c8.989 6.496 17.982 13.095 28.394 17.355 4.479 1.833 9.049 3.257 13.847 4.031 8.615 1.39 16.428.24 21.909-7.294 5.745-7.896 4.726-16.319.905-24.618-2.627-5.703-7.027-10.088-11.685-14.164a1345.165 1345.165 0 00-18.208-15.608c-19.831-16.728-25.971-38.429-22.478-63.301 6.09-43.363 38.335-74.347 81.947-79.659 18.748-2.284 37.14-2.101 55.257 4.017 4.067 1.373 4.472 3.029 3.173 6.77a2376.112 2376.112 0 00-16.485 49.19c-1.073 3.322-1.957 3.871-5.355 2.478-13.872-5.686-28.219-9.078-43.355-6.541-10.524 1.764-18.977 6.377-21.938 17.566-2.084 7.876.677 14.423 6.278 19.929 7.749 7.619 16.779 13.654 25.338 20.269 10.342 7.995 19.913 16.743 26.603 28.148 11.917 20.317 12.047 42.002 5.861 63.793-10.463 36.858-42.119 56.749-80.196 51.942-22.131-2.794-41.667-10.842-58.611-25.37-3.81-3.266-5.243-6.207-3.364-11.47 3.967-11.105 6.995-22.546 10.398-33.852.375-1.245.428-2.629 1.765-3.611z"
          ></path>
        </svg>
        <h1>The Shoppies</h1>
        <h2>Movie Title:</h2>
        <form action="">
          <input type="text" value={this.state.movieSearchTerms || ''} onChange={this.changemovieSearchTerms} placeholder='Search for your Shoppies Nominee' />
          <button type='submit' onClick={this.useMovieSearchEngine}>Search</button>
        </form>
        <div></div>
        <div className="column1"> 
          <h4>Seach Results</h4>
          {movieSearchResults} 
        </div>
        <div className="column2" >
          <h5>Nominations</h5>
        </div>
      </div>
    );
  }
}

export default App;