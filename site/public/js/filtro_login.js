

function navBar(){
    const permissao = sessionStorage.PERMISSAO
    console.log("to na funcao nav bar" + permissao)
    if(permissao == "Gerente"){
        console.log("to na if da permissao gerente")
        nav_dashboard.style.display = "none";
        nav_listaEstabelecimentos.style.display = "none";
    }else if(permissao == "Técnico"){
        console.log("to na if da permissao técnico")
        nav_ocorrencia.style.display = "none";
        nav_estabelecimento.style.display = "none";
        nav_totem.style.display = "none";
        nav_func.style.display = "none";
        nav_painel.style.display = "none";
    }

    

}