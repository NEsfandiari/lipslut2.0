import React from 'react'
import renderer from 'react-test-renderer'
import Modal from '../components/Modal'

describe('Modal', () => {
  it('renders correctly', () => {
    document.body.innerHTML = `<div id='modalContainer'></div>`

    const tree = renderer.create(<Modal />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
