import React, { useState } from "react";
import StyledForm from "./StyledForm";

const MySetups = () => {
  const [keyboard, setKeyboard] = useState("");
  const [layout, setLayout] = useState("");
  const [keycaps, setKeycaps] = useState("");
  const [switches, setSwitches] = useState("");
  const [other, setOther] = useState("");
  return (
    <StyledForm>
      <h2 className="message">You haven't created any setup.</h2>

      <form>
        <p>
          Create a setup to track your typing speeds across different keyboards,
          layouts, keycap profiles, or switch types. You have to fill at least
          one field.
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
          disabled={!keyboard && !layout && !keycaps && !switches && !other}
        >
          Save
        </button>
      </form>
    </StyledForm>
  );
};

export default MySetups;
