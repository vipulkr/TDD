var getGraphKey = function(axis0) {
            var keyAxis0 = [];
            var prevKeyAxis0 = [];
          for (var key in axis0) {
            var elem = axis0[key];
            if (Object.keys(elem.children) !== 0){

            }
            if (prevKeyAxis0.length == 0)
              var keyName = axis0[key];
              keyAxis0.push(prevKeyAxis0.pop()+"."+getGraphKey(keyName.children));
          }
          for (var index in keyAxis0) {

          }
          return keyAxis0;
        };

        graphKey = getGraphKey(axis0Child);
        console.log(graphKey);
