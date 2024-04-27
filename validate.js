
function validarFormulario() {
    if (enviarMensagem()) {
        console.log("Formulário válido. Enviar via AJAX ou realizar outras ações.");
    } else {
        console.log("Formulário inválido. Corrija os campos e tente novamente.");
    }
}


function enviarMensagem() {
    var nomeInput = document.getElementById("nome");
    var emailInput = document.getElementById("email");
    var assuntoInput = document.getElementById("assunto");
    var mensagemTextarea = document.getElementById("mensagem");

    var nome = nomeInput.value.trim();
    var email = emailInput.value.trim();
    var assunto = assuntoInput.value.trim();
    var mensagem = mensagemTextarea.value.trim();

    clearFeedbackMessages();

    // Validação do nome
    if (nome === "") {
        displayFeedbackMessage(nomeInput, "Por favor, insira seu nome!");
        return false;
    } else if (!validateName(nome)) {
        displayFeedbackMessage(nomeInput, "O nome não pode conter mais de 50 caracteres.");
        return false;
    }

    // Validação do email
    if (email === "") {
        displayFeedbackMessage(emailInput, "Por favor, insira seu email!");
        return false;
    } else if (!validateEmail(email)) {
        displayFeedbackMessage(emailInput, "Por favor, insira um email no formato xx@xx.xx");
        return false;
    }

    // Validação do assunto
    if (assunto === "") {
        displayFeedbackMessage(assuntoInput, "Por favor, insira o assunto!");
        return false;
    } else if (!validateSubject(assunto)) {
        displayFeedbackMessage(assuntoInput, "O assunto não pode conter mais de 50 caracteres.");
        return false;
    }

    // Validação da mensagem
    if (mensagem === "") {
        displayFeedbackMessage(mensagemTextarea, "Por favor, insira sua mensagem!");
        return false;
    } else if (!validateMessage(mensagem)) {
        displayFeedbackMessage(mensagemTextarea, "A mensagem não pode conter mais de 300 caracteres.");
        return false;
    }

    Swal.fire({
        icon: "success",
        width: "30vw",
        title: "Sua mensagem foi enviada com sucesso!",
        confirmButtonColor: "#8068FF",
      });

    return true;
}

//Função para validar o formato do nome
function validateName(nome) {
    var re = /^[\w\s\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_``{|}~À-ÿ]{1,50}$/;
    return re.test(nome);
}

// Função para validar o formato do email
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//Função para validar o formato do assunto
function validateSubject(assunto) {
    var re = /^[\w\s\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_``{|}~À-ÿ]{1,50}$/;
    return re.test(assunto);
}

//Função para validar o formato da mensagem
function validateMessage(mensagem) {
    var re = /^[\w\s\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_``{|}~À-ÿ]{1,300}$/;
    return re.test(mensagem);
}

// Função para mostrar a mensagem de feedback
function displayFeedbackMessage(inputElement, message) {
    var feedbackMessage = document.createElement("div");
    feedbackMessage.className = "feedback-message";
    feedbackMessage.textContent = message;
    inputElement.parentNode.appendChild(feedbackMessage);

    if (inputElement.id === "mensagem") {
        inputElement.parentNode.insertBefore(feedbackMessage, inputElement.nextSibling);
    } else {
        inputElement.parentNode.appendChild(feedbackMessage);
    }

    inputElement.focus();
}

// Função para apagar as mensagens de feedback
function clearFeedbackMessages() {
    var feedbackMessages = document.querySelectorAll(".feedback-message");
    feedbackMessages.forEach(function (message) {
        message.parentNode.removeChild(message);
    });
}