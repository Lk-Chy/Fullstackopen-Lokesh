import { useDispatch } from "react-redux";
import { useState } from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAnecdote) return;
    dispatch(createAnecdote(newAnecdote));
    dispatch(showNotification(`you created '${newAnecdote}'`, 5));
    setNewAnecdote("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={newAnecdote}
            onChange={(e) => setNewAnecdote(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;