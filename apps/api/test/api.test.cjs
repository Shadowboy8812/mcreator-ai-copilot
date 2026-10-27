const test = require("node:test");
const assert = require("node:assert/strict");
const { diagnoseBuildLog } = require("../dist/diagnostics.js");
test("diagnoses unresolved Java symbols",()=>{const r=diagnoseBuildLog("error: cannot find symbol");assert.equal(r[0].title,"Unresolved symbol");});
test("returns guidance for unknown logs",()=>{const r=diagnoseBuildLog("unrecognized message");assert.equal(r.length,1);assert.match(r[0].title,/No known pattern/);});
test("recognizes Java toolchain mismatch",()=>{const r=diagnoseBuildLog("Unsupported class file major version 65");assert.equal(r[0].title,"Java version mismatch");});
