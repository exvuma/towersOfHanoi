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
    let destDisk = destPole.length ? destPole[destPole.length - 1] : -1
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
    let moves: [number, number][] = [[target, destination]]
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
        return iSleeps > 100
    }
    document.addEventListener('DOMContentLoaded', async (_e) => {
        changeState(gameState)
        let i = 0
        // moveTriPod(initGameState, 0, 1)
        // setTimeout(() => changeState(moveTriPod(initGameState, 0, 1)), 1000)
        while (!isSolved(gameState)) {
            iSleeps = ++iSleeps
            performNextMove(gameState, i)
            i++
            await sleep(100)

            //onceSolved
        }
        console.log('i', i);

    })


}
main()
/**
 * 
 * @param state 
 * @returns the next big disk that is eligle to move
 */
function findNextBiggie(state: GameState): number {
    return 0
}
/**
 * 
 * @param state 
 * @returns the next big disk that is eligle to move
 */
function spreadChildren(state: GameState): number {
    return 0
}
type moves = [number, number][]

function getMovesForTripod(target: number, destination: number): moves {
    const fillerPole = [0, 1, 2].reduce((pole, cur) => (pole !== target && pole !== destination) ? pole : cur)
    return [[target, destination], [target, fillerPole],
    [destination, fillerPole],
    [target, destination], [fillerPole, target], [fillerPole, destination],
    [target, destination]]
}
function getMovesForQuadpod(target: number, destination: number): moves {
    const fillerPole = [0, 1, 2].reduce((pole, cur) => (pole !== target && pole !== destination) ? pole : cur)
    return [...getMovesForTripod(target, fillerPole), [target, destination], ...getMovesForTripod(fillerPole, destination)]
}
function performNextMove(state: GameState, moveI: number) {
    //call move based on state
    // let newState = moveTriPod(state, 0, 1)
    console.log('moveI', moveI);


    if (true/**if first move  */) {
        let firstMoves: moves = [
            //move Tripod
            ...getMovesForTripod(0, 1),   //[0, 1], [0, 2], [1, 2], [0, 1], [2, 0], [2, 1], [0, 1],

            //move 3 biggie
            [0, 2],
            ...getMovesForTripod(1, 2),

            //move it's brother 2
            [0, 1],
            ...getMovesForTripod(2, 0),
            [2, 1],
            ...getMovesForTripod(0, 1),

            //move brother 1
            ...getMovesForQuadpod(1, 2)

        ]
        console.log('firstMoves.length', firstMoves.length);

        move(state, firstMoves[moveI][0], firstMoves[moveI][1])
    }

    // let newState = move(state, 0, 1)
    renderToDOM(renderGame(state))
}

function gameState(gameState: any) {
    throw new Error("Function not implemented.")
}

