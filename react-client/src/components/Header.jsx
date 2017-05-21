import React from 'react';
import renderif from 'render-if';
import {Redirect, Link} from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.redirect = this.redirect.bind(this);
    this.state.url = window.location.href;
  }

  redirect() {
    this.setState({
        redirect: true
      });
  }

  render() {
    if (this.state.redirect && this.state.url !== this.props.url) {
      return <Redirect push to="/" />;
    }
    return (
      <div id="header" onClick={this.redirect}>
        <h3 id="logo">moooodify</h3>
        <img id="mascot" src="./img/cow.png" width="75" height="75"/>
        {renderif(this.props.showLoginName)(
        <div className="displayUsername">
            <img id="user" src="./img/user.png" width="30" height="30"/>
            {this.props.username}
        </div>)}
      </div>
    );
  }
}

export default Header;
          //