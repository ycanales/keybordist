import React, { useState } from "react";
import StyledForm from "./StyledForm";
import { StyledListItem } from "./List";
import uuid from "uuid/v1";

export function getDisplayText(setup) {
  let text = "";
  if (setup.keyboard) text += ` ${setup.keyboard}`;
  if (setup.layout) text += ` ${setup.layout}`;
  if (setup.keycaps) text += ` ${setup.keycaps}`;
  if (setup.switches) text += ` ${setup.switches}`;
  if (setup.other) text += ` ${setup.other}`;
  return text.trim();
}

const MySetups = ({ data, set, setCurrent, current }) => {
  const [keyboard, setKeyboard] = useState("");
  const [layout, setLayout] = useState("");
  const [keycaps, setKeycaps] = useState("");
  const [switches, setSwitches] = useState("");
  const [other, setOther] = useState("");

  const formIsValid = () => {
    return keyboard || layout || keycaps || switches || other;
  };

  const saveSetup = e => {
    e.preventDefault();
    if (formIsValid() && data) {
      set(
        data.concat([
          { uuid: uuid(), keyboard, layout, keycaps, switches, other }
        ])
      );
      reset();
    }
  };

  const deleteSetup = uuid => {
    set(data.filter(setup => setup.uuid !== uuid));
  };

  const reset = () => {
    setKeyboard("");
    setLayout("");
    setKeycaps("");
    setSwitches("");
    setOther("");
  };

  return (
    <StyledForm>
      {!data || !data.length ? (
        <h2 className="message">You haven't created any setup.</h2>
      ) : data.length === 1 ? (
        <h2 className="message">You have one setup.</h2>
      ) : (
        <h2 className="message">You have {data.length} setups.</h2>
      )}

      <div className="row container">
        <form onSubmit={saveSetup}>
          <p>
            Create a setup to track your typing speeds across different
            keyboards, layouts, keycap profiles, or switch types. You have to
            fill at least one field.
          </p>

          <label>Keyboard</label>
          <input value={keyboard} onChange={e => setKeyboard(e.target.value)} />

          <label>Layout</label>
          <input value={layout} onChange={e => setLayout(e.target.value)} />

          <label>Keycap Profile</label>
          <input value={keycaps} onChange={e => setKeycaps(e.target.value)} />

          <label>Key Switches</label>
          <input value={switches} onChange={e => setSwitches(e.target.value)} />

          <label>Other</label>
          <input value={other} onChange={e => setOther(e.target.value)} />

          <button
            className="save"
            onClick={saveSetup}
            disabled={!formIsValid()}
          >
            Save
          </button>
        </form>

        <div className="list-right">
          {data && data.length ? (
            <React.Fragment>
              <h3>Your Setups</h3>
              {data.map(setup => (
                <StyledListItem>
                  <div className="row setup-row">
                    <ul>
                      {setup.keyboard && <li>Keyboard: {setup.keyboard}</li>}
                      {setup.layout && <li>Layout: {setup.layout}</li>}
                      {setup.keycaps && <li>Keycaps: {setup.keycaps}</li>}
                      {setup.switches && <li>Switches: {setup.switches}</li>}
                      {setup.other && <li>Other: {setup.other}</li>}
                    </ul>

                    <div className="row">
                      {setup.uuid !== current.uuid && (
                        <button
                          className="select"
                          onClick={e => setCurrent(setup)}
                        >
                          Select
                        </button>
                      )}
                      <button
                        className="delete"
                        onClick={e => deleteSetup(setup.uuid)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </StyledListItem>
              ))}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </StyledForm>
  );
};

export default MySetups;
