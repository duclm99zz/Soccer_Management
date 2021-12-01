import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button } from 'semantic-ui-react'
import { asyncIncrement, asyncDecrement } from './testAction'
import { openModal } from '../modals/modalAction'
const mapState = (state) => ({
  data: state.test.testData,
  loading: state.async.loading,
  buttonName: state.async.elementName
})
const mapDispatch = {
  asyncIncrement,
  asyncDecrement,
  openModal
}

class TestComponent extends Component {
  

  render() {
    const { openModal } = this.props
    const {data, asyncIncrement, asyncDecrement, loading, buttonName} = this.props
    return (
      <div>
        <h1>Test Component</h1>
        <h3>The answer is: {data}</h3>
        <Button name='increment' loading={buttonName === 'increment' && loading} color='facebook' content='Increment' onClick={(e) => asyncIncrement(e.target.name)} />
        <Button name='decrement' loading={buttonName === 'decrement' && loading} color='olive' content='Decrement' onClick={(e) => asyncDecrement(e.target.name) }/>
        <Button color='pink' content='Open Modal' onClick={() => openModal('TestModal', {data: 42}) }/>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(TestComponent)
