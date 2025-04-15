export class ItemLista {
    constructor(texto, concluida = false, id = Date.now(), data = new Date()) {
        this.id = id;
        this.texto = texto;
        this.concluida = concluida;
        this.data = data;
    }

    static criarItem(texto) {
        return new ItemLista(texto);
    }

    static fromJSON(json) {
        return new ItemLista(
            json.texto,
            json.concluida,
            json.id,
            new Date(json.data)
        );
    }
}

export const formatarData = (data) => {
    return data.toLocaleString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};