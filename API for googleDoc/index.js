const express = require('express')
const app = express()

const port = 4567
let mywordCount;
// Main function
/**
 * 
 * @param {fileID} a 
 * @param {fileID} b 
 */
// export default function start(a, b){
//   main(a,b);
// }


async function main(a) {
  console.log("WE REACHED BABY");
  const wordCount = await getWords(a);
  mywordCount = await getWords(a);;
  console.log("WORD COUNT IS");
  console.log(wordCount);
  return wordCount;
}
//module.exports.fetchdata

/**
 * Compare the contents of two Google Docs files
 * @param {string} fileId1 The ID of the first file
 * @returns the number of words
 */
async function getWords(fileId1) {
  const { google } = require('googleapis');
  //kosomoko
  // OAuth2 info 
  const REFRESH_TOKEN = '1//049fkGhfsDFYyCgYIARAAGAQSNwF-L9IrgCSJzurgYt86ALhf23tfA6ksIL9xD9rPkmtCFNdqKvHE5T5m7Mpj9dLDbpwYnjDnAPg';
  const client_id = '597639048363-6kclrc31bat9eautoailav8tjtalqqu0.apps.googleusercontent.com';
  const client_secret= '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';
  const redirect_uri= 'http://developers.google.com/oauthplayground';

  // Authenticate with the Google Drive API.
  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );

  const docs = google.docs({ version: 'v1', auth: oauth2Client });
  oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

  const [file1] = await Promise.all([
    docs.documents.get({
      documentId: fileId1
    })]);
  
  const content1 = file1.data.body.content;
  
  let wordCount1 = 0;
  
  // Calculate the number of words in file 1
  for (const element of content1) {
    if (element.paragraph) {
      for (const word of element.paragraph.elements) {
        if (word.textRun) {
          wordCount1 += word.textRun.content.split(" ").length;
        }
      }
    }
  }
  console.log(wordCount1);
  return wordCount1;
}

main('1Q1NpqKwaAx2uh75GBDRncnOBeOScGZV7W8qFEbn2A-8')


// app.get("/", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     // main('1Q1NpqKwaAx2uh75GBDRncnOBeOScGZV7W8qFEbn2A-8');
//     // console.log("INSIDE GET FUNCTION");
//     // console.log(mywordCount);
//     res.send(String(mywordCount));
// })

app.get("/", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const myWordCount = await getWords('1Q1NpqKwaAx2uh75GBDRncnOBeOScGZV7W8qFEbn2A-8');
    res.send(String(myWordCount));
  }
  catch(error){
    console.error(error);
    res.send(error);
  }
})

app.listen(port, () =>{
    console.log('Listening on port ${port}')
})