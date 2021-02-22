import React from 'react';
import { ButtonGroup, Button, Dropdown, Row, Col } from 'react-bootstrap'

import ConnectedAddDatasource from '../containers/ConnectedAddDatasource'

class DataSourceDropdown extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const renderBlockButton = (item) => {
      if (item.active) {
        return (
          <Button onClick={() => this.props.toggleBlockDatasource(item)}>Block </Button>
        )
      }
      else {
        return (
          <Button onClick={() => this.props.toggleBlockDatasource(item)}>Unblock </Button>
        )
      }
    }

    const renderDatasourceDropdown = () => {
      if (this.props.datasource.searchAll === 'Uit') {
        return (
          <Dropdown className="w-100">
            <Dropdown.Toggle >Geselecteerde bron: {this.props.datasource.currentDatasource}</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.props.datasource.datasources.map((item, key) =>
                <Dropdown.Item key={key} >
                  <Row>
                    <Col>
                      <div onClick={() => this.props.setCurrentDatasource(item)}>{item.name}</div>
                    </Col>
                    <Col>
                      <ButtonGroup className="float-right">

                        {renderBlockButton(item)}
                        <Button onClick={() => this.props.deleteDatasource(item)}>Remove</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Dropdown.Item>
              )}
              {<ConnectedAddDatasource />}
            </Dropdown.Menu>
          </Dropdown>)
      }
    }

    return (
      <div id="Datasource">
        <Row>
          <Col sm={4}>
            <Button className="w-100" onClick={() => this.props.toggleSearchAll()}>Doorzoek alle bronnen: {this.props.datasource.searchAll}</Button>
          </Col>
          <Col sm={8}>
            {renderDatasourceDropdown()}
          </Col>
        </Row>

      </div>
    )
  }
}

export default DataSourceDropdown
