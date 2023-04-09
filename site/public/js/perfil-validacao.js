/* Validando os campos da empresa */
var validar_empresa = false;
function validarEmpresa() {
  var empresa = inputEmpresa.value;
  /* Verifica se o nome da empresa tem mais de 3 caractéres */
  if (empresa.length < 3) {
    inputEmpresa.classList.add("red");
    inputEmpresa.classList.remove("green");
  } else {
    inputEmpresa.classList.remove("red");
    inputEmpresa.classList.add("green");
    validar_empresa = true;
  }
}
//Validando CNPJ da empresa com os 14 caracteres
var validar_cnpj = false;
function validarCNPJ() {
  var CNPJ = inputCNPJ.value;
  /* Verifica se o usuario tem mais de 6 caractéres */
  if (CNPJ.length != 14) {
    inputCNPJ.classList.add("red");
    inputCNPJ.classList.remove("green");
  } else {
    inputCNPJ.classList.remove("red");
    inputCNPJ.classList.add("green");
    validar_cnpj = true;
  }
}

//Validando o Logradouro da empresa
var validar_logradouro = false;
function validarLogradouro() {
  var logradouro = inputLogradouro.value;
  /* Verifica se o logradouro tem mais de 3 caractéres */
  if (logradouro.length < 3) {
    inputLogradouro.classList.add("red");
    inputLogradouro.classList.remove("green");
  } else {
    inputLogradouro.classList.remove("red");
    inputLogradouro.classList.add("green");
    validar_logradouro = true;
  }
}
// Validando select
var validar_uf = false;
function validarUF() {
  var uf = inputUF.value;
  if (uf == "none") {
    inputUF.classList.add("red");
    inputUF.classList.remove("green");
  } else {
    inputUF.classList.remove("red");
    inputUF.classList.add("green");
    validar_uf = true;
  }
}
//Validando a cidade da empresa
var validar_cidade = false;
function validarCidade() {
  var cidade = inputCidade.value;
  /* Verifica se a cidade tem mais de 8 caractéres */
  if (cidade.length < 8) {
    inputCidade.classList.add("red");
    inputCidade.classList.remove("green");
  } else {
    inputCidade.classList.remove("red");
    inputCidade.classList.add("green");
    validar_cidade = true;
  }
}

// Validando o CEP da empresa
var validar_cep = false;
function validarCEP() {
  var CEP = inputCEP.value;
  /* Verifica se a cidade tem mais de 8 caractéres */
  if (CEP.length != 8) {
    inputCEP.classList.add("red");
    inputCEP.classList.remove("green");
  } else {
    inputCEP.classList.remove("red");
    inputCEP.classList.add("green");
    validar_cep = true;
  }
}

//Validando o Bairro da empresa
validar_bairro = false;
function validarBairro() {
  var bairro = inputBairro.value;
  //Verifica se o bairro da empresa tem mais que 6 caracteres
  if (bairro.length < 3) {
    inputBairro.classList.add("red");
    inputBairro.classList.remove("green");
  } else {
    inputBairro.classList.remove("red");
    inputBairro.classList.add("green");
    validar_bairro = true;
  }
}

