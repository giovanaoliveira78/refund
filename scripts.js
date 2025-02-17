// Seleciona os elementos do formulário
const amount =  document.getElementById("amount")

amount.oninput = () => {
   let value = amount.value.replace(/\D/g, "") // Aqui recebo o valor do input, tiro as letras com /\D/g e substituo por nada, aspas vazias "" 
   amount.value = value // aqui eu pego o novo valor de value (já formato) e atribuo ao próprio value
}