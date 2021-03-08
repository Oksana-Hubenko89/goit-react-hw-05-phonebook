import React, {Component} from 'react'
import PageHeading from '../../components/PageHeading';
import ContactList from '../../components/ContactList';
import ContactForm from '../../components/ContactForm';
import Filter from '../../components/Filter ';
import { v4 as uuidv4 } from 'uuid';
import {CSSTransition} from "react-transition-group";
import stylesHomePage from "./HomePage.module.css";
//import stylesList from "../../components/ContactList/ContactList.module.css";
import Message from '../../components/Message';
import StyleMessage from '../../components/Message/Message.module.css';
import StyleFilter from '../../components/Filter /Filter.module.css';

class HomePage extends Component {

  static defaultProps = {
    //   
  }
  static propTypes = {
   //
  }
  state = {
    contacts: [],
    filter: '',
    error: false,
  };
componentDidMount() {
    console.log('App componentDidMount');

    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };
    
    componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      console.log('Oбновилось поле contacts, записываю в хранилище');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    };
    
  addContact = ({name,number}) => {
    console.log({name,number});
    const contact = {
      id: uuidv4(),
      name,
      number
    }
      this.setState({
          error: false
      });

    if(this.state.contacts.find(item=>item.name === name)){
        this.setState({
            error: true
        })
        return;
      };
      this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts]
      }));
  };
  
    deleteContact = contactID => {
      this.setState({
          error: false
      });
    this.setState(prevState => ({
      contacts:prevState.contacts.filter(contact => contact.id !== contactID),
    }));
    };
 
    changeFilter = (event) => {
      this.setState({
          error: false
      });
    this.setState({ filter: event.currentTarget.value });
  };

    getchangeFilter = () => {
      
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLocaleLowerCase();
    return (contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizeFilter)));
  };
  
  render() {
      const filterResult = this.getchangeFilter();
      const {  error, filter} = this.state;
     
    return (
        <div>
            <CSSTransition classNames={StyleMessage}  in={error} appear  timeout={250} unmountOnExit>
                <Message text="Контакт существует" />
            </CSSTransition>
            <CSSTransition classNames={stylesHomePage}  in={true} appear  timeout={500} unmountOnExit>
                <PageHeading text="Phonebook" />
            </CSSTransition>
        
            <ContactForm onSubmit={this.addContact} />
       
      <h2>Contacts</h2>
       <CSSTransition classNames={StyleFilter}  in={this.state.contacts.length>1} timeout={250} unmountOnExit> 
                <Filter value={filter} onChange={this.changeFilter} /> 
            </CSSTransition> 
            <ContactList contactsList={filterResult} onDelete={this.deleteContact}
                />
      </div>  
    )
  }

}

export default HomePage;

