const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });
const baseDir = process.env.NODE_ENV === "testing" ? "./tmp" : "/tmp";

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

// learn more about HTTP functions here: https://arc.codes/primitives/http
exports.handler = async function http(req) {
  console.log({ env: process.env.NODE_ENV });
  const body = JSON.parse(req.body);
  const imgBuf = Buffer.from(body.img1, "base64");
  const imgBuf2 = Buffer.from(body.img2, "base64");

  fs.writeFileSync(baseDir + "/uploads-pic1.png", imgBuf);
  fs.writeFileSync(baseDir + "/uploads-pic2.png", imgBuf2);

  await new Promise((resolve) =>
    gm(baseDir + "/uploads-*.png").write(
      baseDir + "/tiff.tiff",
      (err, output) => {
        console.log({ err, output });
        resolve();
      }
    )
  );

  const outputBuff = fs.readFileSync(baseDir + "/tiff.tiff");

  return {
    statusCode: 200,
    headers: {
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      "content-type": "application/json; charset=utf8",
    },
    body: JSON.stringify({
      ok: true,
      multipageTiff: outputBuff.toString("base64"),
    }),
  };
};
