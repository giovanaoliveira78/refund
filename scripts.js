// Seleciona os elementos do formulário
const amount =  document.getElementById("amount")

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