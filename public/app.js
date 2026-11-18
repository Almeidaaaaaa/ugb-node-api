const API_URL = "http://localhost:3000/heroes";

const heroForm = document.getElementById("heroForm");
const heroesList = document.getElementById("heroesList");

const editDialog = document.getElementById("editDialog");
const editForm = document.getElementById("editForm");
let editingId = null; // id do herói que está sendo editado

// Faz a requisição e já trata o erro da API
async function request(url, options = {}) {
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Erro na requisição.");
    }

    return data;
}


// READ (GET)
async function listHeroes() {
    try {
        const heroes = await request(API_URL);
        heroesList.innerHTML = "";

        if (heroes.length === 0) {
            heroesList.textContent = "Nenhum herói cadastrado.";
            return;
        }

        heroes.forEach((hero) => {
            const card = document.createElement("div");
            card.className = "bg-slate-800 p-5 rounded-xl";

            const name = document.createElement("h3");
            name.className = "text-xl font-bold text-purple-400";
            name.textContent = hero.name;

            const universe = document.createElement("p");
            universe.textContent = "Universo: " + hero.universe;

            const power = document.createElement("p");
            power.textContent = "Poder: " + hero.power;

            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.className = "bg-indigo-500 hover:bg-indigo-900 p-2 rounded mt-3 mr-2";
            editButton.addEventListener("click", () => editHero(hero));

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.className = "bg-purple-600 hover:bg-purple-900 p-2 rounded mt-3";
            deleteButton.addEventListener("click", () => deleteHero(hero.id));

            card.append(name, universe, power, editButton, deleteButton);
            heroesList.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao listar heróis:", error);
        heroesList.textContent = "Não foi possível carregar os heróis.";
    }
}


// CREATE (POST)
async function createHero(event) {
    event.preventDefault();

    const newHero = {
        name: document.getElementById("name").value.trim(),
        universe: document.getElementById("universe").value.trim(),
        power: document.getElementById("power").value.trim()
    };

    if (!newHero.name || !newHero.universe || !newHero.power) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        await request(API_URL, {
            method: "POST",
            body: JSON.stringify(newHero)
        });

        alert("Herói cadastrado com sucesso!");
        heroForm.reset();
        await listHeroes();

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert(error.message);
    }
}


// UPDATE (PUT): abre o modal com os dados do herói
function editHero(hero) {
    editingId = hero.id;
    document.getElementById("editName").value = hero.name;
    document.getElementById("editUniverse").value = hero.universe;
    document.getElementById("editPower").value = hero.power;
    editDialog.showModal();
}

// UPDATE (PUT): envia o que foi digitado no modal
async function saveEdit(event) {
    event.preventDefault();

    const updatedHero = {
        name: document.getElementById("editName").value.trim(),
        universe: document.getElementById("editUniverse").value.trim(),
        power: document.getElementById("editPower").value.trim()
    };

    if (!updatedHero.name || !updatedHero.universe || !updatedHero.power) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    try {
        await request(`${API_URL}/${editingId}`, {
            method: "PUT",
            body: JSON.stringify(updatedHero)
        });

        editDialog.close();
        alert("Herói atualizado com sucesso!");
        await listHeroes();

    } catch (error) {
        console.error("Erro no PUT:", error);
        alert(error.message);
    }
}


// DELETE
async function deleteHero(id) {
    if (!confirm("Deseja realmente excluir este herói?")) return;

    try {
        await request(`${API_URL}/${id}`, { method: "DELETE" });

        alert("Herói excluído com sucesso!");
        await listHeroes();

    } catch (error) {
        console.error("Erro no DELETE:", error);
        alert(error.message);
    }
}


// Eventos
heroForm.addEventListener("submit", createHero);
editForm.addEventListener("submit", saveEdit);

document.getElementById("closeEdit").addEventListener("click", () => editDialog.close());
document.getElementById("cancelEdit").addEventListener("click", () => editDialog.close());

// Fecha o modal ao clicar no fundo escuro
editDialog.addEventListener("click", (e) => {
    if (e.target === editDialog) editDialog.close();
});

listHeroes();