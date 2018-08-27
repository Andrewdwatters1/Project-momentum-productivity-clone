import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stack as Menu } from 'react-burger-menu';
import Switch from "react-switch";
import { Link } from 'react-router-dom';

import { changeTimezone, changeTimeformat, logout } from '../redux/reducer';

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      focusTimer: false,
      theme: false,
      showSettings: false
    }
  }

  dropdownActive = (event) => {
    event.preventDefault();
    this.setState({
      open: !this.state.open
    })
  }
  focusChange = () => {
    this.setState({
      focusTimer: !this.state.focusTimer
    });
  }
  themeChange = () => {
    this.setState({
      theme: !this.state.theme
    });
  }
  toggleAllSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings
    })
  }
  handleTimeZoneChange = (e) => {
    this.props.changeTimezone(e.target.value)
  }
  handleTimeFormatChange = (e) => {
    this.props.changeTimeformat(e.target.value)
  }

  render() {
    return (
      <div>
        <Menu bodyClassName={"dropdown-menu"}>
          <a onClick={this.dropdownActive} className="menu-item--small"></a>
          <a className="menu-item">Focus Timer
          <div>
              <label htmlFor="normal-switch">
                <Switch
                  onChange={this.focusChange}
                  checked={this.state.focusTimer}
                  onColor="#888888"
                  onHandleColor="#4DAAF6"
                  handleDiameter={25}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={15}
                  width={40}
                />
              </label>
            </div>
          </a>

          <a className="menu-item">Theme
          <div>
              <label htmlFor="normal-switch">
                <Switch
                  onChange={this.themeChange}
                  checked={this.state.theme}
                  onColor="#888888"
                  onHandleColor="#4DAAF6"
                  handleDiameter={25}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={15}
                  width={40}
                />
              </label>
            </div></a>

          <a className="menu-item">
            <div>
              <i className="fas fa-cog" onMouseDown={this.toggleAllSettings}>
              </i>
            </div>
          </a>

          {/* ANIMATE HERE IF TIME */}
          <a style={{ display: this.state.showSettings ? "block" : "none" }} className="menu-item">
            <div className="settings-item-spread">
              Timezone <select name="timezone" onChange={this.handleTimeZoneChange} defaultValue="Mountain" id="timezone-select" className="settings-item-select font-size-minus" href="/">
                <option value="Hawaii">Hawaii</option>
                <option value="Alaska">Alaska</option>
                <option value="Pacific">Pacific</option>
                <option value="Mountain" >Mountain</option>
                <option value="Central">Central</option>
                <option value="Eastern">Eastern</option>
                <option value="gmt">GMT</option>
              </select>
            </div>
          </a>

          <a style={{ display: this.state.showSettings ? "block" : "none" }} className="menu-item">
            <div className="settings-item-spread menu-settings">
              Format <select name="timeformat" onChange={this.handleTimeFormatChange} defaultValue="HH:mm:ss" id="timeformat-select" className="settings-item-select font-size-minus" href="/" selected={this.state.timeformat}>
                <option value="HH:mm:ss - zz">H:m:s:Z-24</option>
                <option value="h:mm:ss A - zz">H:m:s:Z</option>
                <option value="HH:mm:ss" >H:m:s-24</option>
                <option value="h:mm:ss A">H:m:s</option>
                <option value="HH:mm">H:m-24</option>
                <option value="h:mm A">H:m</option>
              </select>
            </div>
          </a>

          <a className="menu-item">
            <div>
              <Link to="/" onClick={this.props.logout}><button className="login-button">Logout</button></Link>
            </div>
          </a>
        </Menu>
      </div>
    )
  }

  // if (this.state.open) {
  //   return (
  //     <div>
  //       <div>

  //       </div>
  //       <div>
  //         Timer Settings
  //       </div>
  //       <div>
  //         Other
  //       </div>
  //       <div>
  //         <button onClick={this.handleClick} className="fas fa-times"></button>
  //       </div>
  //     </div>
  //   )
  // } else {
  //   return <button onClick={this.handleClick} className="fas fa-bars"></button>
  // }

}

const mapStateToProps = state => {
  return {
    timezone: state.timezone,
    timeformat: state.timeformat,
    user: state.userInfo
  }
}

export default connect(mapStateToProps, { changeTimezone, changeTimeformat, logout })(Dropdown)