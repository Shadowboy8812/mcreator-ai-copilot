const test=require("node:test");const assert=require("node:assert/strict");const {validateRelativeArtifactPath,validateArtifact}=require("../dist/index.js");
test("accepts normal relative artifact paths",()=>assert.equal(validateRelativeArtifactPath("src/main/Example.java"),"src/main/Example.java"));
test("rejects parent traversal",()=>assert.throws(()=>validateRelativeArtifactPath("../secret"),/Unsafe/));
test("rejects absolute paths",()=>assert.throws(()=>validateRelativeArtifactPath("/tmp/file"),/Absolute/));
test("rejects oversized artifacts",()=>assert.throws(()=>validateArtifact({path:"large.txt",content:"x".repeat(50001)}),/50 KB/));
