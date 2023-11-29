// var Service = require('node-windows').Service;

// // Create a new service object
// var svc = new Service({
//   name:'Hello World',
//   description: 'The nodejs.org example web server.',
//   script: 'C:\\path\\to\\helloworld.js',
//   nodeOptions: [
//     '--harmony',
//     '--max_old_space_size=4096'
//   ]
//   //, workingDirectory: '...'
//   //, allowServiceLogon: true
// });

// // Listen for the "install" event, which indicates the
// // process is available as a service.
// svc.on('install',function(){
//   svc.start();
// });

// svc.install();

// const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi
// const prevRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
// const email = "hhuahsudas.asnduawondo@dasd.weq"

// const isValidEmail = emailRegex.test(email);
// const prev = prevRegex.test(email);

// console.log(isValidEmail)
// console.log(prev)

const email = "beyond.-1209@godshipmail.cunt"

const oldRegex = new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g)
const oldValidation = oldRegex.test(email)


const reg2 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi
const newValidation = reg2.test(email)


console.log('old:',oldValidation, 'new:', newValidation)