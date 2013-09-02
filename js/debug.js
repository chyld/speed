//     debug([['lx', car.linearX],
//            ['dx', car.deltaLinearX],
//            ['ly', car.linearY],
//            ['dy', car.deltaLinearY],
//            ['th', car.theta],
//            ['dt', car.deltaTheta],
//            ['ra', car.radius],
//            ['di', car.diameter],
//            ['wi', car.width()],
//            ['he', car.height()],
//            ['ax', car.angularX()],
//            ['ay', car.angularY()],
//            ['cx', car.x()],
//            ['cy', car.y()],
//            ['ox', this.dimensions.originX],
//            ['oy', this.dimensions.originY]
//            ]);



// function debug(telemetry){
//   spd.dbg_context.setTransform(1, 0, 0, 1, 0, 0);
//   spd.dbg_context.fillStyle = '#000000';
//   spd.dbg_context.fillRect(0, 0, spd.dbg_canvas.width, spd.dbg_canvas.height);

//   spd.dbg_context.font = "13px Courier New";
//   spd.dbg_context.fillStyle = '#00ff00';
//   spd.dbg_context.textBaseline = 'top';

//   for(var i = 0; i < telemetry.length; i++)
//     spd.dbg_context.fillText(telemetry[i][0] + ' : ' + telemetry[i][1], 10, 10 + (i*13));
// }
