import quickstart from "./recogniser";
import getLabels from "./recogniser";
import fs from "fs";
import path from "path";

async function testPrintImage() {
  const file = fs.readFileSync(
    //REPLACE WITH ANY IMAGE FILE YOU HAPPEN TO HAVE ON PC
    path.join("/Users/focus/Downloads/Mobile_Espresso.png")
  );
  console.log(await getLabels(file));
}

export default testPrintImage;
