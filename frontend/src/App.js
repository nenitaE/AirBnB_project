import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots/Spots";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import CurrentUserSpots from './components/CurrentUserSpots'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={Spots} />
          <Route exact path='/spots/current' component={CurrentUserSpots} />
          <Route path="/spots/new" component={CreateSpotForm} />
          <Route exact path='/spots/:id'component={SpotDetails} />
          
        </Switch>
      )}
    </>
  );
}

export default App;