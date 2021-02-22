import { SET_SELECTED_NODE, REMOVE_SELECTED_NODE, SET_SELECTED_HISTORYGRAPH } from '../actionTypes'

import { FETCH_ABOUT_CLICKED_NODE_REQUEST, FETCH_ABOUT_CLICKED_NODE_SUCCESS, FETCH_ABOUT_CLICKED_NODE_FAILURE } from '../actionTypes'
import { FETCH_PARENT_AND_SUB_NODES_REQUEST, FETCH_PARENT_AND_SUB_NODES_SUCCESS, FETCH_PARENT_AND_SUB_NODES_FAILURE } from '../actionTypes'
import { FETCH_SPARQL_ABOUTSUBJECT_REQUEST, FETCH_SPARQL_ABOUTSUBJECT_SUCCESS, FETCH_SPARQL_ABOUTSUBJECT_FAILURE } from '../actionTypes'
import { FETCH_HISTORY_GRAPHS_REQUEST, FETCH_HISTORY_GRAPHS_SUCCESS, FETCH_HISTORY_GRAPHS_FAILURE } from '../actionTypes'
import { FETCH_FROM_HISTORIC_GRAPH_REQUEST, FETCH_FROM_HISTORIC_GRAPH_SUCCESS, FETCH_FROM_HISTORIC_GRAPH_FAILURE } from '../actionTypes'

import { thunkCreator } from './utils'
import qs from 'qs'

const axios = require('axios');

export const setSelectedNode = (node) => {
  return {
    type: SET_SELECTED_NODE,
    node
  }
}

export const removeSelectedNode = (node) => {
  return {
    type: REMOVE_SELECTED_NODE,
  }
}

export const setSelectedHistoryGraph = (graph) => {
  return {
    type: SET_SELECTED_HISTORYGRAPH,
    graph
  }
}

export const fetchAboutSubject = (query, datasource) => thunkCreator({
  types: [FETCH_SPARQL_ABOUTSUBJECT_REQUEST, FETCH_SPARQL_ABOUTSUBJECT_SUCCESS, FETCH_SPARQL_ABOUTSUBJECT_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query,
    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },
    subject: query.substring(query.lastIndexOf("<") + 1, query.lastIndexOf(">")) // get the subject from the querystring

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

export const fetchAboutClickedNode = (subject, datasource) => thunkCreator({
  types: [FETCH_ABOUT_CLICKED_NODE_REQUEST, FETCH_ABOUT_CLICKED_NODE_SUCCESS, FETCH_ABOUT_CLICKED_NODE_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource.currentDatasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query: 'SELECT * ' + 'WHERE { <' + subject + '> ?property ?object }' + 'limit 200'
    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },
    subject: subject

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

export const fetchParentAndSubNodes = (node, datasource) => thunkCreator({
  types: [FETCH_PARENT_AND_SUB_NODES_REQUEST, FETCH_PARENT_AND_SUB_NODES_SUCCESS, FETCH_PARENT_AND_SUB_NODES_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource.currentDatasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query: 'SELECT ?subject ?property ?object {{<' + node +  '> ?property ?object . } UNION {?subject ?property <' + node + '>  .}}'

    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },
    node: node

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

export const fetchHistoryGraphs = (subject, datasource) => thunkCreator({
  types: [FETCH_HISTORY_GRAPHS_REQUEST, FETCH_HISTORY_GRAPHS_SUCCESS, FETCH_HISTORY_GRAPHS_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource.currentDatasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query:
      //START 
      'PREFIX foaf: <http://xmlns.com/foaf/0.1/> prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> select ?subject ?graph where { graph ?graph {{?subject foaf:page ?object FILTER (regex(?subject, "' + subject + 
      '", "i")) .}}{SELECT ?subject WHERE {<' + subject + '>?predicate ?object } LIMIT 1}}'
      //END
    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },
    subject: subject

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

export const fetchFromHistoricGraphs = (subject, datasource) => thunkCreator({
  types: [FETCH_FROM_HISTORIC_GRAPH_REQUEST, FETCH_FROM_HISTORIC_GRAPH_SUCCESS, FETCH_FROM_HISTORIC_GRAPH_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource.currentDatasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query:
      //START 
        'Select * where {Graph <' + subject + '> { ?subject ?property ?object .}}'

      //END
    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },
    subject: subject

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})