import { useEffect, useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Service from "./Services/Service";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    Service.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h2>add a new</h2>
      <Form persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <div>
        {filteredPerson.map((person) => (

          <Person key={person.id} person={person} persons={persons} setPersons={setPersons} />

        ))}

      </div>
    </div>
  );
};

export default App;