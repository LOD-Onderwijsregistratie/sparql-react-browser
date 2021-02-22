import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'



//pages
import Home from '../pages/Home'
import Graph from '../pages/Graph'
import Contact from '../pages/Contact'
import Notfound from '../pages/NotFound'
import { Container } from 'react-bootstrap'

class PageContent extends React.Component {
  render() {
    return (
      <Container id="PageContent">
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sparql-react-browser/" component={Home} />
            <Route exact path="/sparql-react-browser/home" component={Home} />
            <Route path="/sparql-react-browser/graph" component={Graph} />
            <Route path="/sparql-react-browser/contact" component={Contact} />

            <Route component={Notfound} />
          </Switch>
        </div>
      </Container>
    )
  }
}

export default PageContent