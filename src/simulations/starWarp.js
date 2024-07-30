// make a method to just accept app and add relevant stuff.
// dont do interval
// add press S to start stars, and then again to warp
import { Sprite, Assets } from 'pixi.js';

const starAmount = 1000;
let cameraZ = 0;
const fov = 20;
const baseSpeed = 0.025;
let speed = 0;
let warpSpeed = 0;
const starStretch = 5;
const starBaseSize = 0.05;

// This class was mostly obtained from https://pixijs.com/8.x/playground?exampleId=advanced.starWarp
// Some parts have been modified for this application
export class StarWarp {
    constructor(app) {
        this.app = app
        this.stars = []
        this.ticker = null
        this.starsOn = false
    }

    randomizeStar(star, initial) {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

        // Calculate star positions with radial random coordinate so no star hits the camera.
        const deg = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 1;

        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
    }

    addStarsToStage() {
        for (let i = 0; i < starAmount; i++) {
            const star = {
                sprite: new Sprite(this.starTexture),
                z: 0,
                x: 0,
                y: 0,
            };
    
            star.sprite.anchor.x = 0.5;
            star.sprite.anchor.y = 0.7;
            this.randomizeStar(star, true);
            this.app.stage.addChild(star.sprite);
            this.stars.push(star);
        }
    }


    initStars() {
        this.ticker = this.app.ticker.add((time) => {
            // Simple easing
            speed += (warpSpeed - speed) / 20;
            cameraZ += time.deltaTime * 10 * (speed + baseSpeed);
            for (let i = 0; i < starAmount; i++) {
                const star = this.stars[i];
                if (star.z < cameraZ) this.randomizeStar(star);
    
                // Map star 3d position to 2d with really simple projection
                const z = star.z - cameraZ;
                star.sprite.x = star.x * (fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.width / 2;
                star.sprite.y = star.y * (fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.height / 2;
    
                // Calculate star scale & rotation.
                const dxCenter = star.sprite.x - this.app.renderer.screen.width / 2;
                const dyCenter = star.sprite.y - this.app.renderer.screen.height / 2;
                const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
                const distanceScale = Math.max(0, (2000 - z) / 2000);
    
                star.sprite.scale.x = distanceScale * starBaseSize;
                // Star is looking towards center so that y axis is towards center.
                // Scale the star depending on how fast we are moving, what the stretchfactor is
                // and depending on how far away it is from the center.
                star.sprite.scale.y
                    = distanceScale * starBaseSize
                    + (distanceScale * speed * starStretch * distanceCenter) / this.app.renderer.screen.width;
                star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
            }
        });
    }

    stopStars() {
        if (this.ticker) {
            this.app.ticker.remove(this.ticker)
        }
    }

    enableStars() {
        if (this.starsOn) {
            warpSpeed = warpSpeed > 0 ? 0 : 1;
        } else {
            this.starsOn = true
            this.addStarsToStage()
            this.initStars()
        }
    }

    async loadTextures() {
        this.starTexture = await Assets.load('https://pixijs.com/assets/star.png');
    }
}