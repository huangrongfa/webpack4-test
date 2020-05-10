// function demo() {
//   console.log('hello webapck')
// }
// demo()


// test()
// function test() {
//   for (var i = 0; i < 5; i++) {
//     console.log(i)
//   }
// }

import moment from 'moment'
let times = moment().format()
console.log(times)         

require('../src/reset.css')
require('../src/common.less')


setTimeout(() => {
  console.log('isok....')
}, 3000)

$('h1').mouseover(function() {
  $(this).css({
    'color': 'red'
  })
}).mouseout(function() {
  $(this).css({
    'color': '#000'
  })
})






