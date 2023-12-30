# Conway's Game of Life
This project implements [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) in the browser. Conway's Game of Life is a grid of dead or live cells coupled with a set of rules for the lifecycle of those cells. Continuous appliance of these rules to the current grid and updating it with the next state leads to a simulation-like animation of birth, death, and movement of cells throughout the grid. For more information check out the wikipedia article. To see this project in action head over to [gol.lp247.dev](https://gol.lp247.dev).

## Key aspects of development
One aim of this project was to evaluate how much tooling is needed for frontend web development nowadays. With the advent of native ES6 support including ES modules in all major browsers it is not entirely clear how much bundlers and toolings are still necessary today. Following is a list of tools still in use here with some notes.
- Language - TypeScript: Nowadays, TypeScript is a must for every project involving more than just very basic functionality. Thus, the TypeScript compiler is the only frontend tool that is a strictly necessary dependency.
- Code post processing - Vite: Although not strictly necessary, vite adds a lot of very useful functionality for code post processing. In this case, the following is much appreciated.
    - In-source-testing: Vite allows for writing tests inside the code files. Additionally, it provides tools to execute in-source tests without problems and can eliminate test code from the productive code. In-source tests are very useful to keep code and tests very close together and there is also no need to export otherwise not exported parts to import inside the test files.
    - Hashing source files: Vite hashes source files so that caching works flawlessly.
    - Dead code elimination: Vite can remove unused code.

It is worth noting, that bundlers do no longer appear to be a necessary tool, even seem to be a bad choice, nowadays. With ES modules you can easily split code among many different files. Also, bundling is one more - potentially very time-consuming - task to do which adds a lot of complexity and makes proper caching of source files very hard.
