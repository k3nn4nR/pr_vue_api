<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js'

Chart.register(BarElement, CategoryScale, LinearScale)

const canvas = ref(null)

onMounted(() => {
  new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar'],
      datasets: [{
        label: 'Ventas',
        data: [120, 190, 300],
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  })
})
</script>