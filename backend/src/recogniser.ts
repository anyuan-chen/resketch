import { ImageResult } from "./types";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import fetch from "node-fetch";

async function getLabels(imagebase64: string) {
  const obj = {
    requests: [
      {
        features: [
          {
            maxResults: 50,
            type: "LABEL_DETECTION",
          },
        ],
        image: {
          content: imagebase64,
        },
      },
    ],
  };
  /*
  const client = new ImageAnnotatorClient();
  const [result] = await client.labelDetection(
    Buffer.from(imagebase64, "base64")
  );

  */

  const result = await fetch(
    "https://vision.googleapis.com/v1/images:annotate",
    {
      method: "post",
      body: JSON.stringify(obj),
    }
  );
  const labels = ((await result.json()) as { [key: string]: any })
    .labelAnnotations;
  console.log(labels);
  console.log(result);

  const filtered: ImageResult[] =
    labels?.map((label: { [key: string]: number | string }) => {
      return {
        confidence: label["confidence"] ?? 0,
        label: label["description"] ?? "No description",
      };
    }) ?? [];
  return filtered;
}

//SAMPLE RESPONSE FOR A LABEL - RETURNS AN ARRAY OF THESE
// locations: [],
// properties: [],
// mid: '/m/02wbm',
// locale: '',
// description: 'Food',
// score: 0.9611189961433411,
// confidence: 0,
// topicality: 0.9611189961433411,
// boundingPoly: null

export default getLabels;
