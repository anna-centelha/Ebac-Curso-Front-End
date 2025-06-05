
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { removeContact } from '../slices/contactsSlice';
import ContactForm from './ContactForm';
import styled from 'styled-components';

const ListContainer = styled.div`
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Espaçamento entre os itens da lista */
`;

const ListItem = styled.li`
  background-color: var(--background-color); /* Fundo ligeiramente diferente para o item */
  padding: 1.2rem 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Permite que os itens quebrem linha em telas menores */
  gap: 1rem; /* Espaçamento entre os elementos internos */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03); /* Sombra suave */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Ocupa o máximo de espaço possível */
  min-width: 200px; /* Garante que não fique muito apertado */
`;

const ContactName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.4rem;
  color: var(--text-color);
`;

const ContactInfo = styled.p`
  font-size: 0.95rem;
  color: var(--light-text-color);
  margin-bottom: 0.2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTag = styled.span<{ $categoryColor: string }>`
  background-color: ${props => props.$categoryColor};
  color: white;
  padding: 0.3em 0.8em;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 1rem;
  align-self: flex-start; /* Alinha no topo se houver flex-direction column */
  white-space: nowrap; /* Evita que a tag quebre linha */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem; /* Espaçamento entre os botões */
  margin-top: 0.5rem; /* Espaçamento do conteúdo acima */
  align-items: center;
`;

const ActionButton = styled.button`
  padding: 8px 14px;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &.edit {
    background-color: var(--edit-color); /* Usar variável do GlobalStyle */
    &:hover {
      background-color: #0056b3;
      transform: translateY(-1px);
    }
  }

  &.delete {
    background-color: var(--delete-color); /* Usar variável do GlobalStyle */
    &:hover {
      background-color: #c82333;
      transform: translateY(-1px);
    }
  }
`;


interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string; 

interface ContactListProps {
  filter: string;
  searchTerm: string;
}

const ContactList: React.FC<ContactListProps> = ({ filter, searchTerm }) => {
   const contacts = useSelector((state: RootState) => state.contacts.list);
   const dispatch = useDispatch();
  const [editing, setEditing] = useState<Contact | null>(null);


  const categoryColors: { [key: string]: string } = {
    Familia: '#8A2BE2', 
    Trabalho: '#FFD700', 
    Amigos: '#1E90FF', 
    Favoritos: '#FF4500',
    Todos: '#6c757d', 
  };

  const filteredContacts = contacts.filter((contact: Contact) => { 
    const matchesFilter = filter === 'Todos' || contact.category === filter;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.phone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <ListContainer>
      {editing && (
        <ContactForm
          editContact={editing}
          onEditComplete={() => setEditing(null)}
        />
      )}
      <List>
        {filteredContacts.length === 0 ? (
          <p>Nenhum contato encontrado.</p>
        ) : (
          filteredContacts.map((contact: Contact) => (
            <ListItem key={contact.id}>
              <ContactDetails>
                <ContactName>{contact.name}</ContactName>
                <ContactInfo>{contact.email}</ContactInfo>
                <ContactInfo>{contact.phone}</ContactInfo>
              </ContactDetails>
              <CategoryTag $categoryColor={categoryColors[contact.category] || categoryColors.Todos}>
                {contact.category}
              </CategoryTag>
              <ButtonGroup>
                <ActionButton className="edit" onClick={() => setEditing(contact)}>
                  Editar
                </ActionButton>
                <ActionButton className="delete" onClick={() => dispatch(removeContact(contact.id))}>
                  Remover
                </ActionButton>
              </ButtonGroup>
            </ListItem>
          ))
        )}
      </List>
    </ListContainer>
  );
};

export default ContactList;