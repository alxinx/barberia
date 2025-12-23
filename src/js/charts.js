document.addEventListener("DOMContentLoaded", () => {

window.dataSet = [
                [1074000, 1750000, 1620000, 900000],
                [1195000, 939000, 1655000, 1672000],
                [2118000, 779000, 2762000, 3156000]
                ]
  console.log("dataset:", window.dataSet);

  const chart = new ApexCharts(
    document.querySelector("#chart"),
    {
      series: [
        { name: "Manila", data: window.dataSet[0] },
        { name: "Monterrey", data: window.dataSet[1] },
        { name: "Provenza", data: window.dataSet[2] },
      ],
      chart: { type: "area", height: 350 }
    }
  );

  chart.render();
});
