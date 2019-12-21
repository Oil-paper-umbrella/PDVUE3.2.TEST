function read(content) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(content)
        }, 2000)
    })
}

let result = Promise.all([read(1), read(2)]);
result.then((data) => {
    console.log(data) //[ 1, 2 ]
})




