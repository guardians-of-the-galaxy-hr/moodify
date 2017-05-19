import React from 'react';

var PlaylistOption = ({playlist}) => {
  console.log(playlist)
    return (
      <option>{playlist}</option>
    )
  }

export default PlaylistOption;