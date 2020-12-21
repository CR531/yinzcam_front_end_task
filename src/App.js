import React from "react";
import Usercomponent from "./Usercomponent"
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import axios from 'axios';

class App extends React.Component {

  state = {
    currentPage: 1,
    api_response: []
  };

  apicall = async (page) => {
    await axios.get(`https://api.github.com/users?since=${page}`)
      .then(response => {
        this.setState({ ...this.state, api_response: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  componentDidMount() {
    this.apicall(this.state.currentPage);
  }
  handleChange = numPage => {
    this.setState({ currentPage: numPage });
    this.apicall(numPage);
  };
  render() {
    return (
      <div>
        <h2>Front End Developer Take Home Assessment</h2>
        <Usercomponent data={this.state.api_response} />
        <Pagination
          currentPage={this.state.currentPage}
          totalSize={100}
          changeCurrentPage={this.handleChange}
          theme="bootstrap"
        />
        <h2>current Page:{this.state.currentPage}</h2>
      </div>
    );
  }
}
export default App;