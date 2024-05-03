//TODOS OS ELEMENTOS QUE TIVEREM O ATRIBUTO REQUIRED //
const camposFormulario = document.querySelectorAll("[required]"); // seleciona todos os itens obrigatórios "required" //
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const listaRespostas = { //pega os valores dos inputs//
    "nome": e.target.elements["nome"].value,
    "email": e.target.elements["email"].value,
    "assunto": e.target.elements["assunto"].value,
    "mensagem": e.target.elements["mensagem"].value
  }

  localStorage.setItem("cadastro", JSON.stringify(listaRespostas)); //armazena localmente//

 // window.location.href = './formenviado.html' redireciona para outra página//

 alert("Sua mensagem foi enviada!"); //prompt de aviso de envio do formulário //

 // Limpa os campos do formulário APÓS ENVIO//
 camposFormulario.forEach(campo => {
  campo.value = ""; // Define o valor como vazio //
});

} ) 

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault()); //para tirar os avisos padrão e customizar os avisos ao usuário//
} )

const tiposDeErro = [ //define os tipos de erro//
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort'
]

const mensagens = { //define as mensagens de erro em cada caso de erro//
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.", //não tem nada digitado//
        typeMismatch: "Não é permitido o uso de números neste campo", //o tipo de dado preenchido não corresponde ao tipo de padrão pedido//
        patternMismatch: "Por favor, preencha um nome válido.", //quando usa expressão regular, como um CPF//
        tooShort: "Por favor, preencha um nome com 3 ou mais caracteres." //quando não respeita o mínimo de caracteres que foi especificado//
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    assunto:  {
        valueMissing: "O campo de assunto não pode estar vazio.",
        typeMismatch: "Não é permitido o uso de números neste campo",
        tooShort: "Por favor, preencha um assunto com no mínimo 3 e no máximo 30 caracteres."
    },
    mensagem:  {
        valueMissing: "O campo de mensagem não pode estar vazio.",
        typeMismatch: "Não é permitido o uso de números neste campo",
        tooShort: "Por favor, preencha a mensagem com no mínimo 5 e no máximo 200 caracteres."
    }
}

//para cada campo da lista, quando a pessoa tirou o foco do campo para ir para outro (BLUR)//
function verificaCampo(campo) {
let mensagem = "";
campo.setCustomValidity(''); 

tiposDeErro.forEach(erro => { // Verifica cada tipo de erro para o campo atual
  if (campo.validity[erro]) {
    mensagem = mensagens[campo.name][erro]; // Obtém a mensagem de erro do objeto mensagens
    console.log(mensagem); // Exibe a mensagem de erro no console

  }
}) 

const mensagemErro = campo.parentNode.querySelector('.mensagem-erro'); // Encontra o elemento que exibe a mensagem de erro para o campo atual
const validadorDeInput = campo.checkValidity(); // Verifica a validade do input do campo atual

// Se o input do campo não for válido, exibe a mensagem de erro, caso contrário, limpa a mensagem de erro
if (!validadorDeInput) {
  mensagemErro.textContent = mensagem; // Exibe a mensagem de erro
} else {
  mensagemErro.textContent = ""; // Limpa a mensagem de erro
}
}