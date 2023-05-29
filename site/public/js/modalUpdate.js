const modal = document.querySelector('#my-modal');
var idUpdate
// Open
function openModal(idTotemRecebido) {
    my_modal.style.display = 'block';
    idUpdate = idTotemRecebido
}

// Close
function closeModal() {
    my_modal.style.display = 'none';
}

function openModal2() {
   modal2.style.display = 'block';
}

// Close
function closeModal2() {
   modal2.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
    if (e.target == modal) {
        my_modal.style.display = 'none';
    }
}

function atualizarDados(tabela ,dadoRecebidos){
    for(var i = 0; i < dadoRecebidos.lenght; i++){
        if(dadoRecebidos[i] != undefined){
            fetch(`/totem/update/${tabela}/${idUpdate}/${dadoRecebidos[i]}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  valorDado: valor
                })
              }).then(function (resposta) {
                
                if (resposta.ok) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Parabéns',
                    text: 'Username atualizado com sucesso!',
                    })
                  
                } else if (resposta.status == 404) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'Deu 404!',
                    })
                } else {
                  throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
                }
              }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
              })
        }
    }
}