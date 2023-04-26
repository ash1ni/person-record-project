import React, { useState } from 'react';

// Define a person object to store the form data
class Person {
    constructor(firstName, lastName, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
}

const PersonTable = () => {
    const [persons, setPersons] = useState([]); // State to store persons array

    // State to store form input values
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // State to store search input value
    const [searchInput, setSearchInput] = useState('');

    // State to store sort order
    const [sortOrder, setSortOrder] = useState('asc');

    // Function to add a person to the table
    const addPerson = (event) => {
        event.preventDefault(); // Prevent form submission

        // Check if the person already exists in the persons array
        const duplicatePerson = persons.find(person => person.firstName === firstName && person.lastName === lastName);
        if (duplicatePerson) {
            alert('Person with the same name already exists!');
            return;
        }

        // Create a new person object
        const person = new Person(firstName, lastName, phoneNumber);

        // Add the person object to the persons array
        setPersons([...persons, person]);

        // Clear form input fields
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
    }

    // Function to delete a person from the table
    const deletePerson = (firstName, lastName) => {
        // Show confirmation alert before deleting
        if (window.confirm('Are you sure you want to delete this person?')) {
            // Filter the persons array to exclude the person to be deleted
            const filteredPersons = persons.filter(person => !(person.firstName === firstName && person.lastName === lastName));

            // Update the persons array in state
            setPersons(filteredPersons);
        }
    }

    // Function to handle search input change
    const handleSearchInputChange = (event) => {
        // Update search input value in state
        setSearchInput(event.target.value.toLowerCase());
    }

    // Function to handle sort by name
    const handleSortByName = () => {
        // Toggle sort order between 'asc' and 'desc'
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        // Sort the persons array by first name and last name
        const sortedPersons = persons.sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

            if (newSortOrder === 'asc') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        // Update the persons array in state
        setPersons([...sortedPersons]);
    }

    // Filter the persons array based on search input value
    const filteredPersons = persons.filter(person => {
        const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
        return fullName.includes(searchInput);
    });

    // Render the component
    return (
        <div>
            <h1>Person Table</h1>
            <form onSubmit={addPerson}>
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={event => setFirstName(event.target.value)} />
                </label>
                <label>
                    Last Name:
                    <
input type="text" value={lastName} onChange={event => setLastName(event.target.value)} />
</label>
<label>
Phone Number:
<input type="text" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
</label>
<button type="submit">Add Person</button>
</form>
<input type="text" placeholder="Search by name" value={searchInput} onChange={handleSearchInputChange} />
<button onClick={handleSortByName}>Sort by Name</button>
<table>
<thead>
<tr>
<th>First Name</th>
<th>Last Name</th>
<th>Phone Number</th>
<th>Delete</th>
</tr>
</thead>
<tbody>
{filteredPersons.map(person => (
<tr key={`${person.firstName}-${person.lastName}`}>
<td>{person.firstName}</td>
<td>{person.lastName}</td>
<td>{person.phoneNumber}</td>
<td>
<button onClick={() => deletePerson(person.firstName, person.lastName)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
}

export default PersonTable;
