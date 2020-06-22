let admin = new Vue({
  el: "#admin",
  data: {},
  methods: {},
  created: function () {
    let days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    function sort(array) {
      let sortedDays = [];
      let sortedSales = [];
      let pos = new Date().getDay();
      for (let i = 0; i < pos; i++) {
        sortedDays.push(days[i]);
        sortedSales.push(array[i].sales);
      }
      sortedDays.push(days[pos]);
      sortedSales.push(array[pos].sales);
      for (let i = 6; i > pos; i--) {
        sortedDays.unshift(days[i]);
        sortedSales.unshift(array[i].sales);
      }
      return { sortedDays, sortedSales };
    }
    let sales = [
      {
        day: "Dimanche",
        sales: 0,
      },
      {
        day: "Lundi",
        sales: 0,
      },
      {
        day: "Mardi",
        sales: 0,
      },
      {
        day: "Mercredi",
        sales: 0,
      },
      {
        day: "Jeudi",
        sales: 0,
      },
      {
        day: "Vendredi",
        sales: 0,
      },
      {
        day: "Samedi",
        sales: 0,
      },
    ];
    let orders = [
      {
        day: "Dimanche",
        sales: 0,
      },
      {
        day: "Lundi",
        sales: 0,
      },
      {
        day: "Mardi",
        sales: 0,
      },
      {
        day: "Mercredi",
        sales: 0,
      },
      {
        day: "Jeudi",
        sales: 0,
      },
      {
        day: "Vendredi",
        sales: 0,
      },
      {
        day: "Samedi",
        sales: 0,
      },
    ];
    fetch("/getDashInfo")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        for (let sale of data.lastOrders) {
          let day = parseInt(new Date(sale.createdAt).getDay());
          sales[
            sales
              .map(function (e) {
                return e.day;
              })
              .indexOf(days[day])
          ].sales += sale.Products.length;
        }
        let allSales = document.getElementById("allSales").getContext("2d");
        let allSalesChart = new Chart(allSales, {
          type: "doughnut",
          data: {
            labels: sort(sales).sortedDays,
            datasets: [
              {
                label: "Commandes",
                backgroundColor: [
                  "rgba(255, 99, 132, 0.8)",
                  "rgba(54, 162, 235, 0.8)",
                  "rgba(255, 206, 86, 0.8)",
                  "rgba(75, 192, 192, 0.8)",
                  "rgba(153, 102, 255, 0.8)",
                  "rgba(255, 159, 64, 0.8)",
                  "rgba(231, 76, 60, 0.8)",
                ],
                borderColor: "rgb(255, 99, 132)",
                data: sort(sales).sortedSales,
              },
            ],
          },
        });
        for (let sale of data.lastOrders) {
          let day = parseInt(new Date(sale.createdAt).getDay());
          for (let product of sale.Products) {
            orders[
              orders
                .map(function (e) {
                  return e.day;
                })
                .indexOf(days[day])
            ].sales += product.price - product.price * (product.discount / 100);
          }
        }
        let allMembers = document.getElementById("allMembers").getContext("2d");
        let allMembersChart = new Chart(allMembers, {
          type: "doughnut",
          data: {
            labels: sort(orders).sortedDays,
            datasets: [
              {
                label: "Commandes",
                backgroundColor: [
                  "rgba(255, 99, 132, 0.8)",
                  "rgba(54, 162, 235, 0.8)",
                  "rgba(255, 206, 86, 0.8)",
                  "rgba(75, 192, 192, 0.8)",
                  "rgba(153, 102, 255, 0.8)",
                  "rgba(255, 159, 64, 0.8)",
                  "rgba(231, 76, 60, 0.8)",
                ],
                borderColor: "rgb(255, 99, 132)",
                data: sort(orders).sortedSales,
              },
            ],
          },
        });
        let totalSales = document.querySelector("#totalSales");
        let totalSalesValue = 0;
        let totalSalesArray = sort(sales).sortedSales;
        for (let saleValue of totalSalesArray) {
          totalSalesValue += saleValue;
        }
        totalSales.innerHTML = `Total : ${totalSalesValue} ventes`;
        let totalMoney = document.querySelector("#totalMoney");
        let totalMoneyValue = 0;
        let totalMoneyArray = sort(orders).sortedSales;
        for (let moneyValue of totalMoneyArray) {
          totalMoneyValue += moneyValue;
        }
        totalMoney.innerHTML = `Total : ${totalMoneyValue.toFixed(2)} €`;

        let totalOfAllSales = 0;
        for (let sales of data.allSales) {
          totalOfAllSales += sales.Products.length;
        }

        let totalOfAllMoney = 0;
        for (let sales of data.allSales) {
          for (let product of sales.Products) {
            totalOfAllMoney +=
              product.price - product.price * (product.discount / 100);
          }
        }

        document.querySelector(
          "#salesTotal"
        ).innerHTML = `Total des ventes : ${totalOfAllSales} ventes`;
        document.querySelector(
          "#moneyTotal"
        ).innerHTML = `Total des recettes : ${totalOfAllMoney.toFixed(2)} €`;
      });
  },
});
