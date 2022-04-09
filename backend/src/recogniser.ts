import { ImageResult } from "./types";
import { ImageAnnotatorClient } from "@google-cloud/vision";

async function getLabels(imagebase64: string) {
  const client = new ImageAnnotatorClient();
  const [result] = await client.labelDetection(imagebase64);
  const labels = result.labelAnnotations;
  const filtered: ImageResult[] =
    labels?.map((label) => {
      return {
        confidence: label.confidence ?? 0,
        label: label.description ?? "No description",
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
