import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { deleteData, getData, patchData, postData } from "../../utils/fetch";
import { saveUser, saveTasksList } from "../../redux/actions";
import "./dashboard.css";
import { withRouter } from "react-router";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getProfile();
  }
  saveNewTask = async () => {
    await postData("/task/", {
      completed: document.getElementById("newtask").checked,
      description: document.getElementById("newtaskname").value,
    });
    this.getTaskList();
    this.toggleAddTaskMenu();
  };
  toggleAddTaskMenu = () => {
    this.setState({ toggleeAddTask: !this.state.toggleeAddTask });
  };
  getTaskList = async () => {
    const tasksList = await getData("/task?sortBy=completed:asc", {});
    this.props.saveTasksList(tasksList);
  };
  getProfile = async () => {
    const response = await getData("/users/me", {});
    this.props.saveUser(response);
    this.getTaskList();
  };
  logout = async (event) => {
    if (event.target.id === "single") await postData("/users/logout", {});
    else await postData("/users/logoutAll", {});

    this.props.history.push("/");
  };
  manageCheckboxClick = async (event) => {
    await patchData("/task/" + event.target.id, {
      completed: event.target.checked,
    });
    this.getTaskList();
  };
  deleteAccount = async () => {
    await deleteData("/users/me", {});
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="dashboard-container">
        <div className="header-container">
          <div className="welcome-container">
            Dashboard
            {this.props.userData && (
              <i className={"welcome-text"}>
                Welcome, {this.props.userData.name}
              </i>
            )}
          </div>
          <div className="logout" onClick={this.logout}>
            <i id="single">Logout</i>&nbsp; | &nbsp;
            <i id="multiple">Logout all devices</i>
          </div>
        </div>
        <div className="data-container">
          <div className="task-container">
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              Tasks List
            </div>
            {this.props.tasksList && this.props.tasksList.length ? (
              <div style={{ display: "flex" }}>
                <table>
                  <thead>
                    <tr>
                      <th>No</th> <th>Description</th> <th>Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.tasksList.map((task, index) => (
                      <tr key={`${task.description}-${index}`}>
                        <td>{index + 1}</td>
                        <td>{task.description}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            id={task._id}
                            onChange={this.manageCheckboxClick}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  marginTop: "15px",
                  justifyContent: "center",
                }}
              >
                None added.
              </div>
            )}

            {!this.state.toggleeAddTask && (
              <div
                style={{
                  display: "flex",
                  paddingTop: "15px",
                  marginTop: "15px",
                  borderTop: "1px solid #dfdfdf",
                }}
              >
                <button onClick={this.toggleAddTaskMenu}>ADD NEW TASK</button>
              </div>
            )}

            {this.state.toggleeAddTask && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "15px",
                  marginTop: "15px",
                  borderTop: "1px solid #dfdfdf",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "15px",
                  }}
                >
                  Task Name : &nbsp;
                  <input type="text" id="newtaskname" />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "15px",
                  }}
                >
                  Completed ?&nbsp; <input type="checkbox" id="newtask" />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "25px",
                  }}
                >
                  <button
                    style={{ marginTop: "15px" }}
                    onClick={this.saveNewTask}
                  >
                    Save
                  </button>
                  <button
                    style={{
                      marginTop: "15px",
                      marginLeft: "15px",
                      color: "black",
                      background: "silver",
                    }}
                    onClick={this.toggleAddTaskMenu}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {this.props.userData && (
            <div className="profile-container">
              {this.props.userData && (
                <div style={{ display: "flex" }}>
                  {/* <img
                    className="avatar-styles"
                    src={`http://localhost:3001/users/${this.props.userData._id}/avatar`}
                    alt={"profile"}
                  /> */}

                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      width: "150px",
                      justifyContent: "center",
                      height: "150px",
                      alignItems: "center",
                      flexGrow: "1",
                      border: "1px dashed grey",
                      marginBottom: "5px",
                    }}
                  >
                    Profile picture coming soon !
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  border: "1px solid lightblue",
                  flexDirection: "column",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {this.props.userData.name}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {this.props.userData.email}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>Change password</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "red",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={this.deleteAccount}
                >
                  <p>Delete Account</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { userData: state.user, tasksList: state.tasksList };
};
export default compose(
  withRouter,
  connect(mapStateToProps, { saveUser, saveTasksList })
)(Dashboard);
