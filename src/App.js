import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import createPersistedState from "use-persisted-state";
import uuid from "uuid/v1";

import "./App.css";
import MyQuotes from "./MyQuotes";
import Typer from "./Typer";
import quotes from "./data/quotes";
import MySetups from "./MySetups";
import MyScores from "./MyScores";

const App = () => {
  const [quote, setQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const useCurrentSetupState = createPersistedState("currentSetup");
  const [currentSetup, setCurrentSetup] = useCurrentSetupState("");

  const useMyQuotesState = createPersistedState("myQuotes");
  const [myQuotes, setMyQuotes] = useMyQuotesState([]);

  const useMySetupsState = createPersistedState("mySetups");
  const [mySetups, setMySetups] = useMySetupsState([]);

  const useMyScoresState = createPersistedState("myScores");
  const [myScores, setMyScores] = useMyScoresState([]);

  const randomizeQuote = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="App-header-menu">
            <p style={{ fontSize: 200 }}>⌨</p>
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
            <NavLink activeClassName="active" to="/my-quotes">
              My Quotes
            </NavLink>
            <NavLink activeClassName="active" to="/my-setups">
              My Setups
            </NavLink>
            <NavLink activeClassName="active" to="/my-scores">
              My Scores
            </NavLink>
          </div>

          <Route
            path="/my-quotes"
            render={props => (
              <MyQuotes {...props} data={myQuotes} set={setMyQuotes} />
            )}
          />
          <Route
            path="/my-setups"
            render={props => (
              <MySetups
                {...props}
                data={mySetups}
                current={currentSetup}
                set={setMySetups}
                setCurrent={setCurrentSetup}
              />
            )}
          />
          <Route
            path="/my-scores"
            render={props => <MyScores {...props} data={myScores} />}
          />
          <Route
            path="/"
            exact
            render={props => (
              <Typer
                {...props}
                quote={quote}
                setQuote={setQuote}
                myScores={myScores}
                setMyScores={setMyScores}
                setupsCount={mySetups.length}
                currentSetup={currentSetup}
              />
            )}
          />
        </header>
        <footer>
          created by&nbsp;<a href="http://ycanales.com">ycanales</a>
        </footer>
      </div>
    </Router>
  );
};

export default App;
