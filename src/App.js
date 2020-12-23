import React from "react";
import Usercomponent from "./Usercomponent"
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      api_response: []
    };
  }

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
  handleChange = async (numPage) => {
    await this.setState({ currentPage: numPage, api_response: [] });
    this.apicall(this.state.currentPage);
  };
  render() {
    return (
      <div>
        <h2>Front End Developer Take Home Assessment</h2>
        <Pagination
          currentPage={this.state.currentPage}
          totalSize={100}
          changeCurrentPage={this.handleChange}
          theme="bootstrap"
        />
        {this.state.api_response && this.state.api_response.length > 0 &&
          <Usercomponent userdata={this.state.api_response} />}
      </div>
    );
  }
}
export default App;