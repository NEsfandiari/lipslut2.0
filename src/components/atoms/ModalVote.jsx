import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa'
import StyledButton from './StyledButton'

//inline style for modal background (used inline style so we did not need to add more styles to top level index.css)
//styled components do not apply due to use of portal
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
    let charities
    if (this.props.charities !== null) {
      charities = this.props.charities.charities.map(charity => (
        <option value={charity}>{charity}</option>
      ))
    }
    return (
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
              <p style={{ fontWeight: 'normal', fontSize: '20px' }}>
                Cast your vote:
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
            <p>Our donation will be sent to the most popular charity.</p>
          </div>
          <div>
            <form action="" onSubmit={this.props.handleSubmit}>
              <select
                name="charities"
                id="charitiesDropDown"
                onChange={this.props.handleChangeModal}
                style={{
                  minWidth: '14rem',
                  marginBottom: '1rem',
                  width: '97%',
                }}
              >
                <option value="" />
                {charities}
              </select>
              <div>
                <StyledButton
                  width="14rem"
                  margin="0"
                  fontSize=".65rem"
                  height="2.5rem"
                >
                  <b>ADD TO BAG</b>
                </StyledButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalVote
