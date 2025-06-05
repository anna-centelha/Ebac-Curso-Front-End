// src/App.tsx
import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import styled from 'styled-components';

// Novos Styled Components para o layout principal
const AppContainer = styled.div`
  display: flex;
  min-height: 100vh; /* Ocupa a altura total da viewport */
  background-color: var(--background-color);
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: var(--card-background); /* Fundo da sidebar igual ao card */
  padding: 2rem 1.5rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainContent = styled.main`
  flex-grow: 1; /* Ocupa o restante do espaço */
  padding: 2rem;
  max-width: calc(100% - 250px); /* Garante que não ultrapasse o espaço */
  margin: 0 auto; /* Centraliza o conteúdo principal */
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--text-color);
  margin: 0;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    color: var(--light-text-color);
  }
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text-color)'};
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color)' : 'var(--border-color)'};
    color: ${props => props.$active ? 'white' : 'var(--text-color)'};
  }
`;

const AddContactButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: var(--success-color); /* Verde para adicionar */
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease, transform 0.2s ease;
  margin-top: auto; /* Empurra o botão para o final da sidebar */

  &:hover {
    background-color: #218838; /* Um verde um pouco mais escuro */
    transform: translateY(-2px);
  }
`;

function App() {
  const [filter, setFilter] = useState<string>('Todos'); // Para gerenciar o filtro de contatos
  const [searchTerm, setSearchTerm] = useState<string>(''); // Para a barra de busca
  const [showContactForm, setShowContactForm] = useState<boolean>(false); // Para mostrar/esconder o formulário

  return (
    <AppContainer>
      <Sidebar>
        <SearchInput
          type="text"
          placeholder="Buscar contato..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSection>
          <h3>Categorias</h3>
          <FilterButton $active={filter === 'Todos'} onClick={() => setFilter('Todos')}>Todos</FilterButton>
          <FilterButton $active={filter === 'Familia'} onClick={() => setFilter('Familia')}>Família</FilterButton>
          <FilterButton $active={filter === 'Trabalho'} onClick={() => setFilter('Trabalho')}>Trabalho</FilterButton>
          <FilterButton $active={filter === 'Amigos'} onClick={() => setFilter('Amigos')}>Amigos</FilterButton>
          <FilterButton $active={filter === 'Favoritos'} onClick={() => setFilter('Favoritos')}>Favoritos</FilterButton>
        </FilterSection>
        <AddContactButton onClick={() => setShowContactForm(true)}>Adicionar Contato</AddContactButton>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>Contatos</Title> {/* O título da imagem 2 */}
          {/* Poderia ter um contador de contatos aqui, como na imagem 2 */}
          {/* <span>3 Total</span> */}
        </Header>

        {showContactForm && (
          <ContactForm onAddComplete={() => setShowContactForm(false)} />
        )}
        <ContactList filter={filter} searchTerm={searchTerm} />
      </MainContent>
    </AppContainer>
  );
}

export default App;