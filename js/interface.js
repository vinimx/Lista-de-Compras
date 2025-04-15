import { formatarData } from './item.js';

export class UILista {
    constructor(listaCompras, mensagem) {
        this.listaElement = listaCompras;
        this.mensagemElement = mensagem;
    }

    atualizarMensagem() {
        this.mensagemElement.style.display = 
            this.listaElement.children.length === 0 ? 'flex' : 'none';
    }

    criarElementoItem(item) {
        const elemento = document.createElement('li');
        elemento.className = 'lista-item';
        elemento.dataset.id = item.id;
        
        elemento.innerHTML = `
            <div class="conteudo-item">
                <input type="checkbox" class="checkbox-tarefa" id="check-${item.id}" ${item.concluida ? 'checked' : ''}>
                <div class="texto-container">
                    <span class="texto-item ${item.concluida ? 'texto-riscado' : ''}">${item.texto}</span>
                    <p class="data-item ${item.concluida ? 'data-verde' : ''}">${formatarData(item.data)}</p>
                </div>
            </div>
            <button class="remove-btn" aria-label="Remover item">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        return elemento;
    }

 
    adicionarItem(item, onToggle, onRemove) {
        const elemento = this.criarElementoItem(item);
        this.listaElement.appendChild(elemento);
        
        if (item.concluida) {
            elemento.classList.add('marcado');
        }
        
        elemento.querySelector('.checkbox-tarefa').addEventListener('change', (e) => {
            onToggle(item.id);
            elemento.classList.toggle('marcado', e.target.checked);
        });
        
        elemento.querySelector('.remove-btn').addEventListener('click', (e) => {
            e.preventDefault();
            onRemove(item.id);
        });
        
        this.atualizarMensagem();
    }

    limparLista() {
        this.listaElement.innerHTML = '';
        this.atualizarMensagem();
    }

    carregarItens(itens, onToggle, onRemove) {
        this.limparLista();
        itens.forEach(item => this.adicionarItem(item, onToggle, onRemove));
    }
}