function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('inputLogradouro').value=("");
        document.getElementById('inputBairro').value=("");
        document.getElementById('inputCidade').value=("");
        document.getElementById('inputUF').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('inputLogradouro').value=(conteudo.logradouro);
        document.getElementById('inputBairro').value=(conteudo.bairro);
        document.getElementById('inputCidade').value=(conteudo.localidade);
        document.getElementById('inputUF').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}
    
function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('inputLogradouro').value="...";
            document.getElementById('inputBairro').value="...";
            document.getElementById('inputCidade').value="...";
            document.getElementById('inputUF').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

            validarBairro();
            validarCidade();
            validarLogradouro();
            validarUF();

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

const cepMaskCode = (event) => {
    let input = event.target
    input.value = cepMask(input.value)
  }
  
  const cepMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{5})(\d)/,'$1-$2')
    return value
  }