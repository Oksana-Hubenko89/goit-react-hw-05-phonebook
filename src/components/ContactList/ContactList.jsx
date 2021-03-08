import React from 'react';
import s from "./ContactList.module.css";
import b from '../Button/Button.module.css';
import Container from "../Container";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//import Button from '../Button';

const ContactList = ({ onDelete, contactsList }) =>
   
    <Container>
              <TransitionGroup component="ul" className={s.List} >
            {contactsList.map(({ id, name, number }) =>
                <CSSTransition key={id} classNames={s} timeout={250}>
                <li key={id} ><span>{name}: {number} </span>
                  <button className={b.Button} type="button" onClick={() => onDelete(id)} >Delete</button>
                </li>
                 </CSSTransition>
            )
            }
            </TransitionGroup>
          
             
    </Container>
    
    

export default ContactList; 