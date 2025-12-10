import { db } from "./firebaseConfig.js";
import { collection, addDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const collRef = collection(db, "contasPagar");
const editarId = localStorage.getItem("editarId");
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

    if (isNaN(valorNumero) || valorNumero <= 0) {
        throw new Error("Valor inválido. Deve ser um número maior que zero.");
    }

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

        if (editarId) {
            const docRef = doc(db, "contasPagar", editarId);
            await updateDoc(docRef, dados);
            alert("Conta a pagar atualizada com sucesso!");
            localStorage.removeItem("editarId");
        } else {
            await addDoc(collRef, dados);
            alert("Conta a pagar adicionada com sucesso!");
        }
        window.location.href = "../pages/lista.html";
    } catch (error) {
        console.error("Erro ao salvar conta a pagar: ", e);
        alert("Erro ao salvar conta a pagar: " + error.message);
    }
});