let s1 = [1, 2, 3, 4]
let s2: Array<number> = []
let s3: Array<number> = []
// let s2 = [0, 0, 0, 0]
// let s3 = [0, 0, 0, 0]
const initGameState: GameState = {
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
    console.log("DOMContentLoaded")
    changeState(initGameState)
})


function move(state: GameState, target: number, destination: number): GameState {
    const targetDisc = state.poles[target].pop()

    if (!targetDisc) {
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
        ${state.poles.map(pole => renderPole(pole)).join('\n')}
    </div>`
}

function renderPole(pole: number[]): string {
    // console.log('pole rendered', pole)
    return `<div class="pole">
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
    console.log('newGameState', newGameState.poles);


    renderToDOM(renderGame(newGameState))
}


