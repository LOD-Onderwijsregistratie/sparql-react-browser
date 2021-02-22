import * as d3 from 'd3'
import React from 'react'

class ForceGraph extends React.Component {
  constructor(props) {
    super();
    console.log('ForceGraph rerendered')
  }

  componentDidMount() {
    var element = document.getElementById('forcegraph');

    // Redraw based on the new size whenever the browser window is resized.
    window.addEventListener("resize", () => {
      this.removeSVG()
      this.createSVG(element.offsetWidth, element.offsetHeight)
      this.createSimulation(this.props.nodes, this.props.links, element.offsetWidth, element.offsetHeight)
    });

    this.createSVG(element.offsetWidth, element.offsetHeight)
    this.createSimulation(this.props.nodes, this.props.links, element.offsetWidth, element.offsetHeight)

  }

  componentDidUpdate() {
    this.removeSimulation()
    var element = document.getElementById('forcegraph');
    this.createSimulation(this.props.nodes, this.props.links, element.offsetWidth, element.offsetHeight)
  }

  createSVG(width, height) {
    console.log('createsvg')

    var zoom = d3.zoom()
      .scaleExtent([.5, 10])
      .on("zoom", zoomed);

    var svg = d3.select("#forcegraph")
      .append("svg")
      .attr("class", "forcegraph")
      .style("width", width * 1)   // set size of svg in relation to parent
      .style("height", height * 1) // set size of svg in relation to parent
      .style("border", "1px solid black")
      .call(zoom).append("g")
    svg.append("g").attr("class", "links")
    svg.append("g").attr("class", "nodesellipse")
    svg.append("g").attr("class", "nodestext")
    svg.append("g").attr("class", "linkstext")
    svg.append("defs").attr("class", "defs")

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

  removeSVG() {
    d3.select('#forcegraph').selectAll('svg').remove()
  }

  removeSimulation() {
    d3.select('.nodestext').selectAll('text').remove();
    d3.select('.nodesellipse').selectAll('ellipse').remove();
    d3.select('.links').selectAll('path').remove();
    d3.select('.linkstext').selectAll('text').remove();

  }

  createSimulation(nodes, links, width, height) {
    //simulation

    var forceLink = d3.forceLink().links(links).distance(400).id(function (d) { return d.id; })
    var forceCenter = d3.forceCenter((width * 1) / 2, (height * 1) / 2)
    var forceCharge = d3.forceManyBody().strength(-1000) //defaul -30

    var simulation = d3.forceSimulation(nodes)
      .force('center', forceCenter)
      .force('charge', forceCharge)
      .force('link', forceLink)
      .on('tick', ticked);

    //node properties
    function updateNodesText() {
      var selection = d3.select('.nodestext')
        .selectAll('text')
        .data(nodes)                        //bind data
        .call(drag(simulation));            //allow dragging  

      selection.enter()                     //for each row in the data do...
        .append('text')
        .on('click', function (d) {
          //alert(d.id)
          //d3.select(this).style("fill", "magenta")
        })
        .on("mouseover", function (d) {
          set_highlight(d, get_connectedNodes(d), get_connectedLinks(d));
        })
        .on("mouseout", function (d) {
          exit_highlight(d);
          exit_fade(d)
        })
        .on("mousedown", function (d) {
          console.log('d nodetext:' + d.id)
          set_fade(d, get_connectedNodes(d));

        })
        .on("mouseup", function (d) {
          console.log('mouseup')
        })                    //add element
        .text(function (d) {                // add attributes
          return d.id
        })
        .merge(selection)
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      // 2nd way of doing it
      // .attr('x', function (d) { return d.x })
      // .attr('y', function (d) { return d.y })
      // .attr('dy', function (d) { return 5 })

      selection.exit().remove()
    }

    function updateNodesellipse() {
      var selection = d3.select('.nodesellipse')
        .selectAll('ellipse')
        .data(nodes)             //bind data
        .call(drag(simulation));            //allow dragging  

      selection.enter()                     //for each row in the data do...
        .append('ellipse')
        .on('click', function (d) {
          //alert(d.id)
          //d3.select(this).style("fill", "magenta")
        })
        .on("mouseover", function (d) {
          set_highlight(d, get_connectedNodes(d), get_connectedLinks(d));
        })
        .on("mouseout", function (d) {
          exit_highlight(d);
          exit_fade(d);
        })
        .on("mousedown", function (d) {
          console.log('d nodeellipse:' + d.id)
          set_fade(d, get_connectedNodes(d));
        })
        .on("mouseup", function (d) {
          console.log('mouseup')
        })
        .attr("rx", function (d) { return 30 }) //d.id.length
        .attr("ry", function (d) { return 30 }) //d.id.length
        .attr("class", "ellipse")
        .classed('uri', function (d) { return d.type === 'uri' })
        .classed('literal', function (d) { return d.type === 'literal' })
        //.style("fill", "#FD8D3C")
        .merge(selection)
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })

      selection.exit().remove()
    }

