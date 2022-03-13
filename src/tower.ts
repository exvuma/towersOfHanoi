let gameState: GameState = {
    size: 9,
    poles: [
        [0, 1, 2, 3, 4, 5, 6, 7, 8], [], []
    ]
}
function changeMoveState(state: GameState, target: number, destination: number): GameState {
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
function renderGame(state: GameState): string {
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
    return `<div class="disc disc-n-${disc}">${gameState.size - disc}</div>`
}

function renderToDOM(html: string) {
    document.body.innerHTML = html
}


function changeState(state: GameState) {
    renderToDOM(renderGame(state))
}

function sleep(duration: number): Promise<void> {
    return new Promise((res, rej) => { setTimeout(res, duration) })
}

async function main() {
    let iSleeps = 0
    function isSolved(state: GameState) {
        //max times we want to sleep
        return iSleeps > 1200
    }
    let moves: Moves = [
        ...nPodMoves(0, 1, gameState.size),
    ]
    document.addEventListener('DOMContentLoaded', async (_e) => {
        changeState(gameState)
        let i = 0
        while (!isSolved(gameState)) {
            iSleeps = ++iSleeps
            performNextMove(gameState, moves[i])
            i++
            await sleep(100)
        }
    })
}
main()


type Move = [number, number]
type Moves = Array<Move>


/**
 * 
 * @param target pole to move the disks from
 * @param destination pole to move the disks to
 * @param n the number of disks to move
 * @returns the moves required to get there
 */
function nPodMoves(target: number, destination: number, n: number): Moves {
    if (n < 2) {
        return [[target, destination]]
    }
    const fillerPole = [0, 1, 2].reduce((pole, cur) => (pole !== target && pole !== destination) ? pole : cur)
    return [
        ...nPodMoves(target, fillerPole, n - 1),
        [target, destination],
        ...nPodMoves(fillerPole, destination, n - 1)
    ]
}
function performNextMove(state: GameState, move: Move) {
    changeMoveState(state, move[0], move[1])
    renderToDOM(renderGame(state))
}


