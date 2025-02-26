// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona o elemento da lista de despesas
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")


// Captura o evento de input para formatar o valor
amount.oninput = () => {
  //Obtém o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "") // Aqui recebo o valor do input, tiro as letras com /\D/g e substituo por nada, aspas vazias "" 

  // Transforma o valor em centavos (exemplo: 150/100 = 1.50)
  value = Number(value) / 100


  // Atualiza o valor do input com o valor formatado
  amount.value = formatCurrencyBRL(value) // aqui eu pego o novo valor de value (já formato) e atribuo ao próprio value
}

function formatCurrencyBRL(value) {
  // Formata o valor no padrão BRL (real brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  // Retorna o valor formatado
  return value
}
// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault()

  // Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  // Chama a função que irá adicionar o item na lista
  expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento de li para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o icone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
    expenseItem.setAttribute("alt", newExpense.category_name)

    // Cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa 
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona o nome e a categoria na informações da despesa
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    // Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "./img/remove.svg")
    removeIcon.setAttribute("alt", "remover")
    removeIcon.addEventListener("click", () => {
      expenseItem.remove()
    })

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Adiciona o item na lista
    expenseList.append(expenseItem)

    // Atualizar os totais
    updateTotals()
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}


function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista
    const items = expenseList.children

    // Atualiza a quantidade de itens da lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }
}