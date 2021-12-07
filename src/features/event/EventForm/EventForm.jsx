import React, { Component } from 'react'
import { Button, Form, Segment , Grid, Header} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {createEvent, updateEvent, cancelToggle} from '../eventActions'
// import cuid from 'cuid'
import { reduxForm, Field } from 'redux-form'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate'
import DateInput from '../../../app/common/form/DateInput'
import {withFirestore} from 'react-redux-firebase'
// import { toastr } from 'react-redux-toastr'


const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id

  let event = {}
  if (state.firestore.ordered.Events && state.firestore.ordered.Events.length > 0) {
    
    event = state.firestore.ordered.Events.filter(e => e.id === eventId)[0] || {}
  }
  return {
    initialValues: event,
    event: event
  }
}
const mapDispatch = {
  createEvent,
  updateEvent,
  cancelToggle
}

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'The event category is required'}),
  description: composeValidators(
    isRequired({message: 'The event description is required'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 charaters'})
  )(),
  city: isRequired({message: 'City is required'}),
  venue: isRequired({message: 'Venue is required'}),
  date: isRequired({message: 'Date is required'})

}) 



class EventForm extends Component {


  onFormSubmit = async (values) => {
    
    try {
      if (this.props.initialValues.id) {
        this.props.updateEvent(values)
        this.props.history.push(`/events/${this.props.initialValues.id}`)
      } else {
        const createdEvent = await this.props.createEvent(values)
        this.props.history.push(`/events/${createdEvent.id}`)
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  async componentDidMount () {
    const {firestore, match } = this.props
    
   await firestore.setListener(`Events/${match.params.id}`)
  
  }

  async componentWillUnmount () { 
    const {firestore, match} = this.props
    await firestore.unsetListener(`Events/${match.params.id}`)
  }

  
  
  render() {
    const {history, initialValues, invalid, submitting, pristine, event, cancelToggle} = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
        <Segment>
          <Header sub color='teal' content='Event Details' />
          <Form >
            <Field 
              name='title' 
              component={TextInput}
              placeholder='Give your event name'
            />
            <Field 
              name='category' 
              component={SelectInput}
              options={category}
              multiple={false}
              placeholder='What is your event about?'
            />
            <Field 
              name='description' 
              component={TextArea}
              rows={3}
              placeholder='Tell us about your event'
            />
            <Header sub color='teal' content='Event Location Details' />
            <Field 
              name='city' 
              component={TextInput}
              placeholder='Event City'
            />
            <Field 
              name='venue' 
              component={TextInput}
              placeholder='Event Venue'
            />
            <Field 
              name='date' 
              component={DateInput}
              dateFormat='dd LLL yyyy  h:mm a'
              showTimeSelect={true}
              timeFormat='HH:mm'
              placeholder='Event Date'
            />
            <Button disabled={invalid || submitting || pristine} onClick={this.props.handleSubmit(this.onFormSubmit)} positive type="submit">
              Submit
            </Button>
            <Button 
              onClick={
                initialValues.id 
                ? () => history.push(`/events/${initialValues.id}`) 
                : () => history.push(`/events`)
              } 
              type="button" >Cancel</Button>
              <Button 
                type='button' 
                floated='right'
                onClick={() => cancelToggle(!event.cancelled, event.id)} 
                color={event.cancelled ? 'green' : 'red'} 
                content={event.cancelled ? 'Reactive event' : 'Cancel Event'}
              />
          </Form>
        </Segment>
        </Grid.Column>
      </Grid>
      
    )
  }
}

export default withFirestore(
  connect(mapState, mapDispatch)((reduxForm({form: 'eventForm', validate, enableReinitialize: true}))(EventForm))
)
