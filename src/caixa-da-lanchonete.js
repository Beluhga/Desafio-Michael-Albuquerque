class CaixaDaLanchonete {
    
    constructor(cardapio) {
        this.cardapio = cardapio;
        this.descontoDinheiro = 0.05; // Desconto de 5% para pagamento em dinheiro
        this.acrescimoCredito = 0.03; // Acréscimo de 3% para pagamento a crédito
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!["dinheiro", "credito", "debito"].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!"; 
        }

        let valorTotal = 0;
        const extrasPorItem = {}

        for (const itemString of itens) {
            const [codigo, quantidade, extrasString] = itemString.split(",");
            const quantidadeInt = parseInt(quantidade);
            const extras = extrasString ? extrasString.split("|") : [];
            const itemCardapio = this.cardapio.find(item => item.id === codigo);

            if (quantidadeInt <= 0) {
                return "Quantidade inválida!";
            }

            if (!itemCardapio) {
                return "Item inválido!"; 
            }

            if (!extrasPorItem[codigo]) {
                extrasPorItem[codigo] = extras;
            } else {
                extrasPorItem[codigo] = extrasPorItem[codigo].concat(extras);
            }

            valorTotal += parseFloat(itemCardapio.price.replace("R$", "").replace(",", ".")) * quantidadeInt;
        
        }

        for (const codigo in extrasPorItem) {
            if (codigo === "chantily" && !extrasPorItem[codigo].includes("cafe")) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (codigo === "queijo" && !extrasPorItem[codigo].includes("sanduiche")) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (metodoDePagamento === "credito") {
            valorTotal *= (1 + this.acrescimoCredito); // Acréscimo de 3% para pagamento a crédito
        } else if (metodoDePagamento === "dinheiro") {
            valorTotal *= (1 - this.descontoDinheiro); // Desconto de 5% para pagamento em dinheiro
        }

        return valorTotal.toFixed(2).replace(".", ",");
    }
}

// Defina o cardápio
const Cardapio = [
    { id: "cafe", name: "Café", price: "R$ 3,00" },
    { id: "chantily", name: "Chantily (extra do Café)", price: "R$ 1,50" },
    { id: "suco", name: "Suco Natural", price: "R$ 6,20" },
    { id: "sanduiche", name: "Sanduíche", price: "R$ 6,50" },
    { id: "queijo", name: "Queijo (extra do Sanduíche)", price: "R$ 2,00" },
    { id: "salgado", name: "Salgado", price: "R$ 7,25" },
    { id: "combo1", name: "1 Suco e 1 Sanduíche", price: "R$ 9,50" },
    { id: "combo2", name: "1 Café e 1 Sanduíche", price: "R$ 7,50" }
];
const caixa = new CaixaDaLanchonete(Cardapio);

// Exemplo de uso
const itensComprados = [
    
    "sanduiche, 1",
    
    
];

const metodoPagamento = "credito"; // debito ou "dinheiro" ou "credito"

const valorTotalCompra = caixa.calcularValorDaCompra(metodoPagamento, itensComprados);
console.log(valorTotalCompra);


export { CaixaDaLanchonete };
// node caixa-da-lanchonete.js 