import React from 'react';
import Stats from './Stats.jsx';

class SideMenu extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      visible: false
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show () {
    this.setState({ visible: true});
    document.addEventListener('click', this.hide);
  }

  hide () {
    document.removeEventListener('click', this.hide);
    this.setState({ visible: false});
  }

  render() {
    return (
        <div className="menu">
            <div className={(this.state.visible ? 'visible ' : '') + this.props.alignment}>
                <div className="stats-container">
                    <Stats userStatsInfo={this.props.userStatsInfo}/>
                </div>
            </div>
        </div>
    );
  }
}

export default SideMenu;