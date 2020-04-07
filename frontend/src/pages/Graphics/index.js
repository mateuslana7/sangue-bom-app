import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import CanvasJS from '../../assets/canvasjs/canvasjs.min'
import api from '../../services/api'

import Header from '../shared/Header';
import swal from 'sweetalert';


export default function Graphics(){

    const usuarioId = localStorage.getItem('usuarioId');

    const history = useHistory();

    function showGraph(dptsHdl, dptsLdl) {
        if(dptsHdl.length > 0){
            let chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                exportEnabled: true,
                title: {
                    text: "Níveis de Colesterol"
                },
                axisX: {
                    title: "Datas"
                },
                axisY: {
                    title: "HDL"
                },
                axisY2: {
                    title: "LDL"
                },
                data: [{
                    type: "column",
                    name: "HDL",
                    showInLegend: true,      
                    legendMarkerColor: "#CF3537",
                    dataPoints: dptsHdl
                },
                {
                    type: "column",
                    name: "LDL",
                    axisYType: "secondary",
                    showInLegend: true,
                    legendMarkerColor: "#68322B",
                    dataPoints: dptsLdl
                }]
            });
            chart.render();
        }
        else {
            history.push('/inicio');
            swal("","Você ainda não tem exames cadastrados!","info");
        }
    }

    useEffect(() => {
        var niveisHdl = [];
        var niveisLdl = [];

        api.get('exames',{
            headers: {
                Authorization: usuarioId,
            }
        }).then(response => {
            response.data.map(exame => {
                exame.dataExame = new Date(exame.dataExame+" EDT");
                var nivelHdl = {};
                var nivelLdl = {};
                nivelHdl.label = Intl.DateTimeFormat('pt-BR').format(exame.dataExame);
                nivelLdl.label = Intl.DateTimeFormat('pt-BR').format(exame.dataExame);
                nivelHdl.y = exame.valorHdl;
                nivelLdl.y = exame.valorLdl;
                nivelHdl.color = "#CF3537";
                nivelLdl.color = "#68322B";
                niveisHdl.push(nivelHdl);
                niveisLdl.push(nivelLdl);
                return true;
            })
            showGraph(niveisHdl, niveisLdl);
        })
    },);

    //ARRUMAR DPS
    return (
        <div>
            <Header />
            <div className="app-container"> 
                <div className="tab-img tab-position-exams"><div className="tab-text">Exames</div></div>    
                <div className="middle-box middle-box-graphics exams-screen">
                    <div className="chart-style" id="chartContainer" style={{height: 370, width: 600}}></div>
                    <Link to="/inicio">
                        <button className="button-back-graphics">VOLTAR</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}