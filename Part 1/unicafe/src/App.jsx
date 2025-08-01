import { useState } from "react";

const App = () => {
  const [countgood, setGood] = useState(0);
  const [countneutral, setNeutral] = useState(0);
  const [countbad, setBad] = useState(0);
  const [countall, setAll] = useState(0);
  const [countavg, setAvg] = useState(0);
  const [countpos, setPos] = useState(0);

  const updateStats = (newGood, newNeutral, newBad) => {
    const all = newGood + newNeutral + newBad;
    const avg = (newGood - newBad) / all;
    const pos = (newGood / all) * 100;

    setAll(all);
    setAvg(avg);
    setPos(pos);
  };

  const handelgood = () => {
    const newGood = countgood + 1;
    setGood(newGood);
    updateStats(newGood, countneutral, countbad);
  };

  const handelneutral = () => {
    const newNeutral = countneutral + 1;
    setNeutral(newNeutral);
    updateStats(countgood, newNeutral, countbad);
  };

  const handelbad = () => {
    const newBad = countbad + 1;
    setBad(newBad);
    updateStats(countgood, countneutral, newBad);
  };

  const Statistics =({label, value})=>(
    <>
      {label}: {value}<br/>
    </>
  )

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handelgood}>good</button>
      <button onClick={handelneutral}>neutral</button>
      <button onClick={handelbad}>bad</button>

      <h1>statistics</h1>
      {(countgood||countbad||countneutral)?
      <>
      <Statistics label="good" value={countgood}></Statistics>
      <Statistics label="neutral" value={countneutral}></Statistics>
      <Statistics label="bad" value={countbad}></Statistics>
      <Statistics label="all" value={countall}></Statistics>
      <Statistics label="average" value={countavg}></Statistics>
      <Statistics label="positive" value={`${countpos} %`} ></Statistics>
      </> :"No feedback given"  
    }
      {/* <p>good: {countgood}</p> */}
      {/* <p>neutral: {countneutral}</p>
      <p>bad: {countbad}</p>
      <p>all: {countall}</p>
      <p>average: {countavg}</p>
      <p>positive: {countpos} %</p> */}
    </div>
  );
};

export default App;
