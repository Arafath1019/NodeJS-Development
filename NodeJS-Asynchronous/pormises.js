const add = (a, b) =>{
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            resolve(a + b);
        }, 2000);
    })
};

// Nested Promise
add(1, 2).then((result) => {
    console.log(result);

    add(result, 5).then((result2) =>{
        console.log(result2);
    }).catch((err) =>{
        console.log(err); 
    })
}).catch((err) => {
    console.log(err)
});

// Promise chaining

add(1, 2).then((sum) =>{
    console.log(sum);
    return add(sum, 5);
}).then((sum2) =>{
    console.log(sum2);
}).catch((error) =>{
    console.log(error);
})