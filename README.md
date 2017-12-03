# Code Super Mario Bros. in JavaScript

Create a Super Mario game in vanilla JavaScript from scratch.

This project is built during my YouTube series [Code Super Mario in JS](https://www.youtube.com/playlist?list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx); a series by my channel [Meth Meth Method](https://www.youtube.com/MethMethMethod).

## List of episodes so far

1. [Backgrounds & Tiles](https://www.youtube.com/watch?v=g-FpDQ8Eqw8&index=1&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
2. [Sprites & Layers](https://www.youtube.com/watch?v=FF93S8rLL_Q&index=2&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
3. [Timing Accuracy](https://www.youtube.com/watch?v=HlloFDayGgk&index=3&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
4. [Keyboard Input](https://www.youtube.com/watch?v=1rBOUyRGQuU&index=4&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
5. [Tile Collision](https://www.youtube.com/watch?v=YLMP5jmtpYc&index=5&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
6. [Scrolling](https://www.youtube.com/watch?v=6Q_F5b-yvXI&index=6&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
7. [Animation](https://www.youtube.com/watch?v=p0yNWxPj-5A&index=7&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
8. [Mario Mechanics](https://www.youtube.com/watch?v=lGngRMfDz1o&index=8&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
9. [Background Patterns & Layers](https://www.youtube.com/watch?v=I1RTsqUz-t0&index=9&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
10. [Synchronous Entity Spawning](https://www.youtube.com/watch?v=C4pZW-0xrDQ&index=10&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
11. [JSON Entity Spawning](https://www.youtube.com/watch?v=y99x_sBEeP8&index=11&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
12. [Entity Interaction](https://www.youtube.com/watch?v=W6z1uDfE9PI&index=12&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
13. [Tech Debt & Presentation](https://www.youtube.com/watch?v=0d8SK9WQEDY&index=13&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)
14. [Dashboard & Fonts](https://www.youtube.com/watch?v=d_Cw7ZrRUCA&index=14&list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)

### Roadmap

* Progression System
* Audio Playback
* Gimmicks (Water, Canons, Repeating levels)
* Package & Deploy


## Running

* Clone repository.
* Run `npm install`.
* Run `npm start`.
* Go to `http://localhost:5000`.


## Maintained Forks

* #### TypeScript version by [@kingdaro](https://github.com/kingdaro/)
  https://github.com/kingdaro/super-mario-typescript

* #### TypeScript in-browser editor by [@AFE-GmdG](https://github.com/AFE-GmdG)
  https://just-run.it/#/rySrbk86W/9


## Contributing

Please contribute if you see something wrong, but I can unfortunately not merge your PR directly into
`master` as I use Git commits as a script for creating the tutorial and commits out of sequence would throw me off.

## How to setup ESlint for Atom:

You need to Install `linter-eslint` package in Preferences -> Install.

Following instructions for `linter-eslint`, you need to:

1. Install npm dependencies globally in your terminal.

```
  npm i -g eslint@4.12.1 eslint-config-standard:@10.2.1 eslint-import-resolver-webpack:@0.8.3 eslint-plugin-import:@2.8.0 eslint-plugin-node:@5.2.1 eslint-plugin-promise:@3.6.0 eslint-plugin-standard:@3.0.1 webpack:@3.9.1
```

And activate checkboxes in `linter-eslint` plugin settings:

- Fix on save
- Use global ESlint installation

For other editors configuration may differ.

Enjoy.
