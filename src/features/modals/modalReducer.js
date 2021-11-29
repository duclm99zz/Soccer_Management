import {createReducer}  from '../../app/common/utils/reducerUtils'
import { MODAL_CLOSE, MODAL_OPEN } from './modalConstant'

const initiaState = null


const openModal = (state, payload) => {
  const {modalType, modalProps} = payload
  return {modalType, modalProps}
}

const closeModal = (state) => {
  return null
}


export default createReducer(initiaState, {
  [MODAL_CLOSE]: closeModal,
  [MODAL_OPEN]: openModal
})