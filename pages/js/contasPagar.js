function getInput() {
    return {
        nome: document.getElementById("nome da empresa"),
        produto: document.getElementById("produto"),
        valor: document.getElementById("valor"),
        vencimento: document.getElementById("vencimento"),
        juros: document.getElementById("juros"),
};
}

function getValores({nome, produto, valor, vencimento, juros}) {
    return {
        nome: nome.value.trim(),
        produto: produto.value.trim(),
        valor: parseFloat(valor.value.trim().replace(",", ".")) || 0,
        vencimento: vencimento.value.trim(),
        juros: parseFloat(juros.value.trim().replace(",", ".")) || 0, 
    };
}
