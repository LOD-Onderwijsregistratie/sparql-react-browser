import * as d3 from 'd3'
import React from 'react'

import ReactDOM from 'react-dom';

class Link extends React.Component {
  
  componentDidMount() {
    this.d3Link = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(this.enterLink);
  }

  componentDidUpdate() {
    this.d3Link.datum(this.props.data)
      .call(this.enterLink);
  }

  enterLink = (selection) => {
    selection
    .on('click', (d) => {
        console.log('igotclicked')
      })
    .attr("class", function (d) { return "link" })
      //.attr("class", function (d) { return "link " + d.property; })
      .attr("id", function (d, i) { return "linkId_" + i; })
      .attr("marker-end", function (d) { return "url(#black-arrow)"; })
      .classed('linkfaded', (d) =>  {return this.props.selectedNode})
      .classed("connectedLink", (d) => {return d.source.id === this.props.selectedNode.id || d.target.id === this.props.selectedNode.id}) //highlighting soorcelink and targetlink
      .merge(selection)
      .attr("d", function (d) {
        
        if (d.linknum) {
          //var dr = d.linknum * 150 - 150; // zorgt dat links vanaf hetzelfde subject naar hetzelfde target elkaar niet overlappen.
          var dr = 0
        }
        else {
          dr = 0
        }

        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      })
  };

  render() {
    return (<path className='link' marker-end="url(#black-arrow)"/>);
  }
}

export default Link

