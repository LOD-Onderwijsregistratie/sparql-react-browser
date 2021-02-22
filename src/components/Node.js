import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom';

class Node extends React.Component {
  constructor() {
    super()

    // dragging
    this.drag = () => {
      const dragstarted = (d) => {
        this.props.rs()
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };

      const dragended = (d) => {
        d.fx = null;
        d.fy = null;
      };

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    };

  }

  componentDidMount() {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(this.enterNode);
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(this.enterNode);
  }

  enterNode = (selection) => {
    selection.select("ellipse")
      .on('click', (d) => {
        this.props.ssn(d)
        if (d.type === 'uri') {
          this.props.facn(d.id, this.props.datasource)
          //this.props.fps(d.id, this.props.datasource)
        }
        
      })
      .on("mouseover", (d) => {
        console.log('mouseover')
      })
      .on("mouseout", (d) => {
        console.log('mouseout')
      })
      .on("mousedown", function (d) {
        console.log('mousedown')
      })
      .on("mouseup", function (d) {
        console.log('mouseup')
      })
      .attr("rx", function (d) { return 30 }) //d.id.length
      .attr("ry", function (d) { return 30 }) //d.id.length
      .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
      .attr("class", "ellipse")
      .classed('uri', function (d) { return d.type === 'uri' })
      .classed('literal', function (d) { return d.type === 'literal' || d.type === 'typed-literal' })
      .classed('selected', (d) => { return d.id === this.props.selectedNode.id})
      .classed('faded', (d) =>  {return this.props.selectedNode})
      .classed('ellipse_highlight', (d) => {
        // check if there is a direct link between this node and the selectedNode
        var nodeIsConnected = (link) => {
          if((link.source.id === d.id || link.target.id === d.id) && (link.source.id === this.props.selectedNode.id || link.target.id === this.props.selectedNode.id) ){
            return true
          }
          else {
            return false
          }  
        }
        
        var found = this.props.linksList.find(nodeIsConnected);
        if(found){
          return true
        }
      })
      .call(this.drag(this.simulation))


  };

  render() {
    return (
      <g>
        <ellipse className='ellipse' />
      </g>
    );
  }
};

export default Node