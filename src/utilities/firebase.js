import firebase from 'firebase'
import 'firebase/firestore'
import { navigateTo } from 'gatsby-link'
import moment from 'moment'
import axios from 'axios'

const config = {
  apiKey: 'AIzaSyCbFZ7xiMAbvt9LtlknAa4eeK-WMqV9f1s',
  authDomain: 'lipslut-d08c5.firebaseapp.com',
  databaseURL: 'https://lipslut-d08c5.firebaseio.com',
  projectId: 'lipslut-d08c5',
  storageBucket: 'lipslut-d08c5.appspot.com',
  messagingSenderId: '973290593236',
}

// TODO move functions into seprate modules Like this
export const addEmail = email => {
  this.store()
    .collection('emails')
    .add({
      email: email,
    })
}

class Firebase {
  constructor() {
    firebase.initializeApp(config)
    this.store = firebase.firestore
    this.auth = firebase.auth
  }

  addEmail = email => {
    this.store()
      .collection('emails')
      .add({
        email: email,
      })
  }

  signIn = uid => {
    return this.store()
      .collection('users')
      .doc(uid)
      .get()
  }

  checkDb = email => {
    // TODO Learn to query db for email string and see if user exists to avoid login no write issue
    this.store()
      .collection('users')
      .doc(uid)
      .get()
      ? true
      : false
  }

  login = (componentThis, signInMethod, email, password) => {
    switch (signInMethod) {
      case 'google':
        this.auth()
          .signInWithPopup(new this.auth.GoogleAuthProvider())
          .then(() => navigateTo('/'))
          .catch(error => {
            let errorMessage = error.message
            componentThis.props.handleError(errorMessage)
          })
        break
      case 'emailPassword':
        this.auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => navigateTo('/'))
          .catch(function(error) {
            let errorMessage = error.message
            componentThis.props.handleError(errorMessage)
          })
      case 'facebook':
        this.auth()
          .signInWithPopup(new this.auth.FacebookAuthProvider())
          .then(() => navigateTo('/'))
          .catch(error => {
            let errorMessage = error.message
            componentThis.props.handleError(errorMessage)
          })
      default:
        console.error('incorrect usage')
        break
    }
  }

  signupGoogle = componentThis => {
    this.auth()
      .signInWithPopup(new this.auth.GoogleAuthProvider())
      .then(user => this.storeUser(user.user))
      .catch(error => {
        const errorMessage = error.message
        componentThis.props.handleError(errorMessage)
      })
  }
  signupFacebook = componentThis => {
    this.auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(user => this.storeUser(user.user))
      .catch(error => {
        const errorMessage = error.message
        componentThis.props.handleError(errorMessage)
      })
  }
  signupEmailPassword = (
    componentThis,
    firstName,
    lastName,
    email,
    password,
    newsletter
  ) => {
    this.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        let userInfo = {
          uid: user.user.uid,
          email: user.user.email,
          displayName: firstName + ' ' + lastName,
        }
        if (newsletter) {
          this.addEmail(userInfo.email)
        }
        this.storeUser(userInfo)
      })
      .catch(function(error) {
        const errorMessage = error.message
        componentThis.props.handleError(errorMessage)
      })
  }
  storeUser = user => {
    this.store()
      .collection('users')
      .doc(user.uid)
      .set({
        name: user.displayName,
        email: user.email,
        newsletter: user.newsletter,
        orderHistory: [],
        billing: {
          email: '',
          address_city: '',
          address_line1: '',
          address_line2: '',
          address_state: '',
          firstName: '',
          lastName: '',
          zip: '',
          phone: '',
          card: '',
        },
      })
      .then(() => navigateTo('/'))
  }

  updateAccount = (
    user,
    firstName,
    lastName,
    email,
    address,
    apartment,
    city,
    zip,
    phone
  ) => {
    this.store()
      .collection('users')
      .doc(user.uid)
      .update({
        billing: {
          card: user.billing.card || '',
          address_city: city,
          address_state: user.billing.address_state || '',
          address_line1: address,
          address_line2: apartment,
          zip: zip,
          phone: phone,
        },
        email: email,
        name: firstName + ' ' + lastName,
      })
  }
  updatePayment = (
    res,
    user,
    cart,
    total,
    city,
    state,
    address,
    apartment,
    zip,
    phone,
    newsletter
  ) => {
    this.store()
      .collection('users')
      .doc(user.uid)
      .update({
        orderHistory: [
          ...user.orderHistory,
          {
            cart: [...cart],
            placed: moment().format('MMMM Do YYYY'),
            total: total,
            orderNumber: parseInt(Math.random() * 1000),
          },
        ],
        billing: {
          card:
            res.data.customerType == 'New'
              ? res.data.customer
              : res.data.previousCustomer,
          address_city: city,
          address_state: state,
          address_line1: address,
          address_line2: apartment,
          zip: zip,
          phone: phone,
        },
        newsletter: newsletter,
      })
  }
}

export default new Firebase()
