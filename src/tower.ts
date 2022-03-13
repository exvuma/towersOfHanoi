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
const gameState: GameState = {
    size: 7,
    poles: [
        [0, 3],
        [1, 2, 4],
        [5, 6],
    ]
}
document.addEventListener('DOMContentLoaded', _e => {
    changeState(gameState1)
})


function move(state: GameState, target: number, destination: number): GameState {
    let poles: GameState['poles'] = [[11], [22], [33]]// fake array
    let polesM: GameState['poles'] = poles
    state.poles.forEach((p, i) => {
        // const poles: GameState['poles'] = [...state.poles.map((p) => {
        polesM[i] = p.reverse()
    })
    // const poles: GameState['poles'] = state.poles.reduce((p, _cur, _curIndex, _arr) => {
    //     // const poles: GameState['poles'] = [...state.poles.map((p) => {
    //     console.log("sds", p)
    //     return [1]////p.reverse()
    //     // return [...p].reverse()
    // })

    const targetDisc = poles[target].pop()

    if (!targetDisc) {
        throw new Error(`Cannot use this pole target ${target}`)
    }

    poles[destination].push(targetDisc)

    return {
        ...state,
        poles,
    }
}

type GameState = {
    size: number,
    poles: [
        number[],
        number[],
        number[],
    ]
}
// <div class="disc disc-n-${pole.map((disc) => pole[disc])}"></div>
function renderGame(state: GameState): string {
    // state = moveSmally(gameState1)
    return `<div class="poles poles-n-${state.size}">
        ${state.poles.map(pole => renderPole(pole)).join('\n')}
    </div>`
}

function renderPole(pole: number[]): string {
    console.log(pole)
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

const moveChildren = (_n: number) => {

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

        s1.pop()
        s2.push(child)

    }
    if (s1[0] > s3[0]) {
        if (s3[3] === 0) {
            s3.pop()
        }

        // s3.push(s1.pop())

    }
    return "balh"

}
// console.log(moveChildren(3));
function moveTriPod(_gameState: GameState, fromPole: number, _newPole: number): GameState {
    //TODO check where tripod exists
    // assuming tripod at pole 1...
    let i = 0;
    for (i = 0; i < 0; i++) {

    }
    const newFromPole = gameState1.poles[fromPole]//.pop().pop().pop()
    // newPole = 
    let newPoles: [number[], number[], number[]] = [[], [], []]

    newPoles[fromPole] = newFromPole
    return {
        size: 7,
        poles: newPoles
    }
}
function moveSmally(gameState: GameState, fromPole: number = 0, newPole: number = 2): GameState {
    let newPoles: [number[], number[], number[]] = [[], [], []]
    let newGameState: GameState = { ...gameState, poles: [...gameState.poles] }
    newGameState.poles[fromPole] = newGameState.poles[fromPole].slice(0, 2)
    newGameState.poles[newPole] = newGameState.poles[newPole].slice(0, 2)
    console.log(
        'smalls has landed', newGameState
    )
    return newGameState
}
function changeState(newGameState: GameState) {
    renderToDOM(renderGame(newGameState))
}


console.log(s3)
// changeState(move(gameState1, 1, 2))
