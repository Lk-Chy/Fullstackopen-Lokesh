import { useState } from "react";
import Service from "../Services/Service";

const Form = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

  const handleInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validateName = persons.find((person) => person.name === newName);

    if (validateName) {
      if (
        window.confirm(
          `${validateName.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = {...validateName, number};
        Service.updateById(validateName.id, updatedPerson).then((person) => {
          setPersons(
            persons.map((p => p.id !== validateName.id ? p : person))
          );
          setNewName("");
          setNumber("");
        })
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: number,
    };

    Service.create(newPerson).then((person) => {
      setPersons([...persons, person]);
      setNewName("");
      setNumber("");
    });

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;