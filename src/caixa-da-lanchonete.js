class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      'cafe': 3.00,
      'chantily': 1.50,
      'suco': 6.20,
      'sanduiche': 6.50,
      'queijo': 2.00,
      'salgado': 7.25,
      'combo1': 9.50,
      'combo2': 7.50,
    };
    this.descontoDinheiro = 0.05;
    this.acrescimoCredito = 0.03;
  }

  formatarParaReais(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const itensPrincipais = [];
    const itensExtras = [];
    let valorTotal = 0;

    for (const item of itens) {
      const [pedido, quantidade] = item.split(',');

      if (!this.cardapio[pedido]) {
        return "Item inválido!";
      }

      itensPrincipais.push(pedido);
      valorTotal += this.cardapio[pedido] * parseInt(quantidade);

    }
    if (itensPrincipais.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    if (!itensPrincipais.includes('cafe')) {
      if (itensPrincipais.includes('chantily')) {
        return "Item extra não pode ser pedido sem o principal";
      }
      itensExtras.push('chantily_extra');
    }

    if (!itensPrincipais.includes('sanduiche')) {

      if (itensPrincipais.includes('queijo')) {
        return "Item extra não pode ser pedido sem o principal";
      }

      itensExtras.push('queijo_extra');
    }

    if (valorTotal === 0) {
      return "Quantidade inválida!"
    }

    switch (metodoDePagamento) {
      case 'dinheiro':
        valorTotal *= (1 - this.descontoDinheiro);
        break;
      case 'credito':
        valorTotal *= (1 + this.acrescimoCredito);
        break;
      case 'debito':
        break;
      default:
        return "Forma de pagamento inválida!";
    }
    return this.formatarParaReais(valorTotal);
  }
}
export { CaixaDaLanchonete };

// Exemplos de uso:
const caixa = new CaixaDaLanchonete();
console.log(caixa.calcularValorDaCompra('debito', ['chantily,1'],)); // Item extra não pode ser pedido sem o principal
console.log(caixa.calcularValorDaCompra('dinheiro', ['queijo,1', 'cafe,2'])); // Item extra não pode ser pedido sem o principal
console.log(caixa.calcularValorDaCompra('debito', ['cafe,1', 'chantily,1'])); // R$ 4,50
console.log(caixa.calcularValorDaCompra('credito', ['combo1,1', 'cafe,2'])); // R$ 15,96
console.log(caixa.calcularValorDaCompra('dinheiro', ['sanduiche,1', 'cafe,2'])); // R$ 11,88
console.log(caixa.calcularValorDaCompra('credito', ['cafe,4', 'sanduiche,3', 'queijo,2'])); // R$ 36,56 FOI MT DIFICIL O MEU SO TAVA DANDO 36,57