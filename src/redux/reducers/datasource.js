import {
  SET_CURRENT_DATASOURCE, TOGGLE_SEARCHALL, TOGGLE_BLOCK_DATASOURCE, DELETE_DATASOURCE, ADD_DATASOURCE,
  FETCH_CLASSES_SUCCESS, FETCH_INSTANCES_OF_CLASS_SUCCESS,
  SET_SELECTED_CLASS, SET_SELECTED_INSTANCE
} from '../actionTypes';


export default function datasourceReducer(state = {
  searchAll: 'Uit',
  currentDatasource: 'https://lod.onderwijsregistratie.nl/rio/sparql',
  datasources: [
    {
      name: 'Onderwijsregistratie',
      endpoint: 'https://lod.onderwijsregistratie.nl/rio/sparql',
      active: true,
    },
    {
      name: 'dbpedia',
      endpoint: 'http://dbpedia.org/sparql',
      active: true,
    },
    {
      name: 'Basisregistratie adressen en gebouwen (alle voorkomens)',
      endpoint: 'https://bag.basisregistraties.overheid.nl/sparql',
      active: true,
    },
    {
      name: 'Basisregistratie adressen en gebouwen (nu geldige voorkomens)',
      endpoint: 'https://bag.basisregistraties.overheid.nl/sparql/now',
      active: true,
    },
    {
      name: 'Basisregistratie Kadaster - Digitale Kadastrale Kaart',
      endpoint: 'https://brk.basisregistraties.overheid.nl/sparql',
      active: true,
    },
    {
      name: 'Basisregitratie Topografie - Top10NL',
      endpoint: 'https://brt.basisregistraties.overheid.nl/sparql',
      active: true,
    },
    {
      name: 'Cultuurhistorische objecten',
      endpoint: 'https://linkeddata.cultureelerfgoed.nl/sparql',
      active: true,
    },
  ],
  classes: [],
  selectedClass: '',
  instances: [],
  selectedInstance: '',
}, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_CURRENT_DATASOURCE: {
      newState.currentDatasource = action.datasource.endpoint;
      return newState;
    }
    case TOGGLE_SEARCHALL: {
      if (state.searchAll === 'Aan') {
        newState.searchAll = 'Uit'
      }
      if (state.searchAll === 'Uit') {
        newState.searchAll = 'Aan'
      }

      return newState
    }
    case TOGGLE_BLOCK_DATASOURCE: {
      var index = state.datasources.indexOf(action.datasource)
      newState.datasources[index].active = !newState.datasources[index].active

      return newState
    }
    case DELETE_DATASOURCE: {
      var indexOfDatasourceToRemovedex = state.datasources.indexOf(action.datasource)
      newState.datasources.splice(indexOfDatasourceToRemovedex, 1)
      return newState
    }
    case ADD_DATASOURCE: {
      const name = action.name
      const endpoint = action.endpoint
      newState.datasources.push({
        name: name,
        endpoint: endpoint,
        active: true,
      })
      return newState
    }
    case FETCH_CLASSES_SUCCESS: {
      newState.classes = action.result.data.results.bindings
      return newState
    }
    case SET_SELECTED_CLASS: {
      newState.selectedClass = action.myclass
      return newState
    }
    case SET_SELECTED_INSTANCE: {
      newState.selectedInstance = action.instance
      return newState
    }
    case FETCH_INSTANCES_OF_CLASS_SUCCESS: {
      newState.instances = action.result.data.results.bindings
      return newState
    }

    default:
      return state
  }
}

