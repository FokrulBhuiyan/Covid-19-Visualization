import React, { useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
// eslint-disable-next-line
import {Line, Bar } from 'react-chartjs-2';
// eslint-disable-next-line
import styles from './Chart.module.css'

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        
        fetchAPI();
    },[]);
    const lineChart = (
        dailyData.length 
        ? (
            <Line 
                data={{
                    labels: dailyData.map(({date}) => date),
                    datasets:[{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'deaths',
                        borderColor: '#red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }],
                }}
            />) : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: ['Infacted', 'Recovered', 'deaths' ],
                    datasets: [{
                        label: 'people',
                        backgroundColor: ['rgba(29, 29, 201, 0.5)','rgba(0, 255, 0, 0.5)','rgba(255, 59, 59, 0.5)'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false },
                    
                }}
            />
        ): null
    );

    return(
        <div className={styles.container}>
            {country? barChart: lineChart}
            
        </div>
    )
}

export default Chart;

