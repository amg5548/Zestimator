// eslint-disable-next-line new-cap
const router = require('express').Router();
const fetch = require('node-fetch');
const { parse } = require('fast-xml-parser');

const formatText = text => `${text[7].toUpperCase()}${text.slice(8)}`;

router.post('/zestimate', async (req, res) => {
  const {city, state, street, zip} = req.body;
  try {
    let xmlData = await fetch(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${process.env.ZILLOW_API_KEY}&address=${encodeURI(street)}&citystatezip=${encodeURI(`${city}, ${state} ${zip}`)}`);
    xmlData = await xmlData.text();
    const {response, message} = parse(xmlData)['SearchResults:searchresults'];
    // Send res based on returned code (https://www.zillow.com/howto/api/GetSearchResults.htm)
    switch (message.code) {
    case 0:
      res.status(200).json(response.results.result.zestimate);
      break;
    case 1:
    case 500:
    case 501:
    case 503:
    case 506:
      res.status(400).json({...message, text: formatText(message.text)});
      break;
    case 2:
    case 6:
      res.status(401).json({...message, text: formatText(message.text)});
      break;
    case 502:
    case 504:
    case 507:
    case 508:
      res.status(404).json({...message, text: formatText(message.text)});
      break;
    case 3:
    case 4:
    case 505:
      res.status(500).json({...message, text: formatText(message.text)});
      break;
    default:
      res.status(500).json({text: 'Something went wrong. Unknown error'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({text: 'Something went wrong. Unknown error'});
  }
});
  
module.exports = router;
