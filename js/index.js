import { GerenciadorLista } from './lista.js';
import { UILista } from './interface.js';

document.addEventListener('DOMContentLoaded', () => {

    const inputTarefa = document.getElementById("input-entrada");
    const botaoAdicionar = document.getElementById("adicionar-item");
    const listaCompras = document.getElementById("lista-de-compras");
    const mensagem = document.getElementById("mensagem");

    const gerenciador = new GerenciadorLista();
    const ui = new UILista(listaCompras, mensagem);

    const atualizarInterface = () => {
        ui.carregarItens(
            gerenciador.getItens(),
            id => {
                gerenciador.toggleConclusao(id);
                atualizarInterface();
            },
            id => {
                gerenciador.removerItem(id);
                atualizarInterface();
            }
        );
    };

    atualizarInterface();

    botaoAdicionar.addEventListener('click', adicionarTarefa);
    inputTarefa.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') adicionarTarefa();
    });
    
    function adicionarTarefa() {
        const texto = inputTarefa.value.trim();
        if (!texto) {
            inputTarefa.focus();
            return;
        }
        
        gerenciador.adicionarItem(texto);
        atualizarInterface();
        
        inputTarefa.value = '';
        inputTarefa.focus();
    }
});