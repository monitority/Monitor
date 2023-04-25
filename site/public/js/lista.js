function criarAlerta() {

    let divListaTotem = document.getElementById('lista-totens');
    for (var i = 0; i < 5; i++) {

        if (i == 0) {
            divListaTotem.innerHTML += ` 
        <div id="itemAlerta0" class="item-lista alerta">
        <h4>ID Totem: <b>001</b> </h4>
        <p>
            Status: <b>Alerta <img src="assets/icons/sinal-de-aviso.png" style="width: 18px;"></b>
        </p>
        <p>
            Estabelecimento: <b>McDonald's</b>
        </p>
        <h6>
            Data do problema: <b>11/03/2023</b>
        </h6>
    </div>
    `
        } else if (i == 1) {
            divListaTotem.innerHTML += ` 
            <div id="itemAlerta1" class="item-lista alerta">
                        <h4>ID Totem: <b>021</b> </h4>
                        <p>
                            Status: <b>Alerta <img src="assets/icons/sinal-de-aviso.png" style="width: 18px;"></b>
                        </p>
                        <p>
                            Estabelecimento: <b>Coco Bambu</b>
                        </p>
                        <h6>
                            Data do problema: <b>01/02/2023</b>
                        </h6>
                    </div>
            `
        } else if (i == 2) {
            divListaTotem.innerHTML += ` 
            <div id="itemAlerta2" class="item-lista alerta">
                        <h4>ID Totem: <b>004</b> </h4>
                        <p>
                            Status: <b>Alerta <img src="assets/icons/sinal-de-aviso.png" style="width: 18px;"></b>
                        </p>
                        <p>
                            Estabelecimento: <b>Outback</b>
                        </p>
                        <h6>
                            Data do problema: <b>21/01/2023</b>
                        </h6>
                    </div>
            `
        } else if (i == 3) {
            divListaTotem.innerHTML += ` 
            <div id="itemAlerta3" class="item-lista alerta">
                        <h4>ID Totem: <b>007</b> </h4>
                        <p>
                            Status: <b>Alerta <img src="assets/icons/sinal-de-aviso.png" style="width: 18px;"> </b>
                        </p>
                        <p>
                            Estabelecimento: <b>Burguer King</b>
                        </p>
                        <h6>
                            Data do problema: <b>18/04/2023</b>
                        </h6>
                    </div>
            `
        } else if (i == 4) {
            divListaTotem.innerHTML += ` 
            <div id="itemAlerta4" class="item-lista alerta">
                        <h4>ID Totem: <b>008</b> </h4>
                        <p>
                            Status: <b>Alerta <img src="assets/icons/sinal-de-aviso.png" style="width: 18px;"></b>
                        </p>
                        <p>
                            Estabelecimento: <b>Burguer Kings </b>
                        </p>
                        <h6>
                            Data do problema: <b>21/03/2023</b>
                        </h6>
                    </div>
            `
        }
    }
}

function removerCritico() {

    for (var i = 0; i < 3; i++) {
        let divsToRemove = document.getElementById(`itemCritico${i}`);
        divsToRemove.remove();

    }
}

function removerAlerta() {
    for (var i = 0; i < 5; i++) {
        let divsToRemove = document.getElementById(`itemAlerta${i}`);
        divsToRemove.remove();
    }
}


function criarCritico() {
    let divListaTotem = document.getElementById('lista-totens');
    var buttonAlerta = document.getElementById('buttonAlerta');

    buttonAlerta.setAttribute("Onclick", "removerCritico(), criarAlerta()");
    for (var i = 0; i < 3; i++) {

        if (i == 0) {
            divListaTotem.innerHTML += ` 
            <div id="itemCritico0" class="item-lista critico">
            <h4>ID Totem: <b>010</b></h4>
            <p>
                Status: <b>Crítico <img src="assets/icons/sinal-de-aviso-red.png" style="width: 18px;"></b>
            </p>
            <p>
                Estabelecimento: <b>McDonald's</b>
            </p>
            <h6>
                Data do problema: <b>25/04/2023</b>
            </h6>
        </div>
    `
        } else if (i == 1) {
            divListaTotem.innerHTML += ` 
            <div id="itemCritico1" class="item-lista critico">
                        <h4>ID Totem: <b>012</b> </h4>
                        <p>
                            Status: <b>Crítico <img src="assets/icons/sinal-de-aviso-red.png" style="width: 18px;"></b>
                        </p>
                        <p>
                            Estabelecimento: <b>Outback</b>
                        </p>
                        <h6>
                            Data do problema: <b>30/01/2023</b>
                        </h6>
                    </div>
            `
        } else if (i == 2) {
            divListaTotem.innerHTML += ` 
            <div id="itemCritico2" class="item-lista critico ultimo">
                        <h4>ID Totem: <b>016</b> </h4>
                        <p>
                            Status: <b>Crítico <img src="assets/icons/sinal-de-aviso-red.png" style="width: 18px;"></b>
                        </p>
                        <p>
                            Estabelecimento: <b>Girafas</b>
                        </p>
                        <h6>
                            Data do problema: <b>10/01/2023</b>
                        </h6>
                    </div>
            `
        }
    }
}