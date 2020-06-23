"use strict";

var admin = new Vue({
  el: "#admin",
  data: {},
  methods: {},
  created: function created() {
    var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    function sort(array) {
      var sortedDays = [];
      var sortedSales = [];
      var pos = new Date().getDay();

      for (var i = 0; i < pos; i++) {
        sortedDays.push(days[i]);
        sortedSales.push(array[i].sales);
      }

      sortedDays.push(days[pos]);
      sortedSales.push(array[pos].sales);

      for (var _i = 6; _i > pos; _i--) {
        sortedDays.unshift(days[_i]);
        sortedSales.unshift(array[_i].sales);
      }

      return {
        sortedDays: sortedDays,
        sortedSales: sortedSales
      };
    }

    var sales = [{
      day: "Dimanche",
      sales: 0
    }, {
      day: "Lundi",
      sales: 0
    }, {
      day: "Mardi",
      sales: 0
    }, {
      day: "Mercredi",
      sales: 0
    }, {
      day: "Jeudi",
      sales: 0
    }, {
      day: "Vendredi",
      sales: 0
    }, {
      day: "Samedi",
      sales: 0
    }];
    var orders = [{
      day: "Dimanche",
      sales: 0
    }, {
      day: "Lundi",
      sales: 0
    }, {
      day: "Mardi",
      sales: 0
    }, {
      day: "Mercredi",
      sales: 0
    }, {
      day: "Jeudi",
      sales: 0
    }, {
      day: "Vendredi",
      sales: 0
    }, {
      day: "Samedi",
      sales: 0
    }];
    fetch("/getDashInfo").then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.lastOrders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var sale = _step.value;
          var day = parseInt(new Date(sale.createdAt).getDay());
          sales[sales.map(function (e) {
            return e.day;
          }).indexOf(days[day])].sales += sale.Products.length;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var allSales = document.getElementById("allSales").getContext("2d");
      var allSalesChart = new Chart(allSales, {
        type: "doughnut",
        data: {
          labels: sort(sales).sortedDays,
          datasets: [{
            label: "Commandes",
            backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)", "rgba(75, 192, 192, 0.8)", "rgba(153, 102, 255, 0.8)", "rgba(255, 159, 64, 0.8)", "rgba(231, 76, 60, 0.8)"],
            borderColor: "rgb(255, 99, 132)",
            data: sort(sales).sortedSales
          }]
        }
      });
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data.lastOrders[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _sale = _step2.value;

          var _day = parseInt(new Date(_sale.createdAt).getDay());

          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = _sale.Products[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var product = _step7.value;
              orders[orders.map(function (e) {
                return e.day;
              }).indexOf(days[_day])].sales += product.price - product.price * (product.discount / 100);
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                _iterator7["return"]();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var allMembers = document.getElementById("allMembers").getContext("2d");
      var allMembersChart = new Chart(allMembers, {
        type: "doughnut",
        data: {
          labels: sort(orders).sortedDays,
          datasets: [{
            label: "Commandes",
            backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)", "rgba(75, 192, 192, 0.8)", "rgba(153, 102, 255, 0.8)", "rgba(255, 159, 64, 0.8)", "rgba(231, 76, 60, 0.8)"],
            borderColor: "rgb(255, 99, 132)",
            data: sort(orders).sortedSales
          }]
        }
      });
      var totalSales = document.querySelector("#totalSales");
      var totalSalesValue = 0;
      var totalSalesArray = sort(sales).sortedSales;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = totalSalesArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var saleValue = _step3.value;
          totalSalesValue += saleValue;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      totalSales.innerHTML = "Total : ".concat(totalSalesValue, " ventes");
      var totalMoney = document.querySelector("#totalMoney");
      var totalMoneyValue = 0;
      var totalMoneyArray = sort(orders).sortedSales;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = totalMoneyArray[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var moneyValue = _step4.value;
          totalMoneyValue += moneyValue;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      totalMoney.innerHTML = "Total : ".concat(totalMoneyValue.toFixed(2), " \u20AC");
      var totalOfAllSales = 0;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = data.allSales[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _sales = _step5.value;
          totalOfAllSales += _sales.Products.length;
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var totalOfAllMoney = 0;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = data.allSales[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _sales2 = _step6.value;
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = _sales2.Products[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var _product = _step8.value;
              totalOfAllMoney += _product.price - _product.price * (_product.discount / 100);
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                _iterator8["return"]();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      document.querySelector("#salesTotal").innerHTML = "Total des ventes : ".concat(totalOfAllSales, " ventes");
      document.querySelector("#moneyTotal").innerHTML = "Total des recettes : ".concat(totalOfAllMoney.toFixed(2), " \u20AC");
    });
  }
});