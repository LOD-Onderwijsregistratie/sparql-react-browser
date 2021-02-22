import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom';
import styles from './Tooltip.module.scss'
import { Popover, Table } from 'react-bootstrap'
import Scrollbox from './ScrollBox'
import { isValidHttpUrl } from '../utils/index'

class Tooltip extends React.Component {
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
      .call(this.enterTooltip);
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(this.enterTooltip);
  }

  enterTooltip = (selection) => {
    selection.select("foreignObject")
    .on("mouseout", (d) => {
        console.log('mouseout')
        //this.props.rsn()
      })
    .attr("transform", (d) => "translate(" + (d.x+25) + "," + (d.y-10) + ")")
    .classed("none", (d) => { return (d.id !== this.props.selectedNode.id)})
    .call(this.drag())

  };


  render() {
    const renderTable = () => {
      return (
        <Scrollbox orientation="scrollbox-xy">
        <Table>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
          
          {renderlinks()}
        
        </Table>
        </Scrollbox>
      ) 
  }

  const linkBelongs = (link) => {
    return (link.source.id === this.props.data.id) 
  }
  
  const renderlinks = () => {
    var links = this.props.linksList.filter(linkBelongs)
    console.log("linkslenght:", links.length)
    return links.map((link) => 
      {
        if (link.target.type === 'uri' || isValidHttpUrl(link.target.id) ) {
          return <tr><td><a href={link.property} target={link.property}>{link.property}</a></td><td><a href={link.target.id} target={link.target.id}>{link.target.id}</a></td></tr>
        }
        else {
          return <tr><td><a href={link.property} target={link.property}>{link.property}</a></td><td>{link.target.id}</td></tr>
        }
        
      }
     
     )
  }

    return (
      <g>
        <foreignObject width="1" height="1" className={styles.tooltip}>
          <div>
            <Popover id="popover-basic" className={styles.popover}>
              <Popover.Title as="h3">
                {<a href={this.props.data.id} target={this.props.data.id}>{this.props.data.id}</a>}
                
              <button type="button" class="close" onClick={() => this.props.rsn()}><span>×</span></button>
              </Popover.Title>
              <Popover.Content>
                {renderTable()}
              </Popover.Content>
            </Popover>       
          </div>
        </foreignObject>
      </g>
    );
  }
};

export default Tooltip


