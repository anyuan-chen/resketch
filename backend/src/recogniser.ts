
import  {ImageResult} from "./types"
import {ImageAnnotatorClient} from "@google-cloud/vision";
import {AnnotateImageRequest} from "@google-cloud/vision"

async function getLabels(image: Buffer)  {
  const vision = require("@google-cloud/vision");
  const client :ImageAnnotatorClient = new vision.ImageAnnotatorClient();
  const [result] : IAnnotateImageRequest  = await client.labelDetection(image);
  const labels  = result.labelAnnotations;
  const filtered = labels.map(label => {
      const result : ImageResult = {
          confidence: label.confidence,
          description: label.description
      }
      return {
          result
      }
  });
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
