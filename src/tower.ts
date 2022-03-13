let s1 = [1, 2, 3, 4]
let s2: Array<number> = []
let s3: Array<number> = []
// let s2 = [0, 0, 0, 0]
// let s3 = [0, 0, 0, 0]
const initGameState: GameState = {
    size: 7,
    poles: [
        [0, 1, 2, 3, 4, 5, 6], [], []
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
    changeState(initGameState)
    setTimeout(() => changeState(moveTriPod(initGameState)), 1000)
})


function move(state: GameState, target: number, destination: number): GameState {
    const targetDisc = state.poles[target].pop()

    if (!targetDisc && targetDisc !== 0) {
        throw new Error(`Cannot use this pole target ${target}`)
    }

    state.poles[destination].push(targetDisc)

    return state
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
    // state = moveSmally(initGameState)
    return `<div class="poles poles-n-${state.size}">
        ${state.poles.map((pole, i) => renderPole(pole, i)).join('\n')}
    </div>`
}

function renderPole(pole: number[], i: number): string {
    return `<div class="pole">
        <div class="number">${i}</div>
        ${pole.slice(0).reverse().map(disc => renderDisc(disc)).join('\n')}
    </div>`
}

function renderDisc(disc: number): string {
    return `<div class="disc disc-n-${disc}">${disc}</div>`
}

function renderToDOM(html: string) {
    document.body.innerHTML = html
}



function changeState(newGameState: GameState) {
    renderToDOM(renderGame(newGameState))
}


const moveTriPod = (state: GameState) => {
    let i = 0;
    for (i = 0; i < 3; i++) {

    }
    const spreadMove = move(move(move(move(move(state, 0, 1), 0, 2), 1, 2), 0, 1), 0, 0)
    // const secMoves = spreadMove//move(move(move(spreadMove, 0, 1), 0, 2), 1, 2)
    const secMoves = move(move(move(spreadMove, 2, 0), 2, 1), 0, 1)
    return move(secMoves, 0, 0)
}
