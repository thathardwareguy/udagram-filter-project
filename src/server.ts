import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
dotenv.config();

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8081;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  app.get('/', (req, res) => {
  res.send(200)
  })
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  //enter public url
  app.get('/filteredimage', async function(req, res) {
  const {image_url} = req.query
  //validate image url
  if(!image_url)
  {
    //error handling is placed first to force user to make use of valid url
    return res.status(400).send("please enter a valid url");
  }
    //filter picture if image url is valid
    const filteredPicture = await filterImageFromURL(image_url);
    //return filtered picture
    res.status(200).sendFile(filteredPicture);
    //Delete file after response has been sent to use
    res.on('finish', ()=> {
      try {
        deleteLocalFiles([filteredPicture]);
      } catch(e) {
        console.log("Unable to delete file", filteredPicture);
      }
  });
  }); 
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();