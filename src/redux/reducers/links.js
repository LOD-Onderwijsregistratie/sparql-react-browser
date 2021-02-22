import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_ABOUTSUBJECT_SUCCESS, FETCH_ABOUT_CLICKED_NODE_SUCCESS, FETCH_PARENT_AND_SUB_NODES_SUCCESS } from '../actionTypes'

import { sortBy, setLinkNum } from './utils'

export default function linkReducer(state = [
  { source: "Subject", target: "Object", property: "http://example.nl/property" },
], action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case FETCH_TEST_SUCCESS: {

      NewState = [
        { source: "http://example.nl/persoon/Wisse", target: "http://example.nl/bedrijf/DUO", property: "http://example.nl/Is stagair bij" },
        { source: "http://example.nl/persoon/Wisse", target: "http://example.nl/adres/Adres1", property: "http://example.nl/Heeft Woonadres" },
        { source: "http://example.nl/adres/Adres1", target: "7913TH", property: "http://example.nl/Postcode" },
        { source: "http://example.nl/adres/Adres1", target: "25", property: "http://example.nl/Nummer" },
        { source: "http://example.nl/adres/Adres1", target: "Zuideropgaande", property: "http://example.nl/Straatnaam" },
        { source: "http://example.nl/adres/Adres1", target: "Hollandscheveld", property: "http://example.nl/Plaatsnaam" },
        { source: "http://example.nl/bedrijf/DUO", target: "http://example.nl/adres/Adres2", property: "http://example.nl/Heeft adres" },
        { source: "http://example.nl/adres/Adres2", target: "9722TB", property: "http://example.nl/Postcode" },
        { source: "http://example.nl/adres/Adres2", target: "12", property: "http://example.nl/Nummer" },
        { source: "http://example.nl/adres/Adres2", target: "Kempkensberg", property: "http://example.nl/Straatnaam" },
        { source: "http://example.nl/adres/Adres2", target: "Groningen", property: "http://example.nl/Plaatsnaam" },
        { source: "http://example.nl/persoon/Wisse", target: "http://example.nl/adres/Adres2", property: "http://example.nl/Werkadres" },
      ]

      NewState.sort(sortBy('source'))


      NewState = setLinkNum(NewState)
      
      return NewState
    }
    case FETCH_SPARQL_SUCCESS: {
      
      NewState = []

      action.result.data.results.bindings.forEach(element => {
        //console.log(element)
        var source = element[action.result.data.head.vars[0]]
        var target = element[action.result.data.head.vars[2]]
        var property = element[action.result.data.head.vars[1]]
        var link = {}
        link.source = source.value
        link.target = target.value
        link.property = property.value
        NewState.push(link)

        NewState.sort(sortBy('source'))

        NewState = setLinkNum(NewState)

      });
      return NewState
    }
    case FETCH_SPARQL_ABOUTSUBJECT_SUCCESS: {
      NewState = []

      action.result.data.results.bindings.forEach(element => {

        var link = {}

        link.source = action.result.config.subject
        link.target = element[action.result.data.head.vars[1]].value
        link.property = element[action.result.data.head.vars[0]].value

        //check if property comes from the same base URL as the subject
        if (element[action.result.data.head.vars[0]].value.split('/')[2] === action.result.config.subject.split('/')[2]) {

          // add links to linklist
          //xml lang set --> used to set language of a literal
          if (element[action.result.data.head.vars[1]]['xml:lang'] && (element[action.result.data.head.vars[1]]['xml:lang'] === 'en' || element[action.result.data.head.vars[1]]['xml:lang'] === 'nl')) {
            NewState.push(link)
          }
          //xml lang not set
          if (!element[action.result.data.head.vars[1]]['xml:lang']) {
            NewState.push(link)
          }
        }

        NewState.sort(sortBy('source'))

        NewState = setLinkNum(NewState)

      });
      return NewState
    }
    case FETCH_ABOUT_CLICKED_NODE_SUCCESS: {
      NewState = state

      action.result.data.results.bindings.forEach(element => {

        var link = {}

        link.source = action.result.config.subject
        link.target = element[action.result.data.head.vars[1]].value
        link.property = element[action.result.data.head.vars[0]].value

        //check if property comes from the same base URL as the subject
        if (element[action.result.data.head.vars[0]].value.split('/')[2] === action.result.config.subject.split('/')[2]) {

          // // check if link is already in the linklist otherwise add
          // const contains = (e) => {
          //   console.log('element: ', e)
          //   console.log('link: ', link)
          //   return e === link};

          // if(!NewState.some(contains)) {
          //   console.log('didnotontain')
          // }
          // else {
          //   console.log('didcontain')
          // }

          // add links to linklist
          //xml lang set --> used to set language of a literal
          if (element[action.result.data.head.vars[1]]['xml:lang'] && (element[action.result.data.head.vars[1]]['xml:lang'] === 'en' || element[action.result.data.head.vars[1]]['xml:lang'] === 'nl')) {
            NewState.push(link)
          }
          //xml lang not set
          if (!element[action.result.data.head.vars[1]]['xml:lang']) {
            NewState.push(link)
          }
        }

        NewState.sort(sortBy('source'))

        NewState = setLinkNum(NewState)

      });
      return NewState
    }
    case FETCH_PARENT_AND_SUB_NODES_SUCCESS: {
      NewState = state

      return NewState
    }
    default:
      return state
  }
}