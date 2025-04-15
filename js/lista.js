import { ItemLista } from './item.js';
import { salvarLista, carregarLista } from './armazenamento.js';

export class GerenciadorLista {
    constructor() {
        this.itens = [];
        this.carregarItensSalvos();
    }

    carregarItensSalvos() {
        const itensSalvos = carregarLista();
        this.itens = itensSalvos.map(item => ItemLista.fromJSON(item));
    }

    adicionarItem(texto) {
        const novoItem = ItemLista.criarItem(texto);
        this.itens.push(novoItem);
        this.salvar();
        return novoItem;
    }

    removerItem(id) {
        this.itens = this.itens.filter(item => item.id !== id);
        this.salvar();
    }

    toggleConclusao(id) {
        const item = this.itens.find(item => item.id === id);
        if (item) {
            item.concluida = !item.concluida;
            this.salvar();
        }
    }

    salvar() {
        salvarLista(this.itens);
    }

    getItens() {
        return [...this.itens];
    }
}