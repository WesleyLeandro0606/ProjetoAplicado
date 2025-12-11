import { db } from "./firebaseConfig.js";
import { collection, addDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const collRef = collection(db, "contasPagar");
const editarId = localStorage.getItem("editarId");
const form = document.getElementById("formreceber");
const botaoLista = document.getElementById("botaoLista");


function getInput() {
    return {
        nome: document.getElementById("nome"),
        vencimento: document.getElementById("vencimento"),
        juros: document.getElementById("juros"),
        valor: document.getElementById("valor"),
    };
}


function getValores({ nome, vencimento, juros, valor }) {

    const valorNumero = parseFloat(valor.value.trim().replace(",", "."));
    const jurosNumero = parseFloat(juros.value.trim().replace(",", "."));

    if (isNaN(valorNumero) || valorNumero <= 0) {
        throw new Error("O valor informado é inválido.");
    }

    const vencimentoData = new Date(vencimento.value.trim());
    const hoje = new Date();

   
    const diff = hoje - vencimentoData;
    const diasAtraso = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

  
    const valorJuros = valorNumero * (jurosNumero / 100) * diasAtraso;
    const total = valorNumero + valorJuros;

    return {
        nome: nome.value.trim(),
        vencimento: vencimento.value.trim(),
        juros: jurosNumero,
        valor: valorNumero,
        diasAtraso,
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
            alert("Conta atualizada com sucesso!");
            localStorage.removeItem("editarId");
        } else {
            await addDoc(collRef, dados);
            alert("Conta adicionada com sucesso!");
        }

        window.location.href = "../pages/lista.html";

    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar: " + error.message);
    }
});


