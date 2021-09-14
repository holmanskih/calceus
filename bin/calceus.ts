import {run} from "../src/cli/index.js";

try {
    run()
} catch (e) {
    console.log('unexpected application error', e)
}
