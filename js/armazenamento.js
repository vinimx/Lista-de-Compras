export const salvarLista = (itens) => {
    localStorage.setItem('listaCompras', JSON.stringify(itens));
};

export const carregarLista = () => {
    return JSON.parse(localStorage.getItem('listaCompras')) || [];
};