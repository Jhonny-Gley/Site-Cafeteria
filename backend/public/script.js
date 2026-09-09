/* =====================================================
   ESTADO DO CARRINHO
   Array em memória: guarda os produtos adicionados durante
   a sessão (é resetado ao recarregar a página, pois não há
   persistência no backend/localStorage ainda).
   ===================================================== */
let carrinho = [];


/* =====================================================
   FORMATAR PREÇO NO PADRÃO BRASILEIRO
   Recebe um número (ex: 15.99) e devolve uma string
   com vírgula no lugar do ponto (ex: "15,99").
   Usado em todo lugar que exibe preço na tela.
   ===================================================== */
function formatarPreco(preco) {
    return preco.toFixed(2).replace(".", ",");
}


/* =====================================================
   ATUALIZAR CONTADOR DO CARRINHO (ícone no header)
   Cria (na primeira vez) ou atualiza o número dentro do
   elemento #cart-count, que fica posicionado sobre o
   ícone de carrinho via CSS (position: absolute).
   ===================================================== */
function atualizarContadorCarrinho() {
    const totalItens = carrinho.length;
    const iconeCarrinho = document.querySelector(".icons img[alt='shopping-cart--v1']");

    let contador = document.getElementById("cart-count");

    // Se o elemento ainda não existe no DOM, cria uma vez só
    if (!contador) {
        contador = document.createElement("span");
        contador.id = "cart-count";
        iconeCarrinho.parentElement.appendChild(contador);
    }

    contador.textContent = totalItens;
}


/* =====================================================
   ADICIONAR PRODUTO AO CARRINHO
   Chamada pelo listener de clique em cada botão
   "Adicione ao Carrinho" dos cards do menu (ver carregarProdutos).
   ===================================================== */
function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    console.log("Carrinho atual:", carrinho);

    atualizarContadorCarrinho();
    renderizarCarrinho(); // mantém o modal atualizado mesmo se já estiver aberto
}


/* =====================================================
   REMOVER PRODUTO DO CARRINHO
   Recebe o índice do item dentro do array `carrinho`
   (definido no data-index de cada botão "×" no modal).
   ===================================================== */
function removerDoCarrinho(index) {
    carrinho.splice(index, 1); // remove 1 item na posição "index"
    atualizarContadorCarrinho();
    renderizarCarrinho();
}


/* =====================================================
   CARREGAR PRODUTOS DA API E MONTAR O MENU
   Busca os produtos em GET /api/produtos (rota do Express,
   definida em backend/routes/produtos.js) e cria um card
   (.box) para cada produto dentro de #menu-container.
   ===================================================== */
async function carregarProdutos() {
    try {
        const resposta = await fetch("/api/produtos");
        const produtos = await resposta.json();

        const container = document.getElementById("menu-container");
        container.innerHTML = ""; // limpa o conteúdo antes de renderizar

        produtos.forEach(produto => {
            const box = document.createElement("div");
            box.classList.add("box");

            // Monta o card do produto. A imagem espera arquivos nomeados
            // como menu-1.png, menu-2.png, etc. (baseado no id do produto)
            box.innerHTML = `
                <img src="./imagens/menu-${produto.id}.png" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <div class="price">R$ ${formatarPreco(produto.preco)}</div>
                <a href="#" class="btn">Adicione ao Carrinho</a>
            `;

            // Liga o botão do card à função de adicionar ao carrinho
            const botao = box.querySelector(".btn");
            botao.addEventListener("click", (e) => {
                e.preventDefault(); // evita que o link "#" role a página
                adicionarAoCarrinho(produto);
            });

            container.appendChild(box);
        });
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}


/* =====================================================
   RENDERIZAR CONTEÚDO DO MODAL DO CARRINHO
   Reconstrói a lista de itens (#cart-items) e o total
   (#cart-total) toda vez que o carrinho muda ou o modal
   é aberto.
   ===================================================== */
function renderizarCarrinho() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    container.innerHTML = "";

    // Carrinho vazio: mostra mensagem e encerra
    if (carrinho.length === 0) {
        container.innerHTML = "<p style='color:#fff;'>Seu carrinho está vazio.</p>";
        totalEl.textContent = "";
        return;
    }

    let total = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        const item = document.createElement("div");
        item.classList.add("cart-item");

        // data-index guarda a posição do produto no array `carrinho`,
        // usado pelo removerDoCarrinho() ao clicar no "×"
        item.innerHTML = `
            <span>${produto.nome}</span>
            <span>R$ ${formatarPreco(produto.preco)}</span>
            <span class="remove-item" data-index="${index}">&times;</span>
        `;

        container.appendChild(item);
    });

    totalEl.textContent = `Total: R$ ${formatarPreco(total)}`;

    // Liga cada botão "×" recém-criado à função de remoção
    document.querySelectorAll(".remove-item").forEach(botao => {
        botao.addEventListener("click", (e) => {
            const index = parseInt(e.target.dataset.index);
            removerDoCarrinho(index);
        });
    });
}


/* =====================================================
   ABRIR / FECHAR O MODAL DO CARRINHO
   Apenas alternam a classe "active" em #cart-modal,
   que controla a exibição via CSS (display: none/block).
   ===================================================== */
function abrirCarrinho() {
    renderizarCarrinho(); // garante que o conteúdo está atualizado ao abrir
    document.getElementById("cart-modal").classList.add("active");
}

function fecharCarrinho() {
    document.getElementById("cart-modal").classList.remove("active");
}


/* =====================================================
   INICIALIZAÇÃO
   Roda assim que o script.js é carregado (colocado no
   final do <body>, então o HTML já existe nesse momento).
   ===================================================== */

// Busca os produtos e monta o menu assim que a página carrega
carregarProdutos();

// Liga o clique no ícone do carrinho à abertura do modal
document.querySelector(".icons img[alt='shopping-cart--v1']").addEventListener("click", abrirCarrinho);

// Liga o clique no "×" do modal ao fechamento dele
document.getElementById("close-cart").addEventListener("click", fecharCarrinho);