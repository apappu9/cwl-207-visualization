import React from 'react';
import Chart from 'react-google-charts';

import { formatSecondsText } from 'common/util';

const colors = {
  male: '#ef5350',
  female: '#26a69a',
};

function TotalScreentimes({ characters }) {
  // get characters and sort descending by total screentime
  characters = Object.values(characters)
    .sort(({ totalScreentime: time1, }, { totalScreentime: time2 }) => time2 - time1);
  
  const characterData = characters.map(character => ([
    character.actor,
    character.totalScreentime,
    `<div style="width: 275px; text-align: center; font-size: 14px;">` +
      `<img height="125px" style="display:block; margin: auto" src="${character.image}">` +
      `<div style="margin-top: 8px; font-weight: bold; color: #444">${character.actor}</div>` + 
      `<div style="font-size: 11px; margin-top: 2px;">(${character.name})</div>` +
      `<div style="height: 4px; background-color: ${colors[character.gender]}; margin: 7px 0"> </div>` +
      `<div style="margin-bottom: 8px; font-weight: bold; color: #444">${formatSecondsText(character.totalScreentime)}</div>` +
    `</div>`,
    colors[character.gender],
  ]));

  const maxScreentime = characters.reduce((max, current) => Math.max(current.totalScreentime, max), 0);
  const halfHour = 30 * 60;
  const ticks = [
    { v: halfHour, f: '30 minutes' },
    { v: 2 * halfHour, f: '1 hour' },
  ];
  for (let seconds = 3 * halfHour; seconds <= maxScreentime + halfHour; seconds += halfHour) {
    const hours = Math.round((seconds / 60 / 60) * 10) / 10;
    ticks.push({ v: seconds, f: `${hours} hours`});
  }

  return (
    <Chart
      chartType="ColumnChart"
      height={window.innerHeight}
      data={[
        ['Character', 'Screentime', { role: 'tooltip', p: { html: true } }, { role: 'style' }],
        ...characterData
      ]}
      options={{
        title: 'Total Screentime by Character',
        vAxis: {
            ticks,
        },
        legend: 'none',
        chartArea: {
          top: 100,
          right: 0,
          bottom: 100,
          left: 80,
          height: '100%',
          width: '100%'
        },
        fontSize: 12,
        fontName: 'Roboto',
        bar: {
          groupWidth: '55%'
        },
        titleTextStyle: {
          fontSize: 18
        },
        tooltip: {
          isHtml: true,
        },
      }}
    />
  )
}

export default TotalScreentimes;