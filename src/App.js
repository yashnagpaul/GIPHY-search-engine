import React from "react";
import "./App.css";
import axios from "axios";

const API_KEY = "O41WyMvXUcvMbwzA3M8QxKVBAO60B31N";
const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;
// const searchUrl = (q) =>
//   `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${q}`;

class App extends React.Component {
  state = {
    gifs: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get(trendingUrl)
      .then((response) =>
        this.setState({ loading: false, gifs: response.data.data })
      );
  }
  searchGifs = (event) => {
    event.preventDefault();
    const q = event.target.q.value;
    event.target.q.value = "";

    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=O41WyMvXUcvMbwzA3M8QxKVBAO60B31N`
      )
      .then((response) => {
        return this.setState({ loading: false, gifs: response.data.data });
      });
  };

  render() {
    const { loading, gifs } = this.state;

    const gifsList = gifs.map((gif) => {
      return (
        <div key={gif.id} className='gif-container'>
          <img
            src={gif.images.downsized_still.url}
            alt=""
            style={{ margin: "10px", width: "200px" }}
            className='gif-img'
          />
        </div>
      );
    });

    return (
      <>
        <h1 style={{ textAlign: "center" }} className='heading'>Search GIPHY</h1>
        <form onSubmit={this.searchGifs} style={{ textAlign: "center" }}>
          <input type="text" name="q" className='search-box' />
          <br/>
          <br/>
          <button className='search-btn'>Search</button>
          
        </form>
        <br/>
        {loading ? (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h1>Loading Gifs...</h1>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }} className='gifs-parent-container'>{gifsList}</div>
        )}
      </>
    );
  }
}

export default App;
