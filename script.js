// document.addEventListener("DOMContentLoaded",()=>{
//     const expenseForm = document.getElementById("expense-form");
//     const expenseNameInput = document.getElementById("expence-name");
//     const expenseAmountInput = document.getElementById("expence-amount");
//     const expenseList = document.getElementById("expense-list");
//     const totalamountDisplay = document.getElementById("total-amount");
    
//     let expense = [];
//     let totalAmount = calculateTotal();

//     expenseForm.addEventListener("submit",(e)=>{
//         e.preventDefault();
//         const name = expenseNameInput.value.trim();
//         const amount = parseFloat(expenseAmountInput.value.trim());

//         if (name !=="" && !isNaN(amount) && amonut>0){
//             const newExpense={
//                 id:Date.now(),
//                 name:name,
//                 amount:amount
//             }
//             expense.push(newExpense)
//             saveExpensesToLocal()
//             updateTotal()

//             //clear input
//             expenseNameInput.value=""
//             expenseAmountInput.value=""
//         }

//     })
//     function calculateTotal(){
//        return expense.reduce((sum,expense)=>sum+expense.amonut,0)
//     }
//     function saveExpensesToLocal(){
//         localStorage.getItem("expense",JSON.stringify(expense))
//     }

//     function updateTotal(){
//           totalAmount = calculateTotal();
//     }

// })
document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expence-name");
    const expenseAmountInput = document.getElementById("expence-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");
  
    let expenses = [];
    let totalAmount = 0;
  
    // Load expenses from local storage on page load
    loadExpensesFromLocal();
  
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = expenseNameInput.value.trim();
      const amount = parseFloat(expenseAmountInput.value.trim());
  
      if (name !== "" && !isNaN(amount) && amount > 0) {
        const newExpense = {
          id: Date.now(),
          name: name,
          amount: amount,
        };
  
        expenses.push(newExpense);
        saveExpensesToLocal();
        renderExpenses();
        updateTotal();
  
        // Clear input fields
        expenseNameInput.value = "";
        expenseAmountInput.value = "";
      } else {
        alert("Please enter a valid expense name and amount greater than 0.");
      }
    });
  
    function calculateTotal() {
      return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
  
    function saveExpensesToLocal() {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  
    function loadExpensesFromLocal() {
      const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
      if (storedExpenses) {
        expenses = storedExpenses;
        renderExpenses();
        updateTotal();
      }
    }
  
    function renderExpenses() {
      expenseList.innerHTML = ""; // Clear the list
      expenses.forEach((expense) => {
        const li = document.createElement("li");
        li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
        li.classList.add("expense-item");
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => deleteExpense(expense.id));
  
        li.appendChild(deleteButton);
        expenseList.appendChild(li);
      });
    }
  
    function deleteExpense(id) {
      expenses = expenses.filter((expense) => expense.id !== id);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }
  
    function updateTotal() {
      totalAmount = calculateTotal();
      totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }
  });
  