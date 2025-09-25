import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  showNotification,
} from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const filteredAnecdotes = [...anecdotes]
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(showNotification(`you voted for ${anecdote.content}`, 5));
  };
  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;