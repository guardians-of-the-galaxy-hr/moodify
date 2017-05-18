class PlaylistEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      newPlaylist: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  createPlaylist(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.createPlaylist}>
          <input type="text" placeholder="create playlist" className="textbox" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default PlaylistEntry 