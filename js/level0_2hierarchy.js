(function(){
  $.getJSON("../json4.json", function(data1){
    var data = data1[0];  // data can itself be an object
    var axes = data.Axes;
    var axis = axes.Axis;
    var axis0 = axis[0],
    axis1 = axis[1];
    var axis0Tuples = axis0.Tuples,   // tuples may not be present in final object
        axis1Tuples = axis1.Tuples;
    var axis0Tuple = axis0Tuples.Tuple,
        axis1Tuple = axis1Tuples.Tuple;

/* ********************************** Axis0 Hierarchical Structure **************************************** */

    var captions = [];
    var obj={};
    var flag = false;
    var count = 0;

    for (var axis0HierLevel = 0, axis0HierLen = axis0Tuple[0].Member.length ; axis0HierLevel < axis0HierLen; axis0HierLevel++) {
      captions = [];
      obj={};
      flag = false;
      count = 0;
    for (var axis0TupleIndex in axis0Tuple){
        if(!flag){
          flag = true;
      //    console.log("hi");
          obj.caption = axis0Tuple[0].Member[axis0HierLevel].Caption;
          obj.colspan = count;
          captions.push(obj);
        }

        // Member may be member ********

        if(obj.caption !== axis0Tuple[axis0TupleIndex].Member[axis0HierLevel].Caption){
          if (obj.caption){obj = {};}
          obj.caption = axis0Tuple[axis0TupleIndex].Member[axis0HierLevel].Caption;
          count= 1;
          obj.colspan = count;
          captions.push(obj);
        //  obj={};
        }
        else {
            count++;
            for (var captionIndex in captions){
              if (captions[captionIndex].caption == axis0Tuple[axis0TupleIndex].Member[axis0HierLevel].Caption){
                captions[captionIndex].colspan = count;
              }
            }
        }
      //  console.log(count);
      }
    //  console.log(count);
    //  console.log(captions);
      var template0 = $.trim($("#axis0_insersion").html()),
      frag0='<tr>';
        for(var axis1MemberIndex=0, axis1MemberLen = axis1Tuple[0].Member.length; axis1MemberIndex < axis1MemberLen; axis1MemberIndex++){
          frag0 += '<th></th>';
        }
      $.each(captions, function(index,obj){
        if (index < captions.length-1){
       frag0 += template0.replace(/{{axis0}}/ig, "<th colspan="+parseInt(obj.colspan)+">"+obj.caption+"</th>");
      }
      else {
       frag0 += template0.replace(/{{axis0}}/ig, "<th colspan="+parseInt(obj.colspan)+">"+obj.caption+"</th></tr>");
      }
      });
      $('#dataTableBody').append(frag0);
    }

/* ********************************** Axis1 Hierarchical Structure **************************************** */


      var cellData = data.CellData,
           cells = cellData.Cell,
           val = [];
      for (var cellIndex in cells) {
       var valObj = {};
       valObj.value = cells[cellIndex].FmtValue;
       val.push(valObj);
      }

      count  = 0;
      var dataArray = [];
      for (var j = 0, len1 = axis1Tuple.length; j < len1; j++) {
      td='';
      var axis1Member = axis1Tuple[j].Member;
      var axis1Name = '';
      for(var memIndex1 in axis1Member){
        axis1Name = axis1Name+axis1Member[memIndex1].Caption+".";
      }
      var tempDataObj = {};
      for (var i = 0, len = axis0Tuple.length; i < len; i++) {
        console.log(val[count].value);
        td += "<td>"+val[count].value+"</td>";
        count++;
      }
      tempDataObj.td = td;
      dataArray.push(tempDataObj);
      }
      console.log(dataArray);


      var captionsArray = [];
    for (var axis1HierLevel = 0, axis1HierLen = axis1Tuple[0].Member.length ; axis1HierLevel < axis1HierLen; axis1HierLevel++) {
      captions = [];
      obj={};
      flag = false;
      count = 0;
    for (var axis1TupleIndex in axis1Tuple){
        if(!flag){
          flag = true;
      //    console.log("hi");
          obj.caption = axis1Tuple[0].Member[axis1HierLevel].Caption;
          obj.colspan = count;
          captions.push(obj);
        }
        if(obj.caption !== axis1Tuple[axis1TupleIndex].Member[axis1HierLevel].Caption){
          if (obj.caption){obj = {};}
          obj.caption = axis1Tuple[axis1TupleIndex].Member[axis1HierLevel].Caption;
          count= 1;
          obj.colspan = count;
          captions.push(obj);
          //obj={};
        }
        else {
            count++;
            for (var caption1Index in captions){
              if (captions[caption1Index].caption == axis1Tuple[axis1TupleIndex].Member[axis1HierLevel].Caption){
                captions[caption1Index].colspan = count;
              }
            }
        }
      }
      console.log(captions);
      captionsArray.push(captions);
    }
    console.log(captionsArray);
  if ($.find("#tobeAppendend").length == 0){
        console.log("hello");
      var template1 = $.trim($("#axis1_insersion").html()),
      frag1=  '';
      var captionsArrayIndex = 0;
      var prevColspan = 0;
      $.each(captionsArray[captionsArrayIndex], function(index,obj){
        console.log(prevColspan);
         frag1 = template1.replace(/{{axis1}}/ig, "<tr id='tobeAppendend'><th rowspan="+obj.colspan+">"+obj.caption+"</th></tr>");
         //alert("ok1");
         $('#dataTableBody').append(frag1);
        for(var rowIndex=0; rowIndex < obj.colspan; rowIndex++){
          //alert("ok2");
          console.log(rowIndex+(index*parseInt(prevColspan)));
          console.log(dataArray[rowIndex+(index*parseInt(prevColspan))].td);
            if (parseInt(rowIndex) === 0){
             $("#tobeAppendend:last-child").append("<th rowspan="+captionsArray[captionsArrayIndex+1][rowIndex+(index*parseInt(prevColspan))].colspan+">"+captionsArray[captionsArrayIndex+1][rowIndex+(index*parseInt(prevColspan))].caption+"</th>"+dataArray[rowIndex+(index*parseInt(prevColspan))].td);
           }
           else{
               $("#dataTableBody").append("<tr><th rowspan="+captionsArray[captionsArrayIndex+1][rowIndex+(index*parseInt(prevColspan))].colspan+">"+captionsArray[captionsArrayIndex+1][rowIndex+(index*parseInt(prevColspan))].caption+"</th>"+dataArray[rowIndex+(index*parseInt(prevColspan))].td+"</tr>");
           }
        }
      //  $('#dataTableBody').append(frag1);
      prevColspan += obj.colspan;
      });

      }

  });
})();
