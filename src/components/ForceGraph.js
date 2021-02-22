import * as d3 from 'd3'
import React from 'react'

import Node from './Node'
import NodeLabel from './NodeLabel'
import Link from './Link'
import LinkLabel from './LinkLabel'
import Marker from './Marker'
import Tooltip from './Tooltip'

class ForceGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: props.nodes,
      links: props.links
    };

    this.rs = this.restartSimulation.bind(this)
    this.ssn = this.props.setSelectedNode.bind(this)
    this.rsn = this.props.removeSelectedNode.bind(this)
    this.facn = this.props.fetchAboutClickedNode.bind(this)
    this.fps = this.props.fetchParentAndSubNodes.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount')
    var element = document.getElementById('forcegraph');

    // Redraw based on the new size whenever the browser window is resized.
    window.addEventListener("resize", () => {
      this.initializeSVG(element.offsetWidth, element.offsetHeight)
      this.restartSimulation()
    });

    //initial forcegraph
    this.initializeSVG(element.offsetWidth, element.offsetHeight)

    //initial forces
    this.forceLink = d3.forceLink()
      .links(this.props.links)
      .distance(this.props.settings.linkDistance.value).id(function (d) { return d.id; })
    this.forceCenter = d3.forceCenter((element.offsetWidth * 1) / 2, (element.offsetHeight * 1) / 2)
    this.forceCharge = d3.forceManyBody()
      .strength(this.props.settings.forceCharge.value) //defaul -30

    //simulation --> simulation gets updated upon interaction
    this.simulation = d3.forceSimulation(this.props.nodes.nodesList)
      .force('center', this.forceCenter)
      .force('charge', this.forceCharge)
      .force('link', this.forceLink)

    this.simulation.on('tick', () => {
      console.log('tick')
      this.setState({
        //call this.setstate to rerender with react.
      })
    });
  }

  componentDidUpdate(prevprops) {
    if (this.props.data.id !== prevprops.data.id) { // check if any data has changed and restart the simulation with new nodes and links
      
      this.simulation.nodes(this.props.nodes.nodesList) // load new nodes
      this.simulation.force('link').links(this.props.links) // load new links
      this.restartSimulation()
    }

    if (this.props.settings !== prevprops.settings) { // check if settings have changed
      
      //apply new linkDistance
      this.simulation.force("link")
        .distance(this.props.settings.linkDistance.value)

      this.restartSimulation()
    }

  }

  componentWillUnmount() {
    this.simulation.stop();
  }

  initializeSVG(width, height) {
    var zoom = d3.zoom()
      .scaleExtent([.5, 10])
      .on("zoom", zoomed);

    var svg = d3.select("#forcegraph").select("svg")
      .attr("class", "forcegraph")
      .style("width", width * 1)   // set size of svg in relation to parent
      .style("height", height * 1) // set size of svg in relation to parent
      .style("border", "1px solid black")
      .call(zoom).select("g").attr("transform", "")
    
    function zoomed() {
      const currentTransform = d3.event.transform;
      svg.attr("transform", currentTransform);
      //slider.property("value", currentTransform.k);
    }

    // function slided(d) {
    //   zoom.scaleTo(svg, d3.select(this).property("value"));
    // }

    // var slider = d3.select("#forcegraph").append("p").append("input")
    //   .datum({})
    //   .attr("type", "range")
    //   .attr("value", zoom.scaleExtent()[0])
    //   .attr("min", zoom.scaleExtent()[0])
    //   .attr("max", zoom.scaleExtent()[1])
    //   .attr("step", (zoom.scaleExtent()[1] - zoom.scaleExtent()[0]) / 100)
    //   .on("input", slided);
  }


  restartSimulation() {
    this.simulation.alpha(1).restart()
  }

  render() {

    const rendertooltip = () => {
      if(this.props.nodes.selectedNode){
        return (<Tooltip data={this.props.nodes.selectedNode} datasource={this.props.datasource} rs={this.rs} ssn={this.ssn} rsn={this.rsn} facn={this.facn} fps={this.fps} selectedNode={this.props.nodes.selectedNode} linksList={this.props.links} ></Tooltip>)
      }
      else {
        return
      }
    }

    return (
      <div id="forcegraph">
        <svg>
          <g class="zoom"> 
            <g class="links">
              {this.props.links.map((link, index) => <Link data={link} key={index} selectedNode={this.props.nodes.selectedNode}></Link>)}
            </g>
            <g class="nodesellipse">
              {this.props.nodes.nodesList.map((node, index) => <Node data={node} key={index} datasource={this.props.datasource} rs={this.rs} ssn={this.ssn} rsn={this.rsn} facn={this.facn} fps={this.fps}selectedNode={this.props.nodes.selectedNode} linksList={this.props.links} ></Node>)}
            </g>
            <g class="nodestext">
              {this.props.nodes.nodesList.map((node, index) => <NodeLabel data={node} key={index} datasource={this.props.datasource} rs={this.rs} ssn={this.ssn} rsn={this.rsn} facn={this.facn}fps={this.fps}></NodeLabel>)}
            </g>
            <g class="linkstext">
              {this.props.links.map((link, index) => <LinkLabel data={link} key={index}></LinkLabel>)}
            </g>
            <g class="defs">
              <Marker linksList={this.props.links}/>
            </g>
            <g class="tooltips">
              {rendertooltip()}
            </g>
          </g>
        </svg>        
      </div >
    );
  }
}

export default ForceGraph