//Validando o Complemento da Empresa
function validarComplemento() {
  var complemento = inputBairro.value;
  //Verifica se o complemento da empresa tem mais que 4 caracteres
  if (complemento.length < 4) {
    inputComplemento.classList.add("red");
    inputComplemento.classList.remove("green");
  } else {
    inputComplemento.classList.remove("red");
    inputComplemento.classList.add("green");
  }
}
/* Validando os campos do cadastro do funcionario */
//Validando Nome de usuario
var validar_usuario = false;
function validarUsuario() {
  var usuario = inputUsuario.value;
  /* Verifica se o usuario tem mais de 6 caractéres */
  if (usuario.length < 6) {
    inputUsuario.classList.add("red");
    inputUsuario.classList.remove("green");
  } else {
    inputUsuario.classList.remove("red");
    inputUsuario.classList.add("green");
    validar_usuario = true;
  }
}
function validarCargo() {
  var cargo = inputCargo.value;
  /* Verifica se o usuario tem mais de 6 caractéres */
  if (cargo.length < 2) {
    inputCargo.classList.add("red");
    inputCargo.classList.remove("green");
  } else {
    inputCargo.classList.remove("red");
    inputCargo.classList.add("green");
    validar_cargo = true;
  }
}
//Validando Senha do Usuario
var validar_senha = false;
function validarSenha() {
  var senha = inputSenha.value;
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
    inputSenha.classList.remove("red");
    inputSenha.classList.add("green");
    validar_senha = true;
  } else {
    inputSenha.classList.add("red");
    inputSenha.classList.remove("green");
  }
}
//Validando Nome Do usuario
var validar_nome = false;
function validarNome() {
  var nome = inputNome.value;
  /* Devolve a quantidade de nomes em numeros Ex: Sherlock Homes -> vai retornar 2 */
  const nomeCompleto = nome.split(" ");
  /* Verifica se a quantidade de nomes é menor que 1, pois ninguém tem um nome completo de um nome apenas */
  if (nomeCompleto.length <= 1) {
    inputNome.classList.add("red");
    inputNome.classList.remove("green");
  } else {
    inputNome.classList.remove("red");
    inputNome.classList.add("green");
    validar_nome = true;
  }
  /* Faz a substituição das primeiras letras dos nomes caso o usuário coloque a primeira leta do nome minuscula */
  for (let i = 0; i < nomeCompleto.length; i++) {
    nomeCompleto[i] =
      nomeCompleto[i][0].toUpperCase() + nomeCompleto[i].substr(1);
  }
  /* Junta os nomes novamente */
  nomeCompleto.join(" ");
}
//Validando Email do Usuario
var validar_email = false;
function validarEmail() {
  var email = inputEmail.value;
  var validacao = /\S+@\S+\.\S+/;
  /* Qualquer tipo de texto:
  Seguida por um caractere @ (que é obrigatório em e-mails);
  Seguido por algum outro texto, o domínio/provedor;
  E então temos a presença de um ponto, que também é obrigatório;
  E por fim mais um texto, validando tanto emails .com quanto .com.br, e outros que tenham terminologias diferentes */
  if (!validacao.test(email)) {
    inputEmail.classList.add("red");
    inputEmail.classList.remove("green");
  } else {
    inputEmail.classList.remove("red");
    inputEmail.classList.add("green");
    validar_email = true;
  }
}
//Validando Contato do Usuario
var validar_contato = false;
function validarContato() {
  var contato = inputContato.value;
  if (contato.length < 11) {
    // Valida números telefones celulares para contato
    inputContato.classList.add("red");
    inputContato.classList.remove("green");
  } else {
    inputContato.classList.remove("red");
    inputContato.classList.add("green");
    validar_contato = true;
  }
}
function botao_registro() {
  if (
    validar_nome &&
    validar_cnpj &&
    validar_email &&
    validar_senha &&
    validar_empresa &&
    validar_logradouro &&
    validar_bairro  &&
    validar_cep &&
    validar_uf &&
    validar_cidade 
  ) {
    cadastrar();

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Cadastro inválido!',
      })
  }
}

function botao_registro_func() {
  if (
    validar_usuario &&
    validar_senha &&
    validar_nome &&
    validar_email
  ) {

    
    cadastrarFuncionario();

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Cadastro de funcionário inválido!',
      })
  }
}

function removerCard(idPerfil) {
  if(idPerfil != sessionStorage.ID_PERFIL) {

    console.log("Criar função de apagar post escolhido - ID: " + idPerfil);
    fetch(`/funcionario/removerusuario/${idPerfil}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      }),
    })
      .then(function (resposta) {
        Swal.fire({
          icon: 'success',
          title: 'Parabéns',
          text: 'Funcionario deletado com sucesso!',
          })

          setTimeout(() => window.location.reload(), 2000);
          
         if (resposta.status == 404) {
          Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Não foi possível excluir!',
            })
        } else {
          throw (
            "Houve um erro ao tentar deletar: " +
            resposta.status
          );
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: 'Você não pode remover seu próprio perfil!',
        })
    }
  }

function validar_autenticacao_login() {
  if (validar_usuario && validar_senha) {
    window.location.href = "perfil-dashboard-empresa.html";
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Autenticação inválida!',
    })
  }
}



function sumirMensagem() {
  cardErro.style.display = "none"
}

