async function getLabels(image: any)  {
  const vision = require("@google-cloud/vision");
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.labelDetection(image);
  const labels = result.labelAnnotations;
  return labels;
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
