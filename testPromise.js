function createPromise(time) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve()
        }, time);
    });
}

let pOuter = createPromise(2000);
pOuter.then(() => {
    let p1 = createPromise(2000);
    let p2 = createPromise(3000);

    let pa = Promise.all([p1, p2]).then(() => {
        return "dandan";
    }).catch((value) => {
        console.log("AA : " + value);
    });
    return pa;
}).then((value) => {
    console.log("BB : " + value);
});

