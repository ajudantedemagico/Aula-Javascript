const produtos = [
    { nome: 'Rosas', preco: 10, quantidade: 5 },
    { nome: 'Camélias', preco: 20, quantidade: 3 },
    { nome: 'Margaridas', preco: 15, quantidade: 10 },
    { nome: 'Cravos', preco: 30, quantidade: 2 },
    { nome: 'Girassóis', preco: 25, quantidade: 4 }
];

let carrinho = [];

function exibirProdutos() {
    const ListaProduto = document.getElementById('ListaProduto');
    ListaProduto.innerHTML = '';
    produtos.forEach((produto, index) => {
        ListaProduto.innerHTML += `
            <li>
                ${produto.nome} - R$ ${produto.preco} (Estoque: ${produto.quantidade})
                <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
            </li>
        `;
    });
}

function adicionarAoCarrinho(index) {
    const produto = produtos[index];
    if (produto.quantidade > 0) {
        carrinho.push(produto);
        produto.quantidade--;
        exibirProdutos();
        exibirCarrinho();
    } else {
        alert('Produto fora de estoque!');
    }
}

function exibirCarrinho() {
    const CarrinhoLista = document.getElementById('CarrinhoLista');
    CarrinhoLista.innerHTML = '';
    carrinho.forEach((produto, index) => {
        CarrinhoLista.innerHTML += `
            <li>
                ${produto.nome} - R$ ${produto.preco}
                <button class="remove" onclick="removerDoCarrinho(${index})">Remover</button>
            </li>
        `;
    });
    atualizarTotal();
}

function removerDoCarrinho(index) {
    const produto = carrinho[index];
    carrinho.splice(index, 1);
    const produtoNoEstoque = produtos.find(p => p.nome === produto.nome);
    if (produtoNoEstoque) produtoNoEstoque.quantidade++;
    exibirCarrinho();
    exibirProdutos();
}

function atualizarTotal() {
    const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
    document.getElementById('total').innerText = `Total: R$ ${total}`;
}

document.getElementById('BotaoOrdenar').onclick = function() {
    carrinho.sort((a, b) => a.preco - b.preco);
    exibirCarrinho();
};

document.getElementById('BotaoBusca').onclick = function() {
    const searchTerm = document.getElementById('Busca').value.toLowerCase();
    const resultados = produtos.filter(produto => produto.nome.toLowerCase().includes(searchTerm));
    
    const ListaProduto = document.getElementById('ListaProduto');
    ListaProduto.innerHTML = '';
    resultados.forEach((produto, index) => {
        ListaProduto.innerHTML += `
            <li>
                ${produto.nome} - R$ ${produto.preco} (Estoque: ${produto.quantidade})
                <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
            </li>
        `;
    });
};

exibirProdutos();
