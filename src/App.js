import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unSubscribeFormAuth = null;

  componentDidMount() {
    this.unSubscribeFormAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) { // is userAuth exists
        // using "createUserProfileDocument(userAuth);" to create the userprofile
        // then, getting the userRef returned by the "createUserProfileDocument"
        const userRef = await createUserProfileDocument(userAuth);

        // === DocumentSnapshot ===
        // We get a documentSnapshot object from our documentReference object.
        //
        // The documentSnapshot object allows us to check if a document existis
        // at this query using the ".exists" property which returns a boolean.
        //
        // We can also get the actual properties on the object by calling
        // the ".data()" method, which retruns us a JSON object of the document.

        // setting the state with the user snapshot data.
        userRef.onSnapshot(snapShot => {
          this.setState({
            currenteUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }
      //else { // setting currentUser to null if userAuth do not exists
        this.setState({ currentUser: userAuth });
      //}
    });
  }

  componentWillUnmount() {
    this.unSubscribeFormAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={ this.state.currentUser } />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
