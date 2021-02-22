import { SET_CURRENT_DATASOURCE, TOGGLE_SEARCHALL, TOGGLE_BLOCK_DATASOURCE, DELETE_DATASOURCE, ADD_DATASOURCE } from '../actionTypes'
import { SET_SELECTED_CLASS, SET_SELECTED_INSTANCE } from '../actionTypes'

import { FETCH_CLASSES_REQUEST, FETCH_CLASSES_SUCCESS, FETCH_CLASSES_FAILURE } from '../actionTypes'
import { FETCH_INSTANCES_OF_CLASS_REQUEST, FETCH_INSTANCES_OF_CLASS_SUCCESS, FETCH_INSTANCES_OF_CLASS_FAILURE } from '../actionTypes'
import { thunkCreator } from './utils'
import qs from 'qs'
const axios = require('axios');

export const setCurrentDatasource = (datasource) => {
  return {
    type: SET_CURRENT_DATASOURCE,
    datasource
  }
}

export const toggleSearchAll = () => {
  return {
    type: TOGGLE_SEARCHALL
  }
}

export const toggleBlockDatasource = (datasource) => {
  return {
    type: TOGGLE_BLOCK_DATASOURCE,
    datasource
  }
}

export const deleteDatasource = (datasource) => {
  return {
    type: DELETE_DATASOURCE,
    datasource
  }
}

export const addDatasource = (name, endpoint) => {
  return {
    type: ADD_DATASOURCE,
    name,
    endpoint,
  }
}

export const fetchClasses = (datasource) => thunkCreator({
  types: [FETCH_CLASSES_REQUEST, FETCH_CLASSES_SUCCESS, FETCH_CLASSES_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query: 'SELECT DISTINCT ?type WHERE {?s a ?type.}',
    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

export const fetchInstances = (datasource, c) => thunkCreator({
  types: [FETCH_INSTANCES_OF_CLASS_REQUEST, FETCH_INSTANCES_OF_CLASS_SUCCESS, FETCH_INSTANCES_OF_CLASS_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query:
        'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
        'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +
        'SELECT ?subject ?label WHERE {' +
        '?subject rdf:type <' + c.type.value + '>.' +
        '?subject rdfs:label ?label' +
        '}',
    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

export const setSelectedClass = (myclass) => {
  return {
    type: SET_SELECTED_CLASS,
    myclass
  }
}

export const setSelectedInstance = (instance) => {
  return {
    type: SET_SELECTED_INSTANCE,
    instance
  }
}


