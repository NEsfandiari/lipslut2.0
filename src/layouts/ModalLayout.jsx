import { Component } from 'react'
import ReactDOM from 'react-dom'

//top level component uses portal to insert children into top level of DOM
//modalContainer is located in layout index.js, whenever modal is rendered
//it's children get placed in modalContainer
class ModalLayout extends Component {
  constructor(props) {
    super(props)
    this.modalNode = document.createElement('div')
    this.modalRoot = null
  }

  componentDidMount() {
    this.modalRoot = document.getElementById('modalContainer')
    this.modalRoot.appendChild(this.modalNode)
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.modalNode)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.modalNode)
  }
}

export default ModalLayout
