let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const addBtn = document.getElementById("addBtn");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

if (addBtn) {
    addBtn.addEventListener("click", addTransaction);
}

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        if (transactions.length === 0) {
            alert("No transactions to delete!");
            return;
        }
        if (confirm("Are you sure you want to delete all results?")) {
            transactions = [];
            localStorage.removeItem("transactions");
            updateList();
            updateDashboard();
        }
    });
}

updateList();
updateDashboard();

function addTransaction() {
    const desc = descInput.value;
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (!desc || !amount || !type) {
        if (message) message.textContent = "❌ All fields required!";
        return;
    }

    transactions.push({ desc, amount, type });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    descInput.value = "";
    amountInput.value = "";
    typeInput.value = "";

    updateList();
    updateDashboard();
}

function updateList() {
    if (!listEl) return;
    listEl.innerHTML = "";

    transactions.forEach((t, i) => {
        const li = document.createElement("li");
        li.textContent = `${t.type.toUpperCase()} - $${t.amount} - ${t.desc}`;
        listEl.appendChild(li);
    });
}

function updateDashboard() {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    if (incomeEl) incomeEl.textContent = `$${income}`;
    if (expenseEl) expenseEl.textContent = `$${expense}`;
    if (balanceEl) balanceEl.textContent = `$${income - expense}`;
}
