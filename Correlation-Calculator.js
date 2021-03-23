$(function() {


  $("#Solve").on("click", Solve);
  $("#Clear").on("click", Clear);

  /* Add a new row to the table*/
  function AddRow() {
    var row = "<tr>  <td></td>  <td class='X'></td> <td class='Y'></td> <td class='x'></td> <td class='y'></td>  <td class='xsqr'></td>  <td class='ysqr'></td> <td class='xy'></td> </tr>";
    $("#table1 tbody").append(row);
  }

  function DelRow() {
    $("tbody tr:last").remove();
  }

  function Clear() {
    $(":input").val("");
    $(".X,.Y,.x,.y,.xsqr,.ysqr,.xy,#sumOfX,#sumOfY,#sumOfx,#sumOfy,#sumOfxsqr,#sumOfysqr,#sumOfxy,#meanOfX,#meanOfY,#R,#PE,#UL_LL,#sig").text("");
  }

  function getSum(total, num) {
    return +((total + num).toFixed(2));
  }

  function Solve() {
    /* Gets all input values as numbers
    in an array & also remove(filter) any whitespace characters from the arrays*/
    var X = $("#X-values").val().split(" ");
    X = X.filter(function(i) {
      return i;
    }).map(Number);
    var Y = $("#Y-values").val().split(" ");
    Y = Y.filter(function(i) {
      return i;
    }).map(Number);

    /* Calculating N based on length of
                   array X (X's number of items)*/
    var N = X.length;

    /* Adding or removing rows based on N*/
    var rowcount = $('#table1 tbody tr:last').index() + 1;
    if (N > rowcount) {
      for (i = rowcount; i < N; i++) {
        AddRow();
      }
    } else if (N < rowcount) {
      for (i = rowcount; i > N; i--) {
        DelRow();
      }
    }



    /*Using for loop to output array values to
     corresponding table datas based on
     index number(eq)*/

    for (i = 0; i < N; i++) {
      $(".X:eq(" + i + ")").text(X[i]);
      $(".Y:eq(" + i + ")").text(Y[i]);
    }

    

    /* adds all numbers of array and outputs
         them in summation box*/
    var sumOfX = X.reduce(getSum, 0);
    $("#sumOfX").text(sumOfX);

    var sumOfY = Y.reduce(getSum, 0);
    $("#sumOfY").text(sumOfY);

    /* Calculating mean of X & Y and
            outputting them*/
    var meanOfX = +((sumOfX / N).toFixed(2));
    var meanOfY = +((sumOfY / N).toFixed(2));



    $("#meanOfX").text(meanOfX);
    $("#meanOfY").text(meanOfY);

    /* making arrays for x,y,xsqr,ysqr,x*y
       and pushing calculations into the arrays
       using a for loop*/
    var x = [], y = [], xsqr = [], ysqr = [], xy = [];
    for (i = 0; i < N; i++) {
      x.push(+((X[i] - meanOfX).toFixed(2)));
      y.push(+((Y[i] - meanOfY).toFixed(2)));
      xsqr.push(+((x[i] * x[i]).toFixed(2)));
      ysqr.push(+((y[i] * y[i]).toFixed(2)));
      xy.push(+((x[i] * y[i]).toFixed(2)));
    }

    /*Using for loop to output array values to
    corresponding table datas based on
    index number(eq)*/
    /* This is so smart*/
    for (i = 0; i < N; i++) {
      $(".x:eq(" + i + ")").text(x[i]);
      $(".y:eq(" + i + ")").text(y[i]);
      $(".xsqr:eq(" + i + ")").text(xsqr[i]);
      $(".ysqr:eq(" + i + ")").text(ysqr[i]);
      $(".xy:eq(" + i + ")").text(xy[i]);
    }


    var sumOfx = x.reduce(getSum, 0);
    $("#sumOfx").text(sumOfx);


    var sumOfy = y.reduce(getSum, 0);
    $("#sumOfy").text(sumOfy);

    var sumOfxsqr = xsqr.reduce(getSum, 0);
    $("#sumOfxsqr").text(sumOfxsqr);

    var sumOfysqr = ysqr.reduce(getSum, 0);
    $("#sumOfysqr").text(sumOfysqr);

    var sumOfxy = xy.reduce(getSum, 0);
    $("#sumOfxy").text(sumOfxy);

    var r = +(((sumOfxy / (Math.sqrt(sumOfxsqr * sumOfysqr)))).toFixed(4));
    $("#R").text(r);

    var PE = +(((0.6745 * ((1 - (r * r)) / (Math.sqrt(N))))).toFixed(4));
    $("#PE").text(PE);


    var UL = +((r + PE).toFixed(4));
    var LL = +((r - PE).toFixed(4));

    $("#UL_LL").text((UL) + " / " + (LL));


    var times = r / PE;

    if (times > 6) {
      $("#sig").text("Significant");
    } else {
      $("#sig").text("In-Significant");
    }
    
  }

});
