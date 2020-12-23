import React from "react";
import axios from "axios";

class UserInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            repoInfo: [],
            followersInfo: []
        };
    }
    async componentDidMount() {
        const { userinfo } = this.props;
        document.title = 'UserInformation';
        await axios.get(userinfo.repos_url)
            .then(response => {
                this.setState({ ...this.state, repoInfo: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        await axios.get(userinfo.followers_url)
            .then(response => {
                this.setState({ ...this.state, followersInfo: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const { userinfo } = this.props;
        return (
            <div>
                <h3>User Repositories Information <button className="button_css" onClick={this.props.handleBackClick}>
                    Back
                </button></h3>

                {userinfo &&
                    <table className="info_table">
                        <thead>
                            <tr>
                                <th><h3>Repo ID</h3></th>
                                <th><h3>Repo Name</h3></th>
                                <th><h3>Repo Full Name</h3></th>
                            </tr>
                        </thead>
                        {this.state.repoInfo && this.state.repoInfo.length > 0 && this.state.repoInfo.map((record, index) => {
                            return (
                                <tbody key={index}>
                                    <tr key={index}>
                                        <td className="table_data" key={record.id}><h3>{record.id}</h3></td>
                                        <td className="table_data" key={record.name}><h3>{record.name}</h3></td>
                                        <td className="table_data" key={record.full_name}><h3>{record.full_name}</h3></td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                }
                <h3>User Followers Information</h3>
                {userinfo &&
                    <table className="info_table">
                        <thead>
                            <tr>
                                <th><h3>Follower ID</h3></th>
                                <th><h3>Follower Name</h3></th>
                                <th><h3>Follower URL</h3></th>
                            </tr>
                        </thead>
                        {this.state.followersInfo && this.state.followersInfo.length > 0 && this.state.followersInfo.map((record, index) => {
                            return (
                                <tbody key={index}>
                                    <tr key={index}>
                                        <td className="table_data" key={record.id}><h3>{record.id}</h3></td>
                                        <td className="table_data" key={record.login}><h3>{record.login}</h3></td>
                                        <td className="table_data" key={record.url}><h3>{record.url}</h3></td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                }
            </div>
        );
    }
}
export default UserInfo;