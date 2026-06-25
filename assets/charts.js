(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: Revenue Trend ---
  var chartRevenue = echarts.init(document.getElementById('chart-revenue'), null, { renderer: 'svg' });

  var months = [
    '2024.10', '2024.11', '2024.12',
    '2025.1', '2025.2', '2025.3', '2025.4', '2025.5', '2025.6', '2025.7', '2025.8', '2025.9', '2025.10', '2025.11', '2025.12',
    '2026.1', '2026.2', '2026.3', '2026.4', '2026.5'
  ];

  var dataValues = [
    47, 87, 167,
    215, 410, 385, 384, 778, 1857, 2309, 4023, 2691, 2438, 2854, 4113,
    2402, 4200, 4500, 4200, 6888
  ];

  chartRevenue.setOption({
    animation: false,
    backgroundColor: 'transparent',
    grid: {
      top: 40,
      right: 30,
      bottom: 60,
      left: 60
    },
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink },
      formatter: function(params) {
        return '<strong>' + params[0].name + '</strong><br/>' +
               params[0].marker + ' 业绩: ' + params[0].value + ' 万';
      }
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: {
        color: muted,
        fontSize: 11,
        rotate: 45,
        interval: 0
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '业绩（万元）',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLine: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [{
      name: '业绩',
      type: 'line',
      data: dataValues,
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        color: accent2,
        width: 3
      },
      itemStyle: {
        color: accent2,
        borderColor: bg2,
        borderWidth: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: accent2 + '40' },
            { offset: 1, color: accent2 + '05' }
          ]
        }
      },
      label: {
        show: true,
        position: 'top',
        color: accent2,
        fontSize: 10,
        fontWeight: 600,
        formatter: function(p) {
          var highlight = [47, 778, 1857, 4023, 4113, 6888];
          if (highlight.indexOf(p.value) !== -1) {
            return p.value + '万';
          }
          return '';
        }
      }
    }]
  });

  window.addEventListener('resize', function() { chartRevenue.resize(); });
})();
