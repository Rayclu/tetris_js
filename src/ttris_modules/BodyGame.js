export class GameBody {
    constructor(p, HEIGTH, WIDTH) {
        this.piece = JSON.parse(JSON.stringify(p.GetPiece())); 
        this.HEIGTH = HEIGTH;
        this.WIDTH = WIDTH;
        this.grill = this.CreateGrill();
        this.game = this.CreateGame();

    }

    RenderGame(game) {
        let TempGrill = JSON.parse(JSON.stringify(game[0]));

        this.game[1].forEach(coord => {
            const x = coord[0];
            const y = coord[1];
            if (y >= 0 && y < this.HEIGTH && x >= 0 && x < this.WIDTH) {
                TempGrill[y][x] = 1;
            }
        });
        return TempGrill;
    }

    CreateGrill() {
        var grll = [];
        for (let heigth = 0; heigth <= this.HEIGTH; heigth++) {
            let row = [];
            for (let width = 0; width < this.WIDTH; width++) {
                row.push(0);
            }
            grll.push(row);
        }
        return grll;
    }

    CreateGame() {
        var points = 0;
        const game = [this.grill, this.piece, points];
        return game;
    }

    AreYouLoose(game) {
        const grill = game[0];
        const piece = game[1];
        
        // Verificamos si alguna parte de la pieza está en la parte superior de la grilla
        for (const coord of piece) {
            const y = coord[1]; // Coordenada Y de la pieza
            if (y < 0) { // Si la pieza está en la parte superior
                return true; // El juego ha terminado
            }
        }
        return false; 
    }

    move_piece_to_grill(game) {
        let piece = game[1];
        if (!Array.isArray(piece)) {
            console.error("piece no es un array:", piece);
            return [];
        }
        
        let minY = Math.min(...piece.map(coord => coord[1]));
        
        let new_piece = [];
        piece.forEach(coord => {
            let new_coord = [coord[0], coord[1] - minY];
            new_piece.push(new_coord);
        });
        return new_piece;
    }

    center_piece(game) {
        const piece = this.move_piece_to_grill(game);
        if (!Array.isArray(piece) || piece.length === 0) {
            console.error("No se puede centrar la pieza, no es un array válido:", piece);
            return []; // Maneja el error devolviendo un array vacío
        }
        
        const offsetX = Math.floor(this.WIDTH / 2) - Math.floor(piece[0][0] / 2);
        let piece_center = [];

        piece.forEach(coord => {
            //let traslate = [coord[0] + this.WIDTH/2, coord[1]];
            let traslate = [coord[0] + offsetX, coord[1]];
            piece_center.push(traslate);
        });
        return piece_center;
    }
}
