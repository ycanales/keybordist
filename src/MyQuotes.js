import React, { useState } from "react";

const MyQuotes = ({ data, set }) => {
  const [newQuote, setNewQuote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const saveNewQuote = () => {
      set(data.concat([{title: newTitle, text: newQuote}]));
  }
  return (
    <React.Fragment>
        {(!data || !data.length) && "You have no quotes, why don't you paste one?"}
        {data && data.length && data.map(quote => <p>{quote.title}</p>)}

        <label>Title</label>
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
        <label>Text</label>
        <textarea value={newQuote} onChange={e => setNewQuote(e.target.value)} />
        <button onClick={saveNewQuote}>Save</button>
    </React.Fragment>
    
  );
};

export default MyQuotes;
