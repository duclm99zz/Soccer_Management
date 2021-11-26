import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button } from 'semantic-ui-react'
import { incrementAction, decrementAction } from './testAction'

const mapState = ({test}) => ({
  data: test.testData
})
const mapDispatch = {
  incrementAction,
  decrementAction
}

class TestComponent extends Component {
  

  render() {
    const {data, incrementAction, decrementAction} = this.props
    return (
      <div>
        <h1>Test Component</h1>
        <h3>The answer is: {data}</h3>
        <Button color='facebook' content='Increment' onClick={incrementAction} />
        <Button color='olive' content='Decrement' onClick={decrementAction }/>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(TestComponent)
