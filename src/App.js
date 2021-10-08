import React, { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  // initialise the contacts as an empty list
  const [contacts, setContacts] = useState([]);

// give an empty list to useEffect as a second parameter, it will only run once
// [] as a second parameter in useEffect is called a dependency array
  useEffect(() => {
    // React does re-render when the state change, so fetch will be called again and again if not in useEffect(func, []).
    // fetch three results from the api that generates random people
    fetch("https://randomuser.me/api/?results=3")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // set the contacts info from the fetch result
        setContacts(data.results)
      });
  }, []);

  return (
    <>
    {/* iterate through the contacts to create a contact card for each contact */}
      {contacts.map(contact => (
        <CreateContactCard
          avatar={contact.picture.large}
          name={contact.name.first + " " + contact.name.last}
          email={contact.email}
          age={contact.dob.age}
        />
      ))}
    </>
  );
};


// mannually create contacts
// const contacts = [
//   { name: "Harry Kim", email: "harrykim@kk.com", age: 25 },
//   { name: "Ed Lam", email: "edlam@kk.com", age: 45 },
//   { name: "Susan Lim", email: "susanlim@kk.com", age: 33 }
// ]

//  the function to create display a contact card on the browser
const CreateContactCard = props => {
  // console.log(avatar);
  const [showAge, setShowAge] = useState(false);
  return (
    <div className="contact-card">
      <img src={props.avatar} alt="profile" />
      <div className="user-details">
        <p>Name: {props.name}</p>
        <p>Email: {props.email}</p>
        <button onClick={() => setShowAge(!showAge)}>
          Toggle Age
        </button>
        {showAge && <p>Age: {props.age}</p>}
      </div>
    </div>
  );
};

export default App;