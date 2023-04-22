var validar_usuario = false;
function validarUsuario() {
  var usuario = form2.value;
  /* Verifica se o usuario tem mais de 6 caractéres */
  if (usuario.length < 6) {
    spanErrorUser.classList.add("active");
    spanErrorUser.innerHTML = "Nome Inválido";
    validar_usuario = false;
  } else {
    spanErrorUser.classList.remove("active");
    validar_usuario = true;
  }
}

var validar_senha = false;
function validarSenha() {
  var senha = form4.value;
  var fortificador =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$*&@#])([0-9a-zA-Z!$*&@#]){8,}$/;
  /*
    
  (?=.*\d)         // deve conter ao menos um dígito
  (?=.*[a-z])      // deve conter ao menos uma letra minúscula
  (?=.*[A-Z])      // deve conter ao menos uma letra maiúscula
  (?=.*[$*&@#!])    // deve conter ao menos um caractere especial

  ([0-9a-zA-Z$*&@#]): é uma classe de caracteres contendo números, 
  letras e os caracteres especiais que você está considerando. 
  Eles estão dentro de parênteses para formar um grupo de captura

*/
  /* Verifica se a senha está com as requisições acima */
  if (fortificador.test(senha)) {
    spanErrorPassword.classList.remove("active");
    validar_senha = true;
    spanAviso.innerHTML = "";
  } else {
    validar_senha = false;
    spanErrorPassword.classList.add("active");
    spanErrorPassword.innerHTML = "Senha inválida";
    spanAviso.innerHTML = `<span class="spanAviso">Sua Senha deve ter no minimo 8 caracteres:<br>Uma letra Maiúscula<br>Uma letra Minuscula<br>Um numero<br>Um caracter especial</span>`;
  }
}