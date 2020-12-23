import React, { Component } from "react";
import axios from "axios";
import UserInfo from "./UserInfo"
class Usercomponent extends Component {
    constructor() {
        super();
        this.state = {
            userdata: [],
            sorted_data: [],
            loading: false,
            userInfoRecord: {},
            showDetail: false,
            page: 0,
            prevY: 0
        };
    }
    componentDidMount() {
        document.title = 'UsersList';
        this.getUserdata(this.state.page);
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }
    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const lastUser = this.state.userdata[this.state.userdata.length - 1];
            const currentUserPage = lastUser.albumId;
            this.getUserdata(currentUserPage);
            this.setState({ page: currentUserPage });
        }
        this.setState({ prevY: y });
    }
    async getUserdata(page) {
        this.setState({ loading: true });
        axios
            .get(
                `https://api.github.com/users?since=${page}`
            )
            .then(res => {
                this.setState({ userdata: [...this.state.userdata, ...res.data], sorted_data: [...this.state.sorted_data, ...res.data] });
                this.setState({ loading: false });
            });
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
        const removeDuplicatesFromArray = (updatedList) => [...new Set(
            updatedList.map(el => JSON.stringify(el))
        )].map(e => JSON.parse(e));

        await this.setState({ ...this.state, sorted_data: removeDuplicatesFromArray(updatedList) });
    };
    handleRecordClick = async (record, e) => {
        e.preventDefault();
        await this.setState({ ...this.state, userInfoRecord: record, showDetail: true });
    }
    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
        return (
            <div className="container">
                <div style={{ minHeight: "800px" }}>
                    {this.state.showDetail &&
                        <UserInfo userinfo={this.state.userInfoRecord} />
                    }
                    {!this.state.showDetail && <div>
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
                                        <tr key={record.id}>
                                            <td className="table_data">
                                                <img
                                                    style={{ width: "30%", height: "30%" }}
                                                    src={record.avatar_url}
                                                    alt="avatar"
                                                >
                                                </img>
                                            </td>
                                            <td className="table_data"><h3>
                                                <a href="/user_info" onClick={(e) => this.handleRecordClick(record, e)}>{record.login}</a>
                                            </h3></td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                            {this.state.sorted_data && this.state.sorted_data.length === 0 &&
                                <tbody>
                                    <tr key="1"><td colSpan="2" className="table_data">No records found for the search criteria</td></tr>
                                </tbody>
                            }
                        </table>
                    </div>}
                </div>
                <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                >
                    <span style={loadingTextCSS}>Loading...</span>
                </div>
            </div>
        );
    }
}

export default Usercomponent;