const modal = document.getElementById('my-modal');
var idUpdate
// Open
function openModal(idTotemRecebido) {
  my_modal.style.display = 'block';
  idUpdate = idTotemRecebido
  console.log('estou no open modal para salvar o idUpdate' + idUpdate)

}

// Close
function closeModal() {
  my_modal.style.display = 'none';
}


// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    my_modal.style.display = 'none';
  }
}

function atualizarDados(tabela, dadoRecebidos) {
  console.log('To na atualizardados do modalupdate ' + JSON.stringify(dadoRecebidos))
  for (var i = 0; i < dadoRecebidos.length; i++) {
    if (dadoRecebidos[i].valor != undefined) {
      const novoDadoJSON = JSON.stringify(dadoRecebidos[i].valor)
      const novoDado = novoDadoJSON.replace(/"/g, "'")
      console.log("AQUI TA OS DADOS FORMATADOS COM UMA ASPAS SÓ" + novoDado)
      const coluna = JSON.stringify(dadoRecebidos[i].coluna)
      console.log(`ÌD ${idUpdate} DADO ${novoDado} TABELA ${tabela} COLUNA${coluna}`)
      fetch(`/totem/update/${tabela}/${idUpdate}/${novoDado}/${coluna}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
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