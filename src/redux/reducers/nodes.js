import { SET_SELECTED_NODE, REMOVE_SELECTED_NODE, FETCH_HISTORY_GRAPHS_SUCCESS, SET_SELECTED_HISTORYGRAPH, FETCH_PARENT_AND_SUB_NODES_SUCCESS } from '../actionTypes'
import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_ABOUTSUBJECT_SUCCESS, FETCH_ABOUT_CLICKED_NODE_SUCCESS, FETCH_FROM_HISTORIC_GRAPH_SUCCESS } from '../actionTypes'

export default function nodeReducer(state = {
  selectedNode: "",
  nodesList: [
    { id: 'Subject', type: 'literal' },
    { id: 'Object', type: 'literal' },
  ]
}, action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case SET_SELECTED_NODE: {
      const node = action.node
      NewState.selectedNode = node
      return NewState
    }
    case REMOVE_SELECTED_NODE: {
      NewState.selectedNode = ""
      return NewState
    }

    case FETCH_TEST_SUCCESS: {

      var links = [
        { source: { value: "http://example.nl/persoon/Wisse", type: "uri" }, target: { value: "http://example.nl/bedrijf/DUO", type: "uri" }, property: "http://example.nl/Is stagair bij" },
        { source: { value: "http://example.nl/persoon/Wisse", type: "uri" }, target: { value: "http://example.nl/adres/Adres1", type: "uri" }, property: "http://example.nl/Heeft Woonadres" },
        { source: { value: "http://example.nl/adres/Adres1", type: "uri" }, target: { value: "7913TH", type: "literal" }, property: "http://example.nl/Postcode" },
        { source: { value: "http://example.nl/adres/Adres1", type: "uri" }, target: { value: "25", type: "literal" }, property: "http://example.nl/Nummer" },
        { source: { value: "http://example.nl/adres/Adres1", type: "uri" }, target: { value: "Zuideropgaande", type: "literal" }, property: "http://example.nl/Straatnaam" },
        { source: { value: "http://example.nl/adres/Adres1", type: "uri" }, target: { value: "Hollandscheveld", type: "literal" }, property: "http://example.nl/Plaatsnaam" },
        { source: { value: "http://example.nl/bedrijf/DUO", type: "uri" }, target: { value: "http://example.nl/adres/Adres2", type: "uri" }, property: "http://example.nl/Heeft adres" },
        { source: { value: "http://example.nl/adres/Adres2", type: "uri" }, target: { value: "9722TB", type: "literal" }, property: "http://example.nl/Postcode" },
        { source: { value: "http://example.nl/adres/Adres2", type: "uri" }, target: { value: "12", type: "literal" }, property: "http://example.nl/Nummer" },
        { source: { value: "http://example.nl/adres/Adres2", type: "uri" }, target: { value: "Kempkensberg", type: "literal" }, property: "http://example.nl/Straatnaam" },
        { source: { value: "http://example.nl/adres/Adres2", type: "uri" }, target: { value: "Groningen", type: "literal" }, property: "Plaatsnaam" },
        { source: { value: "http://example.nl/persoon/Wisse", type: "uri" }, target: { value: "http://example.nl/adres/Adres2", type: "uri" }, property: "Werkadres" },
      ]

      NewState.nodesList = []

      //distinct nodes
      var templist = []
      links.forEach(link => {
        if (!templist.includes(link.source.value)) {
          NewState.nodesList.push({ id: link.source.value, type: link.source.type })
        }
        if (!templist.includes(link.target.value)) {
          NewState.nodesList.push({ id: link.target.value, type: link.target.type })
        }

        templist.push(link.source.value)
        templist.push(link.target.value)
      })
      console.log('node NewState: ' + NewState)
      return NewState
    }
    case FETCH_SPARQL_SUCCESS: {
      NewState.nodesList = []

      //distinct nodes
      var templist = []

      //var names from the result
      var vars = action.result.data.head.vars


      action.result.data.results.bindings.forEach(element => {

        //add subject and object to templist
        if (!templist.includes(element[vars[0]].value)) {
          NewState.nodesList.push({ id: element[vars[0]].value, type: element[vars[0]].type })
        }
        if (!templist.includes(element[vars[2]].value)) {
          NewState.nodesList.push({ id: element[vars[2]].value, type: element[vars[2]].type })
        }

        templist.push(element[vars[0]].value)
        templist.push(element[vars[2]].value)
      })
      return NewState
    }
    case FETCH_SPARQL_ABOUTSUBJECT_SUCCESS: {

      NewState.nodesList = []

      //distinct nodes
      var templist = []

      // add main subject to nodeslist
      NewState.nodesList.push({ id: action.result.config.subject, type: 'uri' })

      //var names from the result
      var vars = action.result.data.head.vars

      // for each triple
      action.result.data.results.bindings.forEach(element => {
        console.log('hier: ')
        console.log(element[action.result.data.head.vars[1]]['xml:lang'])

        //check if property comes from the same base URL as the subject
        if (element[vars[0]].value.split('/')[2] === action.result.config.subject.split('/')[2]) {

          //add targets to nodeslist
          if (!templist.includes(element[vars[1]].value)) {

            //xml lang set
            if (element[action.result.data.head.vars[1]]['xml:lang'] && (element[action.result.data.head.vars[1]]['xml:lang'] === 'en' || element[action.result.data.head.vars[1]]['xml:lang'] === 'nl')) {
              NewState.nodesList.push({ id: element[action.result.data.head.vars[1]].value, type: element[vars[1]].type })
            }
            //xml lang not set
            if (!element[action.result.data.head.vars[1]]['xml:lang']) {
              NewState.nodesList.push({ id: element[action.result.data.head.vars[1]].value, type: element[vars[1]].type })
            }

          }
          templist.push(element[vars[1]].value)
        }
      })
      return NewState
    }
    case FETCH_ABOUT_CLICKED_NODE_SUCCESS: {
      NewState.nodesList = state.nodesList

      //distinct nodes
      
      //var names from the result
      var vars = action.result.data.head.vars

      // for each triple
      action.result.data.results.bindings.forEach(element => {

        //check if property comes from the same base URL as the subject
        if (element[vars[0]].value.split('/')[2] === action.result.config.subject.split('/')[2]) {

          //add targets to nodeslist
          const contains = (node) => node.id === element[action.result.data.head.vars[1]].value
          if (!NewState.nodesList.some(contains)) {
            //console.log('didnotcontain')

            //xml lang set
            if (element[action.result.data.head.vars[1]]['xml:lang'] && (element[action.result.data.head.vars[1]]['xml:lang'] === 'en' || element[action.result.data.head.vars[1]]['xml:lang'] === 'nl')) {
              NewState.nodesList.push({ id: element[action.result.data.head.vars[1]].value, type: element[vars[1]].type })
            }
            //xml lang not set
            if (!element[action.result.data.head.vars[1]]['xml:lang']) {
              NewState.nodesList.push({ id: element[action.result.data.head.vars[1]].value, type: element[vars[1]].type })
            }

          }
        }
      })
      return NewState

    }
    case FETCH_PARENT_AND_SUB_NODES_SUCCESS: {
      NewState.nodesList = state.nodesList

      //subject = 0, property = 1, object = 2

      action.result.data.results.bindings.forEach(element => {
        if(element.subject){
          // check and add
          console.log(element.subject.value)
          
          //add subject to nodeslist
          const contains = (node) => node.id === element.subject.value
          if (!NewState.nodesList.some(contains)) {
            console.log('didnotcontain')
            NewState.nodesList.push({ id: element.subject.value, type: element.subject.type })          

          }
          
        } 
        if(element.object){
          // check and add
          console.log(element.object.value)

          //add targets to nodeslist
          const contains = (node) => node.id === element.object.value
          if (!NewState.nodesList.some(contains)) {
            console.log('didnotcontain')
            NewState.nodesList.push({ id: element.object.value, type: element.object.type })          

          }
        }       
      })
      
      return NewState
    }
    case FETCH_HISTORY_GRAPHS_SUCCESS: {
      NewState.selectedNode.historyList = []

      action.result.data.results.bindings.forEach(element => {
        NewState.selectedNode.historyList.push(element.graph.value)
      })
      return NewState
    }
    case FETCH_FROM_HISTORIC_GRAPH_SUCCESS: {
      NewState.selectedNode.history = action.result.data.results.bindings
      return NewState
    }
    case SET_SELECTED_HISTORYGRAPH: {
      const historyGraph = action.graph
      NewState.selectedNode.selectedHistoryGraph = historyGraph
      return NewState
    }
    default:
      return state
  }
}