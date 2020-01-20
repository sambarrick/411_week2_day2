import React from "react";
import "./App.css";
//import Authors from "./Authors";

class App extends React.Component {
  state = {
    data: [],
    SearchStory: '',
    SearchAuthor: '',
    SearchDate: '',
    errorText: ''
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSearchStories = event => {
    event.preventDefault();
    this.fetchStories(this.state.SearchStory);
    this.setState({ value: "" });
  };

  onSearchAuthor = event => {
    event.preventDefault();
    this.fetchAuthor(this.state.SearchAuthor);
    this.setState({ value: "" });
  };

  onSearchDate = event => {
    event.preventDefault();
    this.fetchDate(this.state.SearchDate);
    this.setState({ value: "" });
  };

  fetchStories = () => {
    fetch(`http://hn.algolia.com/api/v1/search?query=&tags=story`)
      .then(res => res.json())
      .then(start => {
        if (start.hits.length > 0) {
          this.setState({ data: start.hits });
        } else {
          this.setState("No results found. Please search again.");
        }
      })
      .catch( error => this.errorText= error)
  };

  fetchAuthor = searchValue => {
    fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${searchValue}`)
      .then(res => res.json())
      .then(start => {
        if (start.hits.length > 0) {
          this.setState({ data: start.hits });
        } else {
          this.setState("No results found. Please search again.");
        }
      })
      .catch( error => this.errorText= error)
  };

  fetchDate = searchValue => {
    fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${ searchValue }&tags=story`)
      .then(res=> res.json())
      .then(start => {
        if (start.hits.length > 0) {
          this.setState({ data: start.hits });
        } else {
          this.setState("No results found. Please search again.");
        }
      })
      .catch( error => this.errorText= error)
  };

  render() {
    return (
      <div>
        <div>
          <header>Search Hacker News Stories</header>
          <br />
          <form>
            <input
              type="text"
              name="SearchStory"
              placeholder="Click Search Stores for all Stories"
              value={this.state.SearchStory}
              onChange={this.onChange}
            />
            <button onClick={this.onSearchStories}>Search Stories</button>
          </form>

          <br />

          <form onSubmit={this.onSearchAuthor}>
            <input
              type="text"
              name="SearchAuthor"
              placeholder="Type tomwilson"
              value={this.state.SearchAuthor}
              onChange={this.onChange}
            />
            <button onclick={this.onSearchAuthor}>Search by Author</button>
          </form>

          <br />

          <form onSubmit={this.onSearchDate}>
            <input
              type="date"
              name="SearchDate"
              value={this.state.SearchDate}
              onChange={this.onChange}
            />
            <button onclick={this.onSearchDate}>Search by Date</button>
          </form>
        </div>

        <div>
          {this.state.data.map((data, index) => (
            <div>
              <div key={index}>
                <p>
          <a href={data.url}>{data.title}</a> by {data.author} </p> {/*Could NOT figure out how to get the article title 
          to populate when searching for author. The documentation wasn't clear but I managed to jimmyrig 
        the date fetch to get author search to work in a limited capacity.*/}
               <p>Points: {data.points}</p>
                <p><span>Published on:</span>{data.created_at}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
