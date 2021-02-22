import { FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE } from '../actionTypes'
import { FETCH_SPARQL_REQUEST, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_FAILURE } from '../actionTypes'

import { thunkCreator } from './utils'
import qs from 'qs'

const axios = require('axios');

export const fetchTest = () => thunkCreator({
  types: [FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE],
  promise: fetch(`https://www.anapioficeandfire.com/api/books`)
    .then(response => response.json())
    .catch(error => { console.log(error) })

})

export const fetchSparql = (query, datasource) => thunkCreator({
  types: [FETCH_SPARQL_REQUEST, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_FAILURE],
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

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

