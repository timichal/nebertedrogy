"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var spreadsheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGvkeGjFDsFmY6D4WW0FKXq-Q45x-gdFe4A70m1uudmDsm4Vd_rkp3XxfDiqRrGkDgC0z19MWkwpsL/pubhtml";

function procSheet(page) {
  var data = {};
  data.lide = [];
  data.inst = [];
  var rows = page.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  for (var i = 2; i < rows.length; i++) {
    var row = rows[i].getElementsByTagName("td");

    if (row[4].textContent === "A") {
      var rowProcessed = [];
      rowProcessed.push(row[1].textContent, row[2].textContent, row[3].textContent);
      if (rowProcessed[0] === "sebe") data.lide.push([rowProcessed[1], rowProcessed[2]]);
      if (rowProcessed[0] === "instituci") data.inst.push([rowProcessed[1], rowProcessed[2]]);
    }
  }

  function addToTable(arrName) {
    var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var div = document.getElementById("sig-".concat(arrName));
    data[arrName].forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          col1 = _ref2[0],
          col2 = _ref2[1];

      var row1 = document.createElement("div");
      row1.className = "signature-name";
      row1.innerText = reverse ? col2 : col1;
      var row2 = document.createElement("div");
      row2.className = "signature-occup";
      row2.innerText = reverse ? col1 : col2;
      var signature = document.createElement("div");
      signature.className = "signature";
      signature.appendChild(row1);
      signature.appendChild(row2);
      div.appendChild(signature);
    });
  }

  addToTable("lide");
  addToTable("inst", true);
}

var xhr = new XMLHttpRequest();
xhr.open("GET", spreadsheet);

xhr.onload = function () {
  return procSheet(xhr.response);
};

xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.responseType = "document";
xhr.send();
