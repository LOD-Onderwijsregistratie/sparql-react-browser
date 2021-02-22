import React from 'react'

class Marker extends React.Component {
  
  render() {
        return (
        <defs>
      <marker id="red-chevron"
      viewBox="0 0 10 10" refX="5" refY="5" orient="auto" >
         <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="red" />
      </marker>

      <marker id="black-arrow"
      viewBox="0 0 10 10" refX="40" refY="5" orient="auto" markerWidth="6" markerHeight="6">
         <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>

      <marker id="red-circle"
      viewBox="0 0 10 10" refX="5" refY="5" orient="auto" >
         <circle fill="red" cx="5" cy="5" r="5" />
      </marker>
  </defs>
    );
  }
};

export default Marker

  

