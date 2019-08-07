import React from "react";
import Search from "./Search";
import Result from "./Result";
import axios from "axios";

// const items = [
//   { id: 0, name: "Cup", price: 5, isNew: true },
//   { id: 1, name: "Piano", price: 500, isNew: true },
//   { id: 2, name: "T-Shirt", price: 10, isNew: true }
// ];

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

// getDerivedStateFromProps() is called before the render() method,
// and componentDidMount() is called after the render() method.

// Stateful component or Container component
class App extends React.Component {
  state = {
    result: null,
    searchTerm: "",
    error: null
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  setSearchTopStories = result => {
    const { hits, page } = result.data;
    const oldHits = page !== 0 ? hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({
      result: { hits: updatedHits, page }
    });
  };

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    event.preventDefault();
    this.fetchSearchTopStories(searchTerm);
  };

  // use async-await,
  async fetchSearchTopStories(searchTerm, page = 0) {
    const dataPromise = axios.get(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
    );
    try {
      this.setSearchTopStories(await dataPromise);
    } catch (error) {
      this.setState({ error });
    }
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const { searchTerm, error, result } = this.state;
    const page = (result && result.page) || 0;

    return (
      <div>
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
          <label>Search</label>
        </Search>
        {error && <p>something went wrong!!!</p>}
        {result && <Result items={result.hits} searchPattern={searchTerm} />}
        <button
          onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
        >
          More...
        </button>
      </div>
    );
  }
}

function newItemsCheapestFirst(items) {
  return items
    .filter(item => item.isNew)
    .sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      } else if (a.price > b.price) {
        return 1;
      } else {
        return 0;
      }
    });
}

//  put it in render() -> <NewItemsList items={items} />
const NewItemsList = ({ items }) => {
  return (
    <ul>
      {newItemsCheapestFirst(items).map(item => (
        <li key={item.id}>
          {item.name}, ${item.price}
        </li>
      ))}
    </ul>
  );
};

export default App;
