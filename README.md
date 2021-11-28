![U-235 Conspiracy](https://github.com/giusene/U235-Conspiracy-the-game/blob/main/img/u235-conspiracy.png)

# U-235 Consiparcy (the game)

>A platform game entirely developed in Vanilla Javascript and Css.
###Features:
- Multilevel
- Real enemy AI
- Difficulty increase
- Customize game levels


>this is the approach I used for creating the game levels
``` javascript
    /**
 *  0 = floor
 *  1 = wall
 *  2 = bridge
 *  3 = green liquid
 *  4 = bin with eyes
 *  5 = standard bin
 *  6 = computer
 */
const levels = [
    [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 3],
        [3, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 3],
        [3, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 3],
        [3, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 1, 0, 5, 4, 0, 0, 1, 1, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
    ],
```

### [>>> Live Demo](https://giusene.github.io/U235-Conspiracy-the-game/)