    //link properties
    function updateLinks() {
      var selection = d3.select('.links')
        .selectAll('path')
        .data(links)

      selection.enter()
        .append('path')
        .attr("class", function (d) { return "link" })
        .attr("class", function (d) { return "link " + d.property; })
        .attr("id", function (d, i) { return "linkId_" + i; })
        .attr("marker-end", function (d) { return "url(#" + d.property.replace(/\s/g, '') + ")"; }) //removed to allow matching
        .merge(selection)
        .attr("d", function (d) {
          var dx = d.target.x - d.source.x
          var dy = d.target.y - d.source.y
          if (d.linknum) {
            var dr = d.linknum * 150 - 150;
          }
          else {
            var dr = 0
          }

          return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        })



      selection.exit().remove()
    }

    function updateLinksText() {
      var selection = d3.select('.linkstext')
        .selectAll('text')
        .data(links)

      selection.enter()
        .append("text")
        .attr("x", "200")
        .attr("class", "linklabel")
        .append("textPath")
        .attr("xlink:href", function (d, i) { return "#linkId_" + i; })
        .text(function (d) {
          return d.property;
        })

      selection.exit().remove()
    }

    function updateLinkMarkers() {
      var selection = d3.select('.defs')
        .selectAll('marker')
        .data(getAllLinkPropertys())

      selection.enter()
        .append("marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 40) // distance from link
        .attr("refY", 0) //deviation from link linke
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");


      selection.exit().remove()
    }

    function getAllLinkPropertys() {

      var linkpropertys = []
      links.forEach(element => {
        linkpropertys.push(element.property.replace(/\s/g, ''))
      });
      return linkpropertys
    }

    //update drawing nodes and links
    function ticked() {
      console.log('ticked')
      updateNodesText()
      updateNodesellipse()
      updateLinks()
      updateLinksText()
      updateLinkMarkers()
    }

    // dragging
    const drag = (simulation) => {
      const dragstarted = (d) => {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };

      const dragended = (d) => {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    };

    function get_connectedNodes(d) {
      //get connected nodes of d
      var connectedNodes = []

      connectedNodes.push(d.id) //add the node that is being hoverd so that it is also highlighted

      links.forEach(link => {
        if (link.source.id === d.id) {
          if (!connectedNodes.includes(link.target.id)) connectedNodes.push(link.target.id)
        }
        if (link.target.id === d.id) {
          if (!connectedNodes.includes(link.source.id)) connectedNodes.push(link.source.id)
        }
      });
      console.log('connectedNodes: ')
      console.log(connectedNodes)
      return connectedNodes
    }

    function get_connectedLinks(d) {
      //get connected links of d
      var connectedLinks = []

      links.forEach(link => {
        if (link.source.id === d.id || link.target.id === d.id) {
          connectedLinks.push({ source: link.source.id, target: link.target.id })
        }
      });
      console.log('connectedLinks: ')
      console.log(connectedLinks)
      return connectedLinks
    }

    function set_highlight(d, connectedNodes) {
      // filter based on connectednodes
      d3.select('.nodesellipse').selectAll('ellipse')
        .filter(function (ellipses) {
          if (connectedNodes.includes(ellipses.id)) { return true }
          else { return false }
        })
        // set class
        .classed('ellipse_highlight', true);
    }

    function exit_highlight(d) {
      //remove all highlights
      d3.select('.nodesellipse').selectAll('ellipse')
        .filter(function (d) { return true })
        .classed('ellipse_highlight', false);
    }

    function set_fade(d, connectedNodes) {
      console.log('setting fade')
      d3.select('.nodesellipse').selectAll('ellipse')
        .filter(function (ellipses) {
          if (!(connectedNodes.includes(ellipses.id))) { return true }
          else { return false }
        })
        // set class
        .classed('faded', true);


      d3.select('.nodestext').selectAll('text')
        .filter(function (ellipses) {
          if (!(connectedNodes.includes(ellipses.id))) { return true }
          else { return false }
        })
        // set class
        .classed('faded', true);


    }
    function exit_fade(d) {
      //remove all highlights
      d3.select('.nodesellipse').selectAll('ellipse')
        .filter(function (d) { return true })
        .classed('faded', false);

      d3.select('.nodestext').selectAll('text')
        .filter(function (d) { return true })
        .classed('faded', false);


    }

  }

  render() {
    return <div id="forcegraph">
    </div >;
  }
}

export default ForceGraph