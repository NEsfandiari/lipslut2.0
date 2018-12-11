import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa'
import ModalLayout from '../../layouts/ModalLayout'

/// Styled components do not apply due to use of React portal for modal
const style = {
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  zIndex: 100000,
}

const ingredientsStyle = {
  border: '2px solid black',
  padding: '2em',
  backgroundColor: 'white',
  width: '70%',
  height: 'fit-content',
  margin: '0 auto',
}

class ModalIngredients extends Component {
  render() {
    return (
      <ModalLayout>
        <div style={style}>
          <div id="ingredientsBox" style={ingredientsStyle}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3>Ingredients</h3>
              </div>
              <div>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 0,
                  }}
                  onClick={this.props.toggleList}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <p style={{ fontSize: '12px', lineHeight: '20px' }}>
              {this.props.ingredients}
            </p>
          </div>
        </div>
      </ModalLayout>
    )
  }
}

export default ModalIngredients
