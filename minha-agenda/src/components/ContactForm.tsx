// src/components/ContactForm.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../slices/contactsSlice';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* Espaçamento entre os inputs */
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--text-color);
  background-color: var(--background-color); /* Fundo do input */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end; /* Alinha os botões à direita */
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: var(--success-color); /* Verde para adicionar */
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #218838;
    transform: translateY(-1px);
  }
`;

const CancelButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: var(--delete-color); /* Vermelho para cancelar */
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #c82333;
    transform: translateY(-1px);
  }
`;

interface Contact {
  id?: string;
  name: string;
  email: string;
  phone: string;
  category: string;
}

interface ContactFormProps {
  editContact?: Contact;
  onEditComplete?: () => void;
  onAddComplete?: () => void; // Para fechar o formulário após adicionar
}

const ContactForm: React.FC<ContactFormProps> = ({ editContact, onEditComplete, onAddComplete }) => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState<Contact>({
    name: '',
    email: '',
    phone: '',
    category: 'Todos', // Valor inicial para categoria
  });

  useEffect(() => {
    if (editContact) {
      setContact(editContact);
    } else {
      // Limpa o formulário quando não está em modo de edição
      setContact({ name: '', email: '', phone: '', category: 'Todos' });
    }
  }, [editContact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (editContact && editContact.id) {
      dispatch(updateContact({ ...contact, id: editContact.id }));
      onEditComplete?.();
    } else {
      dispatch(addContact({ ...contact, id: uuidv4() }));
      onAddComplete?.(); // Fecha o formulário após adicionar
    }

    setContact({ name: '', email: '', phone: '', category: 'Todos' });
  };

  const handleCancel = () => {
    setContact({ name: '', email: '', phone: '', category: 'Todos' });
    onEditComplete?.(); // Se estiver editando
    onAddComplete?.(); // Se estiver adicionando
  };

  return (
    <FormContainer>
      <FormTitle>{editContact ? 'Editar Contato' : 'Adicionar Novo Contato'}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Nome completo"
          value={contact.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email" // Melhor tipo para email
          placeholder="E-mail"
          value={contact.email}
          onChange={handleChange}
        />
        <Input
          name="phone"
          type="tel" // Melhor tipo para telefone
          placeholder="Telefone"
          value={contact.phone}
          onChange={handleChange}
        />
        {/* Campo para selecionar a categoria */}
        <select name="category" value={contact.category} onChange={handleChange} style={{
            padding: '1rem',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '1rem',
            color: 'var(--text-color)',
            backgroundColor: 'var(--background-color)',
            appearance: 'none', // Remove o estilo padrão do navegador
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.7em top 50%',
            backgroundSize: '0.65em auto',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}>
          <option value="Todos">Selecionar Categoria</option>
          <option value="Familia">Família</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Amigos">Amigos</option>
          <option value="Favoritos">Favoritos</option>
        </select>
        <ButtonGroup>
          <SubmitButton type="submit">{editContact ? 'Salvar alterações' : 'Adicionar contato'}</SubmitButton>
          {(editContact || onAddComplete) && <CancelButton type="button" onClick={handleCancel}>Cancelar</CancelButton>}
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;