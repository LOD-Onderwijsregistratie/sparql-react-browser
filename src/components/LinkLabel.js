import * as d3 from 'd3'
import React from 'react'

import ReactDOM from 'react-dom';

class LinkLabel extends React.Component {
  componentDidMount() {
    this.d3Link = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(this.enterLinkLabel);
  }

  componentDidUpdate() {
    this.d3Link.datum(this.props.data)
      .call(this.enterLinkLabel);
  }

  getAllLinkPropertys() {
    var linkpropertys = []
    this.props.linksList.forEach(element => {
      linkpropertys.push(element.property.replace(/\s/g, ''))
    });
    return linkpropertys
  }

  enterLinkLabel = (selection) => {
    selection
      .on('click', function (d) {
        //window.location.href = d.id // opens in the same page
        window.open(d.id)           // opens in a new page
      })
      .text(function (d) {
        var text = d.property.split('/')
        text.splice(0, 3)
        text = text.join('/')
        return text;
      })
      .attr("transform", function (d) {
        if(d.linknum > 1){
          return "translate(" + ((d.source.x + d.target.x) / 2) + "," + ((d.source.y + d.target.y) / 2 + (d.linknum * 10) ) + ")";
        }
        else {
         return "translate(" + ((d.source.x + d.target.x) / 2) + "," + ((d.source.y + d.target.y) / 2 ) + ")"; 
        }
      });
  };

  render() {
    return (<text/>);
  }
}

export default LinkLabel

