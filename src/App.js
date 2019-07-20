import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import createPersistedState from "use-persisted-state";
import { CSSTransitionGroup } from "react-transition-group";

import "./App.css";
import MyQuotes from "./MyQuotes";
import Typer from "./Typer";
import quotes from "./data/quotes";
import MySetups from "./MySetups";
import MyScores from "./MyScores";
import AllQuotes from "./AllQuotes";

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

  const [menuVisible, setMenuVisibility] = useState(true);

  const randomizeQuote = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnter={true}
            transitionEnterTimeout={200}
            transitionLeave={true}
            transitionLeaveTimeout={500}
          >
            {menuVisible ? (
              <div className="App-header-menu">
                <p style={{ fontSize: 200 }}>⌨</p>
                <NavLink exact activeClassName="active" to="/">
                  Home
                </NavLink>
                <NavLink activeClassName="active" to="/all-quotes">
                  All Quotes
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
            ) : null}
          </CSSTransitionGroup>

          <Route
            path="/all-quotes"
            render={props => (
              <AllQuotes {...props} data={quotes} setQuote={setQuote} />
            )}
          />

          <Route
            path="/my-quotes"
            render={props => (
              <MyQuotes
                {...props}
                data={myQuotes}
                set={setMyQuotes}
                setQuote={setQuote}
              />
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
            render={props => (
              <MyScores {...props} data={myScores} setups={mySetups} />
            )}
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
                randomizeQuote={randomizeQuote}
                setMenuVisibility={setMenuVisibility}
              />
            )}
          />
        </header>
        <footer>
          <p>
            created by&nbsp;<a href="http://ycanales.com">ycanales</a>.
          </p>
          <p>
            get notified of new features by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://sibforms.com/serve/MUIEAAJ0fmIau7uNjkvwevVPs36vnjG13JmiCBEI3eiiBQOz8iyUqJsroJJXAFZvvyQErtTf846AtZy4YhgpGapg4IOnfw9tkmzOglDbClZfZsER9u3RFTAlLHcMkAJL7TMakSd7572-B6Jnbl4H1MZzXqnxcwcSO2uszoH8MjHXwqektEqk6_uLpWdL6hftbW1eYyf1eyJbL5EU"
            >
              subscribing to the newsletter
            </a>
            .
          </p>
          <p>
            suggest features or quotes at{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/tuxcayc"
            >
              @tuxcayc
            </a>
            .
          </p>
          <p>
            v2019.7.20
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
