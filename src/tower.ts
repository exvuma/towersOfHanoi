let s1 = [1, 2, 3, 4]
let s2: Array<number> = []
let s3: Array<number> = []
// let s2 = [0, 0, 0, 0]
// let s3 = [0, 0, 0, 0]





function move(state: GameState, target: number, destination: number): GameState {
    const targetDisc = state.poles[target].pop()

    if (!targetDisc && targetDisc !== 0) {
        throw new Error(`Cannot use this pole target ${target}`)
    }
    //is legal
    let destPole = state.poles[destination]
    let destDisk = destPole[destPole.length - 1]
    if (targetDisc < destDisk) {
        throw new Error(`That was an illegal move there  ${target} <  ${destDisk}`)
    }
    state.poles[destination].push(targetDisc)

    // setTimeout(() => { changeState(state) }, 1000)
    // sleep(10);
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
    console.log('state', state);

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



function changeState(state: GameState) {
    renderToDOM(renderGame(state))
}

const moveTriPod = (state: GameState, target: number, destination: number) => {

    //whatever is not target or destination
    let fillerPole = [0, 1, 2].reduce((pole, cur) => (pole !== target && pole !== destination) ? pole : cur)
    console.log('fillerPole', fillerPole);

    const spreadMove =
        move(
            move(
                move(
                    move(state, target, destination)
                    , target, fillerPole)
                , destination, fillerPole)
            , target, destination)
    const secMoves = move(move(move(spreadMove, fillerPole, target), fillerPole, destination), target, destination)
    return move(secMoves, 0, 0)
}
function sleep(duration: number): Promise<void> {
    return new Promise((res, rej) => { setTimeout(res, duration) })
}

async function main() {
    let gameState: GameState = {
        size: 7,
        poles: [
            [0, 1, 2, 3, 4, 5, 6], [], []
        ]
    }
    let iSleeps = 0
    function isSolved(state: GameState) {
        //TODO: fill in logic
        return iSleeps < 1
    }
    document.addEventListener('DOMContentLoaded', async (_e) => {
        changeState(gameState)
        // moveTriPod(initGameState, 0, 1)
        // setTimeout(() => changeState(moveTriPod(initGameState, 0, 1)), 1000)
        while (isSolved(gameState)) {
            console.log('iSleeps', iSleeps);

            performNextMove(gameState)
            await sleep(500)
            iSleeps = iSleeps++

            //onceSolved
        }
    })


}
main()

function performNextMove(state: GameState) {
    //call move based on state
    let newState = moveTriPod(state, 0, 1)
    // let newState = move(state, 0, 1)
    renderToDOM(renderGame(state))
}

function gameState(gameState: any) {
    throw new Error("Function not implemented.")
}

