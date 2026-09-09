Cafeteria - Website & API

Uma aplicação Web Full-Stack desenvolvida para uma cafeteria moderna. O projeto conta com uma interface responsiva e interativa no Front-end e uma API em Node.js com Express no Back-end responsável pelo gerenciamento de catálogo de produtos.



 Funcionalidades

- **Cardápio Dinâmico:** Os produtos do menu são consumidos em tempo real via rota API (`GET /api/produtos`).
- **Carrinho de Compras Interativo:**
  - Adição e remoção de itens em tempo real.
  - Contador dinâmico atualizado no ícone do header.
  - Modal interativo para visualização de itens e cálculo automático do total.
  - Formatação de preços no padrão brasileiro (`R$ 0,00`).
- **Navegação Fluida:** Seções institucionais (Sobre Nós, Avaliações, Endereço com Google Maps e Redes Sociais).


**Tecnologias Utilizadas**

 **Front-end**
- **HTML5 & CSS3:** Estruturação semântica e estilização customizada.
- **JavaScript (ES6+):** Manipulação do DOM, gestão de estado do carrinho e consumo da API via `fetch`.
- **Google Fonts:** Tipografia com a fonte *Roboto*.

 **Back-end**
- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express.js (v5):** Framework para roteamento de APIs e entrega de arquivos estáticos.


 **Estrutura do Projeto**

```text
cafeteria/
├── backend/
│   ├── routes/
│   │   └── produtos.js      # Rotas de produtos da API
│   ├── index.js             # Servidor principal Express
│   └── package.json         # Dependências do Node.js
├── public/                  # Arquivos estáticos servidos pelo backend
│   ├── imagens/             # Logos e imagens dos produtos
│   ├── index.html           # Estrutura HTML principal
│   ├── style.css            # Estilização
│   └── script.js            # Lógica do client-side e carrinho
├── .gitignore               # Arquivos ignorados pelo Git
