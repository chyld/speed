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
//            ['vx', car.virtualX],
//            ['vy', car.virtualY],
//            ['ox', game.originX],
//            ['oy', game.originY]
//            ]);



//   function debug(telemetry){
//     dbg_context.setTransform(1, 0, 0, 1, 0, 0);
//     dbg_context.fillStyle = '#000000';
//     dbg_context.fillRect(0, 0, dbg_canvas.width, dbg_canvas.height);

//     dbg_context.font = "13px Courier New";
//     dbg_context.fillStyle = '#00ff00';
//     dbg_context.textBaseline = 'top';

//     for(var i = 0; i < telemetry.length; i++)
//       dbg_context.fillText(telemetry[i][0] + ' : ' + telemetry[i][1], 10, 10 + (i*13));
//   }

