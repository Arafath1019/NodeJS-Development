const add = (a, b) =>{
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            resolve(a + b);
        }, 2000);
    })
};

const doWork = async () =>{
    const sum1 = await add(1,2);
    const sum2 = await add(sum1, 5);
    return sum2;
};

doWork().then((result) =>{
    console.log(result);
}).catch((error) =>{
    console.log(error);
})