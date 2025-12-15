import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const collRef = collection(db, "contasPagar");
const form = document.getElementById("formContasPagar");
const botaoLista = document.getElementById("botaoLista");

function getInput() {
    return {
        nome: document.getElementById("nome"),
        produto: document.getElementById("produto"),
        valor: document.getElementById("valor"),
        vencimento: document.getElementById("vencimento"),
        juros: document.getElementById("juros"),
    };
}

function getValores({ nome, produto, valor, vencimento, juros }) {
    const valorNumero = parseFloat(valor.value.trim().replace(",", "."));
    const jurosNumero = parseFloat(juros.value.trim().replace(",", "."));
    const vencimentoData = new Date(vencimento.value.trim());
    const hoje = new Date();

    const diffTempo = hoje - vencimentoData;
    const diasAtraso = Math.floor(diffTempo / (1000 * 60 * 60 * 24));
    const dias = diasAtraso > 0 ? diasAtraso : 0;

    const valorJuros = valorNumero * (jurosNumero / 100) * dias;
    const total = valorNumero + valorJuros;

    return {
        nome: nome.value.trim(),
        produto: produto.value.trim(),
        valor: valorNumero,
        vencimento: vencimento.value.trim(),
        juros: jurosNumero,
        diasAtraso: dias,
        valorJuros,
        total
    };
}

botaoLista.addEventListener("click", () => {
    window.location.href = "lista.html";
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const inputs = getInput();
        const dados = getValores(inputs);

        await addDoc(collRef, dados);

        alert("Conta a pagar adicionada com sucesso!");
        window.location.href = "lista.html";

    } catch (error) {
        console.error("Erro ao salvar conta a pagar: ", error);
        alert("Erro ao salvar conta a pagar: " + error.message);
    }
});
