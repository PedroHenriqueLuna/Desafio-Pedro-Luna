class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        cafe: { descricao: 'Café', valor: 3.00 },
        chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        suco: { descricao: 'Suco Natural', valor: 6.20 },
        sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
        queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        salgado: { descricao: 'Salgado', valor: 7.25 },
        combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
      };
    }
  
    calcularValorTotal(itens) {
      let valorTotal = 0;
  
      for (const itemInfo of itens) {
        const [codigo, quantidade] = itemInfo.split(',');
        const item = this.cardapio[codigo];
  
        if (!item) {
          return "Item inválido!";
        }
  
        valorTotal += item.valor * parseInt(quantidade);
  
        if (codigo !== 'chantily' && codigo !== 'queijo') {
          if (!itens.includes(`${codigo},1`) && !itens.includes(`combo1,1`) && !itens.includes(`combo2,1`)) {
            return "Item extra não pode ser pedido sem o principal";
          }
        }
      }
  
      return valorTotal;
    }
  
    aplicarDescontoOuTaxa(formaDePagamento, valorTotal) {
      const descontoDinheiro = 0.95;
      const taxaCredito = 1.03;
  
      switch (formaDePagamento) {
        case 'dinheiro':
          return valorTotal * descontoDinheiro;
        case 'credito':
          return valorTotal * taxaCredito;
        case 'debito':
        default:
          return valorTotal;
      }
    }
  
    calcularValorDaCompra(formaDePagamento, itens) {
      if (!['debito', 'credito', 'dinheiro'].includes(formaDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      if (!itens || itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      const valorTotal = this.calcularValorTotal(itens);
      if (typeof valorTotal === 'string') {
        return valorTotal; 
      }
  
      const valorFinal = this.aplicarDescontoOuTaxa(formaDePagamento, valorTotal);

      return "R$ " + valorFinal.toFixed(2).replace('.', ',');
    }
  }
  
export { CaixaDaLanchonete };