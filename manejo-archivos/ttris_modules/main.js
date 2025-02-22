import { Player } from './players.js';
import { GameBody } from './BodyGame.js';
import { Piece } from './pieces.js';
import { GetInputs } from './User.js';
import { CanPieceGoDown, CheckArea, LineComplete } from './checks.js';
import { direction } from './directions.js';

const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext("2d");
const BLOCK_SIZE = 34;
const CONSOLIDE = 2;

function UsrIntef(stateGame) {
    document.getElementById("nivel").textContent = stateGame.level;
    document.getElementById("lines").textContent = stateGame.lines;
    document.getElementById("score").textContent = stateGame.score;
}

function Draw(game) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grid = game[0];
    const currentPiece = game[1];

    // Dibujado de la grilla
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            // Dibujado del borde de cada celda
            ctx.strokeStyle = "#CCCCCC";
            ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            
            // Si la celda está ocupada, la pintamos
            if (grid[y][x] === CONSOLIDE) {
                ctx.fillStyle = "#555555";
                ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = "#000000";
                ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }

    // Dibujamos la pieza actual
    if (currentPiece) {
        ctx.fillStyle = "#FF0000";
        currentPiece.forEach(([x, y]) => {
            if (y >= 0) {  // Solo dibujamos si está dentro del canvas
                ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = "#CC0000";
                ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        });
    }

}

function pauseGame() {
    while (GetInputs().pause || GetInputs().exit) {
        console.log("Juego en pausa");
    }
}

async function main() {    
    console.log("Función main iniciada");
    const player = new Player("Player1");
    const p1 = new Piece();
    
    console.log("Cargando piezas...");
    await p1.loadPieces();
    console.log("Piezas cargadas");
    
    const GameBoy = new GameBody(p1, 18, 9);
    const game = GameBoy.CreateGame();
    
    game[1] = GameBoy.center_piece(game);
    const grill = game[0];
    let tickCount = 0;
    
    const StateGame = {
        isPlaying: true,
        isPaused: false,
        level: 1,
        lines: 0,
        score: 0,
        TICKS_PER_DROP: 50
    };

    function gameLoop() {
        Draw(game);
        UsrIntef(StateGame);
        
        if (GameBoy.AreYouLoose(game)) {
            StateGame.isPlaying = true;
            console.log(`Game Over! ${player.name}`);
            return;
        }
        
        const InputConfig = GetInputs();
        const keyPressed = InputConfig.keyPressed;

        if (keyPressed) {
            if (CheckArea(game, keyPressed)) {
                direction(game, keyPressed);
            }
        }
        
        if (tickCount >= StateGame.TICKS_PER_DROP) {
            console.log("tickCount >= StateGame.TICKS_PER_DROP");
            
            // Verificamos si la pieza puede bajar
            if (CanPieceGoDown(game)) {
                // Mover la pieza hacia abajo
                game[1] = p1.down(game); // Aquí llamas al método down de la instancia de Piece
                tickCount = 0; // Reiniciamos el contador de ticks
            } else if (!CanPieceGoDown(game)){
                console.log(game)

                //consol_state verify if the piece are on the limit of the grill. If is true, the piece would to consolide, 
                const consol_state = game => {
                    const grill = game[0];
                    const piece = game[1];
                    
                    const limit = piece.forEach(coords =>{
                        const y_plus_one = coords[1]+1;
                        const lim = y_plus_one >= grill.length;
                        return lim
                    });
                    return limit
                }
            
            if (consol_state(game)){
                console.log("\n\n\t",consol_state(game),"\n\n\t")
                game[1] = p1.GetPiece(); // Obtener una nueva pieza
                game[1] = GameBoy.center_piece(game); // Centramos la nueva pieza
            }
        }

            // Verificamos si hay líneas completas
            const result = LineComplete(game);
            if (result.isComplete) {
                game[0].splice(result.line, 1);
                game[0].unshift(new Array(game[0][0].length).fill(0));
                StateGame.lines++;
                StateGame.score += 100 * StateGame.level;
            }
        }

        if (InputConfig.pause) {
            pauseGame();
        }

        if (StateGame.lines >= 20) {
            StateGame.level++;
            StateGame.lines = 0;
            StateGame.TICKS_PER_DROP = Math.max(5, 70 - (StateGame.level * 5));
            if (StateGame.level > 20) StateGame.TICKS_PER_DROP = 1;
        }   
        
        tickCount++;
        //console.log("tickCount", tickCount);
        
        if (StateGame.isPlaying && !StateGame.isLoose) {
            requestAnimationFrame(gameLoop);
        }
    }

    gameLoop(); // Llamamos a gameLoop aquí
}

// Asegurarnos de que el DOM está cargado antes de añadir el event listener
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado, añadiendo event listener al botón");
    const button = document.getElementById('initGame');
    if (button) {
        button.addEventListener('click', () => {
            console.log("Botón clickeado, iniciando juego");
            main();
        });
    } else {
        console.error("No se encontró el botón 'initGame'");
    }
});