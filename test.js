setTimeout(function(){
    console.log(4)
}, 0)

new Promise(function(resolve){
    console.log(1)
    for(let i = 0; i < 10000; i++){
        i===9999 && resolve()
    }
    // setTimeout(function(){
    //     resolve()
    // })
    console.log(2)
}).then(function () {
    console.log(5)
})
console.log(3)


// for(var i=0; i<5; i++){
//     setTimeout(() => {
//         console.log(i)
//     })
// }


// var x = 30
// function test() {
//     console.log(x)
//     var x = 10
//     console.log(x)
//     x = 20
//     function x(){}
//     console.log(x)
// }
// test()


// class Foo {
//     constructor(name){
//         this.name = name
//     }
//     greet() {
//         console.log('hello, this is', this.name)
//     }
//     someThingAsync(){
//         return Promise.resolve()
//     }
//     asynGreet() {
//         this.someThingAsync().then(this.greet.bind(this))
//     }
// }
//
// new Foo('dog').asynGreet()