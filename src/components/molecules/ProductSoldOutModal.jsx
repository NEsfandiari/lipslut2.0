import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa'
import ModalLayout from '../../layouts/ModalLayout'

// Styled components do not apply due to use of React portal for modal
const outerModalStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(29, 29, 29, 0.7)',
  zIndex: 100000,
}

const modalStyle = {
  padding: '2em',
  backgroundColor: 'white',
  width: '70%',
  height: 'fit-content',
  margin: '0 auto',
  maxWidth: '30rem',
}

class ModalVote extends Component {
  render() {
    return (
      <ModalLayout>
        <div style={outerModalStyle}>
          <div id="modalBox" style={modalStyle}>
            <div
              style={{
                display: 'flex',
                flex: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* TODO: Change copy */}
                <p style={{ fontWeight: 'normal', fontSize: '20px' }}>
                  Sold Out!
                </p>
              </div>

              <div>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 0,
                  }}
                  onClick={this.props.toggleModal}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div>
              {/* TODO: Change copy */}
              <p>Check back soon.</p>
            </div>
          </div>
        </div>
      </ModalLayout>
    )
  }
}

export default ModalVote
