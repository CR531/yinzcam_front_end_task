import React, { Component } from "react";
import './index.css';

class Usercomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: [],
            sorted_data: [],
            search: ""
        }
    }
    async componentDidMount() {
        const { userdata } = this.props;
        await this.setState({ ...this.state, userdata: userdata, sorted_data: userdata })
    }
    filterData = async (e) => {
        var x = -1;
        const updatedList = this.state.userdata.filter(item => {
            if (((item.login.toString().toLowerCase().search(e.target.value.toString().toLowerCase())) === 0)) {
                x = 0;
            } else {
                x = -1;
            }
            return (
                x !== -1
            );
        });
        await this.setState({ ...this.state, sorted_data: updatedList });
    };
    onRowClick = (record) => {
        console.log("Row Clicked" + record.login)
    }
    render() {
        return (
            <div>
                {this.state.sorted_data &&
                    <div>
                        <h2 className="leftmargin">List of Users</h2>
                        {this.state.userdata && this.state.userdata.length > 0 && <input
                            className="input" type="text"
                            id="search"
                            placeholder="Search users..."
                            onChange={(value) => this.filterData(value)}
                        />}
                        <table className="detail_table">
                            <thead>
                                <tr>
                                    <th><h3>User Avatar</h3></th>
                                    <th><h3>User Login</h3></th>
                                </tr>
                            </thead>
                            {this.state.sorted_data && this.state.sorted_data.length > 0 && this.state.sorted_data.map((record, index) => {
                                return (
                                    <tbody>
                                        <tr key={index} onClick={() => this.onRowClick(record)}>
                                            <td className="table_data">
                                                <img
                                                    style={{ width: "30%", height: "30%" }}
                                                    src={record.avatar_url}
                                                    alt="avatar"
                                                >
                                                </img>
                                            </td>
                                            <td className="table_data"><h3>{record.login}</h3></td>
                                        </tr>
                                    </tbody>
                                );
                            })
                            }
                            {this.state.sorted_data && this.state.sorted_data.length === 0 &&
                                <tbody>
                                    <tr><td colSpan="2" className="table_data">No records found for the search criteria</td></tr>
                                </tbody>
                            }
                        </table>
                    </div>
                }

            </div>
        );
    }
}
export default Usercomponent;