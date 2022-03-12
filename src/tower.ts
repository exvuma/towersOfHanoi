let s1 = [1, 2, 3, 4]
let s2: Array<number> = []
let s3: Array<number> = []
// let s2 = [0, 0, 0, 0]
// let s3 = [0, 0, 0, 0]

const printAllArrays = (whenStr: string = "default") => {
    console.log(whenStr)
    console.log("s1", s1)
    console.log("s2", s2)
    console.log("s3", s3)
}

const moveChildren = (n: number) => {

    //not logic, just type safety bullshit 
    const child = s1[3]
    const child2 = s2[3]
    if (typeof (child) !== "number") {
        return ''
    }
    if (typeof (child2) !== "number") {
        return ''
    }

    if (s1[0] > s2[0]) {
        printAllArrays('prepop')

        s1.pop()
        s2.push(child)
        printAllArrays('post pop ')

    }
    if (s1[0] > s3[0]) {
        if (s3[3] === 0) {
            s3.pop()
        }

        // s3.push(s1.pop())

    }
    return "balh"

}
console.log(moveChildren(3));
console.log(s3)
printAllArrays
