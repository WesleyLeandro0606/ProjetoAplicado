import {db} from "./firebaseConfig.js";
import {collection,
     getDocs,
      deleteDoc,
       doc
    } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const collRef = collection(db, "contasPagar");
const ul = document.getElementById("lista");

async function carregarLista() {
const snapshot = await getDocs(collRef);
ul.innerHTML = "";
if (snapshot.empty){
    ul.innerHTML = "<li> Nenhuma conta encontrada.</li>";
}

snapshot.forEach(docSnap => { 
    const data = docSnap.data();
    const id = docSnap.id;

const li = document.createElement("li");
li.innerHTML = `
<strong>${data.nome}</strong> - ${data.produto}<br>
Valor Original: R$ ${data.valor}<br>
Dias de Atraso: ${data.diasAtraso}<br>
Juros acumulado: R$ ${data.valorJuros}<br>
<strong>Total a Pagar: R$ ${data.total}</strong><br>
<button onclick = "editar('${id}')">Editar</button>
<button onclick = "excluir('${id}')">Excluir</button>
`;
ul.appendChild(li);
});
}
 window.editar = (id) => {
    localStorage.setItem("editarId", id);
    window.location.href = "contasPagar.html";
};

window.excluir = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta conta a pagar?")) {
        await deleteDoc(doc(db, "contasPagar", id));
        carregarLista();
    }
};

carregarLista();



