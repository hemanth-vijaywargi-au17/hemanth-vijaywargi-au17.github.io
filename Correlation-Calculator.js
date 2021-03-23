$(function(){
	
    $("#AddRow").on("click",AddRow);
    $("#DelRow").on("click",DelRow);
    $("#Solve").on("click",Solve);
    $("#Clear").on("click",Clear);

/* Add a new row by cloning last row and
        emptying it's input values and table data values*/
    function AddRow(){
      	var clone = $("tbody tr:last").clone(true);
      	$("tbody").append(clone);
      	$("tbody tr:last").find("input").val("");
      	$("tbody tr:last>td:gt(2)").text("");
      	    }
    function DelRow(){
    	$("tbody tr:last").remove();
    }
  
   function Solve(){
   	 /* Gets all input values as numbers 
   	 /*in an array */
   	var X = $(".X").map(function(){
   		if($(this).val() !== ""){
   		return +($(this).val());
   		}}).get();
   	
   	var Y = $(".Y").map(function(){
   		if($(this).val() !== ""){
   		return +($(this).val());
   		}}).get();
   	
   	
   	
   	/* adds all numbers of array and outputs
   	/* them in summation box*/
   		var sumOfX = X.reduce(function(total,num) 
   			{ return total + num; },0 );
   		$("#sumOfX").val(sumOfX);
   		
   		var sumOfY = Y.reduce(function(total,num) 
   			{ return total + num; },0 );
   		$("#sumOfY").val(sumOfY);
   		
     /* Calculating N based on length of
   		array X (X's number of items)*/
   		var N = X.length;
   		$("#N").val(N);
   		
   /* Calculating mean of X & Y and 
   /*outputting them*/
   	var meanOfX = +((sumOfX/N).toFixed(2));
   	var meanOfY = +((sumOfY/N).toFixed(2));
   	
   	$("#meanOfX").val(meanOfX);
   	$("#meanOfY").val(meanOfY);
   	
   /* making arrays for x,y,xsqr,ysqr,x*y 
   /*and pushing calculations into the arrays
   /*using a for loop*/	
   	var x = X.map(function(num){
   return +((num - meanOfX).toFixed(2));});
      
      var y = [];
   for(i=0;i<Y.length;i++)
   {y.push(+((Y[i] - meanOfY).toFixed(2)));}
   
      var xsqr = [];
    for(i=0;i<x.length;i++)
    {xsqr.push(+((x[i]*x[i]).toFixed(2)));}		
   		
       var ysqr = [];
    for(i=0;i<y.length;i++)
    {ysqr.push(+((y[i]*y[i]).toFixed(2)));}
    
       var xy = [];
     for(i=0;i<x.length;i++)
     {xy.push(+((x[i]*y[i]).toFixed(2)));}
   
   /*Using for loops to output array values to
   corresponding table datas based on 
   index number(eq)*/
   /* This is so smart*/
    for(i=0;i<X.length;i++)
    {$(".x:eq("+i+")").text(x[i]);}
    
    for(i=0;i<Y.length;i++)
    {$(".y:eq("+i+")").text(y[i]);}
   		
    for(i=0;i<x.length;i++)
    {$(".xsqr:eq("+i+")").text(xsqr[i]);}
   		
    for(i=0;i<y.length;i++)
    {$(".ysqr:eq("+i+")").text(ysqr[i]);}
    
    for(i=0;i<x.length;i++)
    {$(".xy:eq("+i+")").text(xy[i]);}
   		
   		
   var sumOfx = +((x.reduce(function(total,num) 
   { return total + num; },0 )).toFixed(2));
   $("#sumOfx").val(sumOfx);
   		
   var sumOfy = +((y.reduce(function(total,num) 
   { return total + num; },0 )).toFixed(2));
   $("#sumOfy").val(sumOfy);
   		
   var sumOfxsqr = +((xsqr.reduce(function(total,num) 
   { return total + num; },0 )).toFixed(2));
   $("#sumOfxsqr").val(sumOfxsqr);
   		
   var sumOfysqr = +((ysqr.reduce(function(total,num) 
   { return total + num; },0 )).toFixed(2));
   $("#sumOfysqr").val(sumOfysqr);
   		
   var sumOfxy = +((xy.reduce(function(total,num) 
   { return total + num; },0 )).toFixed(2));
   $("#sumOfxy").val(sumOfxy);
   		
   		
   var r = +((sumOfxy/(Math.sqrt(sumOfxsqr*sumOfysqr))).toFixed(4));	
   $("#R").val(r);	
   		
   var PE = +((0.6745*((1-(r*r))/(Math.sqrt(N)))).toFixed(4));	
   $("#PE").val(PE);
   
   var UL = +((r+PE).toFixed(4));
   var LL = +((r-PE).toFixed(4));
   
   $("#UL").val(UL);
   $("#LL").val(LL);
   	
   var times = r/PE;
   
   if(times>6)
  {$("#sig").val("Significant");}
   else	
  {$("#sig").val("In-Significant");}
   		
   }
  
   function Clear(){
  	$(":input").val("");
  	$(".x,.y,.xsqr,.ysqr,.xy").text("");
  }
    
    
    });
    
