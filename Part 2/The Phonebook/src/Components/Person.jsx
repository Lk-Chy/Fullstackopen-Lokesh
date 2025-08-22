import Service from "../Services/Service";

const Person = ({person, persons, setPersons}) => {

    const handleDelete = (person) => {
        if(window.confirm(`Delete ${person.name} ?`)){
            Service.deleteById(person.id).then(() => setPersons(persons.filter(p => p.id !== person.id)))
            .catch( e => console.log(e.message))
        }
    }

    

    return(
        <div>
            {person.name} {person.number} <button type="button" onClick={() => handleDelete(person)}>delete</button>
        </div>
    )
}
export default Person;