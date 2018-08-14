import firebase from 'firebase'
import 'firebase/firestore'
import { navigateTo } from 'gatsby-link'
import moment from 'moment'

const config = {
  apiKey: 'AIzaSyCbFZ7xiMAbvt9LtlknAa4eeK-WMqV9f1s',
  authDomain: 'lipslut-d08c5.firebaseapp.com',
  databaseURL: 'https://lipslut-d08c5.firebaseio.com',
  projectId: 'lipslut-d08c5',
  storageBucket: 'lipslut-d08c5.appspot.com',
  messagingSenderId: '973290593236',
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
      default:
        console.error('incorrect usage')
        break
    }
  }
  signUpGoogle = componentThis => {
    this.auth()
      .signInWithPopup(new this.auth.GoogleAuthProvider())
      .then(user => {
        const userInfo = user.user
        this.store()
          .collection('users')
          .doc(userInfo.uid)
          .set({
            name: userInfo.displayName,
            email: userInfo.email,
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
            orderHistory: [],
            newsletter: false,
          })
      })
      .then(() => navigateTo('/'))
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
        const userInfo = user.user
        if (newsletter) {
          firebase
            .store()
            .collection('emails')
            .add({ email: email })
        }
        this.store()
          .collection('users')
          .doc(userInfo.uid)
          .set({
            name: firstName + ' ' + lastName,
            email: email,
            newsletter: newsletter,
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
      })
      .then(() => navigateTo('/'))
      .catch(function(error) {
        const errorMessage = error.message
        componentThis.props.handleError(errorMessage)
      })
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
      .doc(user.id)
      .update({
        billing: {
          card: user.data.billing.card,
          address_city: city,
          address_state: user.data.billing.address_state,
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
      .doc(user.id)
      .update({
        orderHistory: [
          ...user.data.orderHistory,
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
              ? res.data.customer.id
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
