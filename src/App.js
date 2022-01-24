import React, { Component } from "react";
import { nanoid } from "nanoid";
import { FirstTitle, SecondTitle } from "./components/Titles";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import { GlobalStyle } from "./components/Global.styled";
import { Container, Wraper } from "./App.styled.jsx";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  // ADD NEW CONTACT
  addNewContact = ({ name, number }) => {
    const duplicateName = this.checkDuplicateName(name);
    if (duplicateName) return;
    this.setState(({ contacts }) => ({
      contacts: [...contacts, { id: nanoid(), name, number }],
    }));
  };

  // CHECK DUPLICATE NAME
  checkDuplicateName = (newName) => {
    const isDuplicate = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === newName.toLowerCase()
    );
    if (isDuplicate) alert(`⚠ ${newName} is already in contacts!`);
    return isDuplicate;
  };

  //DELETE CONTACT
  deleteContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  //CHANGE FILTER
  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  // Display Searched Contacts
  displaySearchedContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Component Did Mount
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  //Component Did Update
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const searchedContacts = this.displaySearchedContacts();
    return (
      <>
        <GlobalStyle />
        <Container>
          <Wraper>
            <FirstTitle />
            <ContactForm onAddNewContact={this.addNewContact} />
          </Wraper>
          <Wraper>
            <SecondTitle />
            <Filter onChangeFilter={this.changeFilter} />
            <ContactList
              contacts={searchedContacts}
              onDeleteContact={this.deleteContact}
            />
          </Wraper>
        </Container>
      </>
    );
  }
}

export default App;
