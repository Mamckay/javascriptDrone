// var nrc = require('node-run-cmd');
var cp = require('child_process');
var ls = cp.spawn('ffplay', ['-fflags', 'nobuffer', '-x', '640', '-y', '480', 'udp://192.168.10.1:11111']);

// ls.stdout.on('data', function (data) {
//     // console.log('Message: ' + data);
// });

// ls.on('close', function (code, signal) {
//     console.log('buffering udp stream data....  finished...');
// });


setTimeout(() => ls.kill(), 15000);
// nrc.run('ffplay -fflags nobuffer -x 640 -y 480 udp://192.168.10.1:11111');
