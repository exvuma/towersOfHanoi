let s1 = [1, 2, 3, 4]
let s2: Array<number> = []
let s3: Array<number> = []
// let s2 = [0, 0, 0, 0]
// let s3 = [0, 0, 0, 0]
const gameState1: GameState = {
    size: 7,
    poles: [
        [0, 3],
        [1, 2, 4],
        [5, 6],
    ]
}

const printAllArrays = (whenStr: string = "default") => {
    console.log(whenStr)
    console.log("s1", s1)
    console.log("s2", s2)
    console.log("s3", s3)
}

document.addEventListener('DOMContentLoaded', e => {
    renderToDOM(renderGame(gameState1))
})




type GameState = {
    q
    size: number,
    poles: [
        number[],
        number[],
        number[],
    ]
}
// <div class="disc disc-n-${pole.map((disc) => pole[disc])}"></div>
function renderGame(state: GameState): string {
    return `<div class="poles poles-n-${state.size}">
        ${state.poles.map(pole => renderPole(pole)).join('\n')}
    </div>`
}

function renderPole(pole: number[]): string {
    return `<div class="pole">
        ${pole.reverse().map(disc => renderDisc(disc)).join('\n')}
    </div>`
}

function renderDisc(disc: number): string {
    return `<div class="disc disc-n-${disc}"></div>`
}

function renderToDOM(html: string) {
    document.body.innerHTML = html
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
