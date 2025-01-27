import * as test from "blue-tape";
import { finished } from "stream";
import { promisify } from "util";
import { SplitTransform } from "./split-transform";

const whenFinished = promisify(finished);

test("split-transform", async t => {
    const expect = [
        "aabb",
        "cc",
    ];

    const splitTransform = new SplitTransform();
    splitTransform.on("data", chunk => {
        t.equal(chunk, expect.shift());
    });

    splitTransform.write("aa");
    splitTransform.write("bb\n");
    splitTransform.write("cc\n");
    splitTransform.write("dd");
    splitTransform.end();

    await whenFinished(splitTransform);

    t.equal(expect.length, 0);
});
