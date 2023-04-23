/*Script do gráfico de linha que indica o fluxo do giro dos produtos no mercado, por mês*/

const labels_linha_percentual_atividade = [
    '16:45',
    '16:50',
    '16:55',
    '17:00',
    '17:05',
    '17:10',
    '17:15',
    '17:20',
    '17:25',
    '17:30',
    '17:35',
    '17:40',
];

const data_linha_percentual_atividade = {
    labels: labels_linha_percentual_atividade,
    datasets: [{
        label: 'CPU',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: [0, 1, 1, 3, 6, 1, 2, 5, 10, 1, 6, 7, 5],
    },

{
    label: 'Memória',
    backgroundColor: 'rgb(102, 248, 73)',
    borderColor: 'rgb(102, 248, 73)',
    data: [11, 5, 8, 6, 2, 3, 4, 9, 1, 5, 10, 3],
},
{
    label: 'Disco',
    backgroundColor: 'rgb(249, 131, 243)',
    borderColor: 'rgb(249, 131, 243)',
    data: [3, 1, 5, 8, 2, 9, 7, 1, 2, 4, 4 , 10],
}
]
};

const config_linha_percentual_atividade = {
    type: 'line',
    data: data_linha_percentual_atividade,
    options: {}
};

const grafico_linha_fluxo_setores = new Chart(
    document.getElementById('linha_percentual_atividade'),
    config_linha_percentual_atividade
);


/*Script do gráfico de barras que indica o fluxo do giro dos produtos no mercado, por semana*/

const labels_barra_qtd_incidentes_semana = [
    'Semana 1',
    'Semana 2',
    'Semana 3',
    'Semana 4',
];

const data_barra_qtd_incidentes_semana = {
    labels: labels_barra_qtd_incidentes_semana,
    datasets: [{
        label: 'Quantidade de incidentes na semana',
        backgroundColor: '#7E8CCD',
        borderColor: '#7E8CCD',
        data: [3, 5, 2, 4],
    }
    ]
};

const config_barra_qtd_incidentes_semana = {
    type: 'bar',
    data: data_barra_qtd_incidentes_semana,
    options: {}
};

const grafico_barra_qtd_incidentes_semana = new Chart(
    document.getElementById('barra_fluxo_incidentes_semana'),
    config_barra_qtd_incidentes_semana
);