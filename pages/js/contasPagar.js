import {db} from "./firebaseConfig.js";
import{collection, addDoc, updateDoc, doc} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const collRef = collection(db, "contasPagar");

let editarId = localStorage.getItem("editarId");

function getInput() {
    return {
        nome: document.getElementById("nome"),
        produto: document.getElementById("produto"),
        valor: document.getElementById("valor"),
        vencimento: document.getElementById("vencimento"),
        juros: document.getElementById("juros"),
};
}

function getValores({nome, produto, valor, vencimento, juros}) {
    
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

try {
    if(editarId) {
        const docRef = doc(db, "contasPagar", editarId);
        await updateDoc(docRef,dados);
        alert("Conta a pagar atualizada com sucesso!");
        localStorage.removeItem("editarId");
    } else {
        const docRef = await addDoc (collRef, dados);
        alert("Conta a pagar adicionada com sucesso! ID: " + docRef.id);
    }
    window.location.href = "../pages/lista.html";
}catch (e) {
    console.error("Erro ao salvar conta a pagar: ", e);
    alert("Erro ao salvar conta a pagar: ");
}
document.getElementById("botaoLista").addEventListener("click",()=> {
    window.location.href = "lista.html";
});


document.getElementById("botaoSalvar").addEventListener("click", async function() {
    const inputs = getInput();
    const dados = getValores(inputs);
    console.log("====== DADOS CALCULADOS ======");
    console.log("Nome:", dados.nome);
    console.log("Produto:", dados.produto);
    console.log("Valor Original:", dados.valor);
    console.log("Data de Vencimento:", dados.vencimento);
    console.log("Juros (% ao dia):", dados.juros);
    console.log("Dias em Atraso:", dados.diasAtraso);
    console.log("Valor dos Juros:", dados.valorJuros);
    console.log("Valor Total a Pagar:", dados.total);
})
