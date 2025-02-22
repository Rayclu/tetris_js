//import { GetInputs } from './User.js';
import { CheckArea } from './checks.js';

export function direction(game, keyPressed) {
    switch (keyPressed) {
        case 'left':
            if (CheckArea(game, false, true, false)) {
                // Movemos la pieza actual a la izquierda
                game[1].forEach(coord => coord[0] -= 1);
            }
            break;
        case 'right':
            if (CheckArea(game, false, false, true)) {
                // Movemos la pieza actual a la derecha
                game[1].forEach(coord => coord[0] += 1);
            }
            break;
        case 'rotate':
            if (CheckArea(game, true, false, false)) {
                // La rotación se maneja en el GameBody
                const rotated = game[1].rotate(game[1]);
                if (rotated) game[1] = rotated;
            }
            break;
        default:
            if (CheckArea(game)) {
                // Movemos la pieza actual hacia abajo
                game[1].forEach(coord => coord[1] += 1);
            }
            break;
    }
    return game;
}