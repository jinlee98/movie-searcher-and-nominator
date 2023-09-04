import React from 'react';
import './App.css';
import Swal from 'sweetalert2'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieSearchReturnValues: [],
      movieSearchTerms: '',
      nominations: [],
    }
  }
  
  useMovieSearchEngine = (e) => {

    e.preventDefault();

    this.setState({
      movieSearchReturnValues: []
    });

    const pointerToThis = this;

    var url = "https://www.omdbapi.com/?apikey=b3315029&type=movie&s=";
    var imdbURL = "https://www.imdb.com/title/";
    var detailedURL = "https://www.omdbapi.com/?apikey=b3315029&i=";

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
          for (var key in data.Search) {
            fetch(detailedURL + data.Search[key].imdbID)
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
                  pointerToThis.state.movieSearchReturnValues.push({
                    title: response.Title,
                    year: response.Year,
                    imdbURL: imdbURL + response.imdbID,
                    plot: response.Plot,
                    rating: response.imdbRating,
                    genre: response.Genre,
                    director: response.Director,
                    nominated: false
                  })            
                  pointerToThis.forceUpdate();
                }
              )
          }
        }
      )
  }

  nominationsFull() {
    if (this.state.nominations.length === 5) {
      return true;
    } else return false;
  }

  nominateMovie(movie) {

    const pointerToThis = this;

    if (pointerToThis.state.nominations.length === 0) {
      pointerToThis.state.nominations.push(movie);

      for(var key in pointerToThis.state.movieSearchReturnValues) {
        if (pointerToThis.state.movieSearchReturnValues[key] === movie) {
          pointerToThis.state.movieSearchReturnValues[key].nominated = true;
        }
      }
    } else if (pointerToThis.state.nominations.length < 5) {
        pointerToThis.state.nominations.push(movie)

        for(var key2 in pointerToThis.state.movieSearchReturnValues) {
          if (pointerToThis.state.movieSearchReturnValues[key2] === movie) {
            pointerToThis.state.movieSearchReturnValues[key2].nominated = true;
          }
        }
    } else Swal.fire({
        icon: 'error',
        iconColor: '#f27474',
        title: 'Sorry...',
        text: 'You can only nominate up to 5 movies!\nPlease try again after removing some.',
        background: '#ffffff'
      })

    pointerToThis.forceUpdate();
  }

  removeNomination(movie) {

    const pointerToThis = this;

    for (var key in pointerToThis.state.movieSearchReturnValues) {
      if (pointerToThis.state.movieSearchReturnValues[key] === movie) {
        pointerToThis.state.movieSearchReturnValues[key].nominated = false;
      }
    }

    for (var key2 in pointerToThis.state.nominations) {
      if (pointerToThis.state.nominations[key2] === movie) {
        pointerToThis.state.nominations.splice(key2, 1);
      }
    }

    pointerToThis.forceUpdate();
  }

  changemovieSearchTerms = (e) => {
    this.setState({
      movieSearchTerms: e.target.value
    });
  }

  render() {

    var isFull = this.nominationsFull();
    let movieSearchResults = [];
    let renderedNominations = [];

    for (var key in this.state.movieSearchReturnValues) {

      let tempVar = this.state.movieSearchReturnValues[key]

      movieSearchResults.push(
        <div className="searchResultDiv" key = {key}>
          <ul className="add">
          <button type="submit" disabled={tempVar.nominated} onClick={() => this.nominateMovie(tempVar)} ><span>Nominate</span></button>
          <h3><a target="_blank" rel="noreferrer" href={tempVar.imdbURL}>{tempVar.title}</a> : {tempVar.genre}</h3>
          <p> Director(s): {tempVar.director}</p>
          <div></div>
          <b> IMDb Rating: {tempVar.rating}/10</b>
          <p>({tempVar.year})</p>
          <p className="description" dangerouslySetInnerHTML={{__html: tempVar.plot}}></p>
          </ul>
        </div>
      );
    }

    for (var key2 in this.state.nominations) {

      let tempVar2 = this.state.nominations[key2]

      renderedNominations.push(
        <div className="searchResultDiv" key={key2}>
          <ul className="add">
            <button className="otherButton" type="submit" onClick={() => this.removeNomination(tempVar2)}>Remove</button>
            <h3>{tempVar2.title}</h3>
            <p> Director(s): {tempVar2.director}</p>
            <p>({tempVar2.year})</p>
          </ul>
        </div>
      );
    }

    return (
      <div className="App">
        {isFull && <h5>Thanks for nominating your favourite movies!</h5>}
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="512"
          height="512"
          viewBox="0 0 512 512"
        >
          <path
            fill="#fde575"
            d="M344 104c-.34 0-.68.01-1.02.02A31.649 31.649 0 00344 96a32.008 32.008 0 00-62.82-8.66 48.117 48.117 0 00-49.19-22.68c.01-.22.01-.44.01-.66a40 40 0 00-79.36-7.12 40.006 40.006 0 00-72.4 27.552A32 32 0 1048 139.708V200h312v-54.12A23.994 23.994 0 00344 104z"
          ></path>
          <path fill="#2b70a8" d="M344 424H56L40 176h320z"></path>
          <path fill="none" d="M360 176l-16 248H104V176z"></path>
          <g fill="#ce3536">
            <path d="M104 176v248H56L40 176zM168 176h64v248h-64zM344 424h-48V176h64z"></path>
          </g>
          <path
            fill="#a52b2b"
            d="M40 168h320a16 16 0 0116 16v16H24v-16a16 16 0 0116-16z"
          ></path>
          <path
            fill="#fae8d8"
            d="M488 376v96a16 16 0 01-16 16H336l-16-32-16 32H168a16 16 0 01-16-16v-96a16 16 0 0116-16h136l16 32 16-32h136a16 16 0 0116 16z"
          ></path>
          <path fill="#2b70a8" d="M184 392h96v64h-96z"></path>
          <path fill="#ce3536" d="M360 392h96v64h-96z"></path>
          <path d="M24 208h8.551l15.47 216.57A8 8 0 0056 432h88v40a24.028 24.028 0 0024 24h136a8 8 0 007.155-4.422L320 473.889l8.845 17.689A8 8 0 00336 496h136a24.028 24.028 0 0024-24v-96a24.028 24.028 0 00-24-24H356.663l9.288-144H376a8 8 0 008-8v-16a24.039 24.039 0 00-16-22.624v-12.219a32 32 0 00-16.013-52.148Q352 96.505 352 96a40 40 0 00-72.352-23.513A56.43 56.43 0 00239.334 56a48.021 48.021 0 00-90.023-14 47.988 47.988 0 00-76.79 30.915A39.993 39.993 0 0040 143.988V160a24.028 24.028 0 00-24 24v16a8 8 0 008 8zm24.592 0H96v208H63.449zM112 416V208h48v145.376A24.039 24.039 0 00144 376v40zm128-64V208h48v144zm-16 0h-48V208h48zm256 24v96a8.009 8.009 0 01-8 8H340.944l-13.789-27.578a8 8 0 00-14.31 0L299.056 480H168a8.009 8.009 0 01-8-8v-96a8.009 8.009 0 018-8h131.056l13.789 27.578a8 8 0 0014.31 0L340.944 368H472a8.009 8.009 0 018 8zm-139.371-24H336a8 8 0 00-7.155 4.422L320 374.111l-8.845-17.689A8 8 0 00304 352V208h45.917zM52.012 132.788a24 24 0 1124.161-41.469 8 8 0 0012.018-7.767A32.577 32.577 0 0188 80a32 32 0 0158.115-18.491 8 8 0 0014.4-3.217A32 32 0 01224 64v.306a8 8 0 009.322 8.243A40.326 40.326 0 01240 72a39.693 39.693 0 0134.318 19.453 8 8 0 0014.564-1.95A24.008 24.008 0 01336 96a23.681 23.681 0 01-.759 6 8 8 0 007.981 10.022c.259-.008.518-.017.778-.017a15.994 15.994 0 0110.668 27.916A8 8 0 00352 145.88V160H56v-20.29a8 8 0 00-3.988-6.922zM32 184a8.009 8.009 0 018-8h320a8.009 8.009 0 018 8v8H32z"></path>
          <path d="M280 384h-96a8 8 0 00-8 8v64a8 8 0 008 8h96a8 8 0 008-8v-64a8 8 0 00-8-8zm-8 64h-80v-48h80zM360 464h96a8 8 0 008-8v-64a8 8 0 00-8-8h-96a8 8 0 00-8 8v64a8 8 0 008 8zm8-64h80v48h-80zM224 136a32.036 32.036 0 0032-32 8 8 0 00-16 0 16 16 0 01-32 0 8 8 0 00-16 0 32.036 32.036 0 0032 32zM128 128a8 8 0 000 16 32 32 0 000-64 8 8 0 000 16 16 16 0 010 32z"></path>
        </svg>

        <h1>Movie Searcher & Nominator</h1>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <div>
            {/* eslint-disable-next-line */}
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjinlee1998.github.io%2Fshoppies-challenge%2F&amp;src=sdkpreparse" class="fa fa-facebook"></a>
            {/* eslint-disable-next-line */}
            <a target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet?text=Check%20this%20out!&url=https://jinlee1998.github.io/shoppies-challenge/" class="fa fa-twitter"></a>
            {/* eslint-disable-next-line */}
            <a target="_blank" rel="noreferrer" href="http://www.linkedin.com/shareArticle?mini=true&url=https://jinlee1998.github.io/shoppies-challenge/" class="fa fa-linkedin"></a>
          </div>
        <h2>Movie Title:</h2>
        <form action="">
          <input type="text" value={this.state.movieSearchTerms || ''} onChange={this.changemovieSearchTerms} placeholder='Search...' />
          <button type='submit' onClick={this.useMovieSearchEngine}>Search</button>
        </form>

        <div></div>

        <div className="column1"> 
          <h4>Seach Results</h4>
          {movieSearchResults} 
        </div>
        <div className="column2" >
          <h4>Nominations</h4>
          {renderedNominations}
        </div>
      </div>
    );
  }
}

export default App;