import { db } from "./firebaseConfig.js";
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const collRef = collection(db, "contasReceber"); 
const ul = document.getElementById("lista");
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    style="currency", currency="BRL"
}


async function carregarLista() {
    const snapshot = await getDocs(collRef);
    ul.innerHTML = "";

    if (snapshot.empty) {
        ul.innerHTML = "<li>Nenhuma conta encontrada.</li>";
        return;
    }

    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const id = docSnap.id;

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${data.nome}</strong><br>
            Valor Original: R$ ${data.valor.toFixed(2).replace(".", ",")}<br>
            Dias de Atraso: ${data.diasAtraso}<br>
            Juros acumulado: R$ ${data.valorJuros.toFixed(2).replace(".", ",")}<br>
            <strong>Total a Pagar: R$ ${data.total.toFixed(2).replace(".", ",")}</strong><br>
            <button onclick="pagar('${id}')">Pagar</button>
            <button onclick="editar('${id}')">Editar</button>
            <button onclick="excluir('${id}')">Excluir</button>
        `;
        ul.appendChild(li);
    });
}

window.editar = (id) => {
    localStorage.setItem("editarId", id);
    window.location.href = "receber.html";
};

window.excluir = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta conta a pagar?")) {
        await deleteDoc(doc(db, "contasPagar", id));
        carregarLista();
    }
};
window.pagar =  (id) => {
    localStorage.setItem("pagarId", id);
    window.location.href = "pagar.html";
}
carregarLista();
