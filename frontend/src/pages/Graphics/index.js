import React, { useEffect } from 'react';

import './styles.css';

import CanvasJS from '../../assets/canvasjs/canvasjs.min'
import api from '../../services/api'

import Header from '../shared/Header';


export default function Graphics(){

    const usuarioId = localStorage.getItem('usuarioId');

    function showGraph(dptsHdl, dptsLdl) {
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

    useEffect(() => {
        var niveisHdl = [];
        var niveisLdl = [];

        api.get('exames',{
            headers: {
                Authorization: usuarioId,
            }
        }).then(response => {
            response.data.map(exame => {
                exame.dataExame = new Date(exame.dataExame);
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
    },[usuarioId]);

    //ARRUMAR DPS
    return (
        <div className="exams-container">
            <Header />     
            <div className="middle-box exams-middle-box exams-screen">
                <div className="chart-style" id="chartContainer" style={{height: 370, width: 600}}></div>
            </div>
        </div>
    )
}