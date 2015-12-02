(function(){
  $.getJSON("../json2.json", function(data1){
    var data = data1[0];
    var axes = data.Axes;
    var axis = axes.Axis;
    var axis0 = axis[0],
    axis1 = axis[1];
    var axis0Tuples = axis0.Tuples,
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
        if(obj.caption !== axis0Tuple[axis0TupleIndex].Member[axis0HierLevel].Caption){
          if (obj.caption){obj = {};}
          obj.caption = axis0Tuple[axis0TupleIndex].Member[axis0HierLevel].Caption;
          count= 1;
          obj.colspan = count;
          captions.push(obj);
          obj={};
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
        for(var axis1MemberIndex=0, axis1Member = axis1Tuple[0].Member.length; axis1MemberIndex < axis1Member; axis1MemberIndex++){
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
      $('body').append(frag0);
    }

/* ********************************** Axis1 Hierarchical Structure **************************************** */

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
          obj={};
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

    //  if (! ($("body").children("#dataTable").children("tr#tobeAppendend"))){
  //  console.log($.find("#tobeAppendend"));
  //    if (! document.getElementById("#tobeAppendend")){

  if ($.find("#tobeAppendend").length == 0){
        console.log("hello");
      var template1 = $.trim($("#axis1_insersion").html()),
      frag1=  '';   //'<tr><th></th>';
      $.each(captions, function(index,obj){
          if (index < captions.length-1){
         frag1 += template1.replace(/{{axis1}}/ig, "<tr id='tobeAppendend'><th rowspan="+obj.colspan+">"+obj.caption+"</th></tr>");
        }
        else {
         frag1 += template1.replace(/{{axis1}}/ig, "<tr id='tobeAppendend'><th rowspan="+obj.colspan+">"+obj.caption+"</th></tr>");
        }
        });
        $('body').append(frag1);
          console.log(document.getElementById("#tobeAppendend"));
      }
      else{
        $.each(captions, function(index,obj){
        //  var child = 1;
        $("#tobeAppendend").append("<th rowspan="+obj.colspan+">"+obj.caption+"</th>");
        //  child += parseInt(obj.colspan);
      });
      }
    }

  });
})();
/*      var axis0Names = [],
axis1Names = [];
//  console.log(axis0Tuple.length);
axis0Names.push({name: ""});
for (var index0 in axis0Tuple){
//   console.log(axis0Tuple[index0]);
var axis0Member = axis0Tuple[index0].Member;
var axis0Name = '';
for(var memIndex0 in axis0Member){
axis0Name = axis0Name+axis0Member[memIndex0].Caption+".";
}
var axis0NameObj = {};
axis0NameObj.name = axis0Name.substring(0,axis0Name.length-1);
//console.log(axis0Name);
axis0Names.push(axis0NameObj);
}

var cellData = data.CellData,
cells = cellData.Cell,
val = [];
for (var cellIndex in cells) {
var valObj = {};
valObj.value = cells[cellIndex].FmtValue;
val.push(valObj);
}

var template0 = $.trim($("#axis0_insersion").html()),
frag0='';
$.each(axis0Names, function(index,obj){
frag0 += template0.replace(/{{axis0Name}}/ig, obj.name);
});
$('body').append(frag0);

var count  = 0;

for (var j = 0, len1 = axis1Tuple.length; j < len1; j++) {
td='';
var axis1Member = axis1Tuple[j].Member;
var axis1Name = '';
for(var memIndex1 in axis1Member){
axis1Name = axis1Name+axis1Member[memIndex1].Caption+".";
}
for (var i = 0, len = axis0Tuple.length; i < len; i++) {
//    console.log(val[count].value);
td += "<td>"+val[count].value+"</td>";
count++;
}
var axis1NameObj = {};
axis1NameObj.name = axis1Name.substring(0,axis1Name.length-1);
axis1NameObj.td = td;
axis1Names.push(axis1NameObj);
}

var template1 = $.trim($("#data_insersion").html()),
frag1='';
$.each(axis1Names, function(index,obj){
frag1 += template1.replace(/{{axis1Name}}/ig, obj.name)
.replace(/{{value}}/ig, obj.td);
});
$('body').append(frag1);
});
})();*/
