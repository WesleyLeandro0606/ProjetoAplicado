import { db } from "./firebaseConfig.js";
import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const id = localStorage.getItem("pagarId");
const infoDiv = document.getElementById("infoConta");
const form = document.getElementById("formPagamento");
let conta = null;



function moeda(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}


async function carregarConta() {
    const docRef = doc(db, "contasPagar", id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
        infoDiv.textContent = "Conta não encontrada.";
        return;
    }

    conta = snap.data();

    infoDiv.innerHTML = `
        <strong>${conta.nome}</strong><br>
        Produto: ${conta.produto}<br>
        Valor Original: ${moeda(conta.valor)}<br>
        Dias de Atraso: ${conta.diasAtraso}<br>
        Juros: ${moeda(conta.valorJuros)}<br>
        <strong>Total Atual: ${moeda(conta.total)}</strong><br><br>
    `;
}

carregarConta();


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const valorPagamento = parseFloat(document.getElementById("valorPagamento").value);

    if (valorPagamento <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    if (valorPagamento > conta.total) {
        alert("O pagamento não pode ser maior que o total atual.");
        return;
    }

    const novoTotal = conta.total - valorPagamento;
    let novosDados = {};

   
    if (novoTotal === 0) {
        novosDados = {
            ...conta,
            valor: 0,
            valorJuros: 0,
            total: 0,
            diasAtraso: 0
        };
    } else {
      
        novosDados = {
            ...conta,
            total: novoTotal
        };
    }

    const docRef = doc(db, "contasPagar", id);
    await updateDoc(docRef, novosDados);

    alert("Pagamento registrado com sucesso!");
    window.location.href = "lista.html";
});