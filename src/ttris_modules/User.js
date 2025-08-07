
export function GetInputs() {
    let keys = {
        keyPressed: null,
        left: false,
        right: false,
        down: false,
        rotate: false,
        pause: false,
        exit: false
    };

    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowLeft':
                keys.keyPressed = 'left';
                keys.left = true;
                break;
            case 'ArrowRight':
                keys.keyPressed = 'right';
                keys.right = true;
                break;
            case 'ArrowDown':
                keys.keyPressed = 'down';
                keys.down = true;
                break;
            case 'ArrowUp':
                keys.keyPressed = 'rotate';
                keys.rotate = true;
                break;
            case 'p':
                keys.pause = true;
                break;
            case 'q':
                keys.exit = true;
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        keys.keyPressed = null;
        switch(event.key) {
            case 'ArrowLeft':
                keys.left = false;
                break;
            case 'ArrowRight':
                keys.right = false;
                break;
            case 'ArrowDown':
                keys.down = false;
                break;
            case 'ArrowUp':
                keys.rotate = false;
                break;
            case 'p':
                keys.pause = false;
                break;
            case 'q':
                keys.exit = false;
                break;
        }
    });

    return keys;
}