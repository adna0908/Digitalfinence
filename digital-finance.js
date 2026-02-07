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

/* ===============================
       CONTACT BUTTON FUNCTION
================================*/
const sendBtn = document.getElementById("sendBtn");
if (sendBtn) {
    sendBtn.addEventListener("click", () => {
        const contactName = document.getElementById("contactName").value.trim();
        const contactEmail = document.getElementById("contactEmail").value.trim();
        const contactMsg = document.getElementById("contactMessage").value.trim();
        const contactInfo = document.getElementById("contactInfo");

        if (!contactName || !contactEmail || !contactMsg) {
            contactInfo.textContent = "❌ Please fill all fields!";
            contactInfo.style.color = "red";
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactEmail)) {
            contactInfo.textContent = "❌ Please enter a valid email!";
            contactInfo.style.color = "red";
            return;
        }

        contactInfo.textContent = "✅ Message waa la diray!";
        contactInfo.style.color = "green";

        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("contactMessage").value = "";
    });
}
