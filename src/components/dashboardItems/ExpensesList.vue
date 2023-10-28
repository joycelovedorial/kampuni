<template>
  <div class="flex">
    <div class="w-fit">
      <canvas id="myChart"></canvas>
    </div>

  <div>

  </div>
  </div>

</template>

<script>
export default {
  mounted(){
    const ctx = document.getElementById('myChart');
  

  new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Bills/Utilties', 'Groceries', 'Food', 'Transport', 'Others'],
    datasets: [{
      label: 'You Owe:',
      data: [12, 19, 3, 5, 2],
      borderWidth: 0,
      hoverBorderWidth: 2,
      hoverOffset:30,
      backgroundColor: [
        "#FF6B6B",
        "#FFAB73",
        "#FFE662",
        "#A1FFA1",
        "#A1DFFF",
      ],
      hoverBackgroundColor: [
        "#D9A1FF",
      ],
      hoverBorderColor: [
        "#FFFFFF",
      ],
      // borderRadius:15,
      circumference: 360
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    legend: {
      display: true, // Display the legend
      position: 'top', // Position options: top, bottom, left, right
      align: 'center', // Alignment within the position
      // You can also adjust the spacing between the legend and the chart using the following properties:
      // Default values:
      // margin: {top: 5, right: 5, bottom: 5, left: 5} 
      // Use the margin properties to increase or decrease the spacing.
      // For example, to increase the top margin to 20 pixels:
      margin: {top: 30, right: 5, bottom: 5, left: 5}
  }
}
  }
  )
}
};
</script>

<style>
/* .container{
  background-color:white;
  width:50%;
  height:50%
} */
</style>