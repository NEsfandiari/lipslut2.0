import firebase from 'firebase'
import 'firebase/firestore'
import { navigate } from 'gatsby'
import postLambda from './postLambda'
// import * as admin from 'firebase-admin'

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

  signIn = uid => {
    return this.store()
      .collection('users')
      .doc(uid)
      .get()
  }

  addVote = async (charity, quantity) => {
    let voteData = await this.store()
      .collection('charities')
      .doc(charity)
      .get()
    //if there is no voteData for this charity in firebase, add the charity to firebase
    if (!voteData.data()) {
      this.store()
        .collection('charities')
        .doc(charity)
        .set({ votes: parseInt(quantity) })
    } else {
      //if there is voteData in firebase, get the previous vote total and add 1 to it
      let curVotes = voteData.data().votes
      this.store()
        .collection('charities')
        .doc(charity)
        .update({
          votes: curVotes + parseInt(quantity),
        })
    }
  }

  login = (componentThis, signInMethod, email, password) => {
    switch (signInMethod) {
      case 'google':
        this.auth()
          .signInWithPopup(new this.auth.GoogleAuthProvider())
          .then(user => {
            // TODO: Loads Page Too fast for
            navigate('/')
          })
          .catch(error => {
            let errorMessage = error.message
            componentThis.props.handleError(errorMessage)
          })
        break
      case 'emailPassword':
        this.auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => navigate('/'))
          .catch(function(error) {
            let errorMessage = error.message
            componentThis.props.handleError(errorMessage)
          })
        break
      case 'facebook':
        this.auth()
          .signInWithPopup(new this.auth.FacebookAuthProvider())
          .then(() => navigate('/'))
          .catch(error => {
            let errorMessage = error.message
            componentThis.props.handleError(errorMessage)
          })
        break
      default:
        console.error('incorrect usage')
        break
    }
  }

  signupGoogle = componentThis => {
    this.auth()
      .signInWithPopup(new this.auth.GoogleAuthProvider())
      .then(user => {
        let userInfo = {
          uid: user.user.uid,
          email: user.additionalUserInfo.profile.email,
          firstName: user.additionalUserInfo.profile.given_name,
          lastName: user.additionalUserInfo.profile.family_name,
          password: user.additionalUserInfo.profile.id,
          newsletter: true,
        }
        this.storeUser(userInfo)
      })
      .catch(error => {
        const errorMessage = error.message
        componentThis.props.handleError(errorMessage)
      })
  }
  signupFacebook = componentThis => {
    this.auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(user => {
        let userInfo = {
          uid: user.user.uid,
          email: user.additionalUserInfo.profile.email,
          firstName: user.additionalUserInfo.profile.first_name,
          lastName: user.additionalUserInfo.profile.last_name,
          password: user.additionalUserInfo.profile.id,
          newsletter: true,
        }
        this.storeUser(userInfo)
      })
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
          email,
          firstName,
          lastName,
          password,
          newsletter,
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

  // storeUser = user => {
  //   postLambda('newAccount', user)
  //     .then(res => {
  //       console.log('The result from correct email is: ', res)
  //       this.store()
  //         .collection('users')
  //         .doc(user.uid)
  //         .set({
  //           uid: user.uid,
  //           firstName: user.firstName,
  //           lastName: user.lastName,
  //           email: user.email,
  //           newsletter: user.newsletter,
  //           phone: '',
  //           orderHistory: [],
  //         })
  //         .then(() => {
  //           window.location.replace('/')
  //         })
  //     })
  //     .catch(error => {
  //       console.log('The request errored out and the error is: ', error)
  //       let curUser = this.auth().currentUser

  //       curUser
  //         .delete()
  //         .then(function() {
  //           // User deleted.
  //           console.log('USER DELETED')
  //         })
  //         .catch(function(error) {
  //           // An error happened.
  //           console.log('ERROR HAPPENED WITH USER DELETION')
  //         })
  //     })
  // }

  updateAccount = (user, firstName, lastName, email, phone) => {
    this.store()
      .collection('users')
      .doc(user.uid)
      .update({
        phone: phone,
        email: email,
        firstName: firstName,
        lastName: lastName,
      })
  }
}

export default new Firebase()
