
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    // Cores para o tema claro (default)
    --background-color: #f0f2f5;
    --card-background: #ffffff;
    --text-color: #333333;
    --light-text-color: #666666;
    --border-color: #e0e0e0;
    --primary-color: #007bff; // Azul padrão
    --success-color: #28a745; // Verde para adicionar
    --edit-color: #007bff; // Azul para editar
    --delete-color: #dc3545; // Vermelho para remover
    --input-border-focus: #80bdff;
  }

  /* Exemplo de como você poderia implementar um tema escuro.
     Isso dependeria de um mecanismo de toggle de tema no App.tsx ou em um Context.
     Para agora, vamos focar no tema claro como nas imagens, mas deixo a estrutura. */
  /*
  body.dark-theme {
    --background-color: #1a1a1a;
    --card-background: #2c2c2c;
    --text-color: #e0e0e0;
    --light-text-color: #aaaaaa;
    --border-color: #444444;
    --primary-color: #6c757d; // Cinza para primário no escuro
    --success-color: #218838;
    --edit-color: #17a2b8;
    --delete-color: #c82333;
    --input-border-focus: #555555;
  }
  */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; /* Sugestão de fonte mais moderna */
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
  }

  button {
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  }
`;

export default GlobalStyle;