/*  
getSampleData
createSample
updateSample
deleteSampleObject
*/
const uuid = require("uuid");

async function getSampleData(req, res) {
  try {
    let sample;
    if (req.query.sampleCode) {
      // ideally this would be a db transaction findOne or findAll that
      // returns a record and we would handle situations where the key didn't
      // match/return a record from the db.
      if (req.query.sampleCode === "7357-84dc-0d3r") {
        throw new Error(
          "No record found or you don't have necessary access to it."
        );
      }
      sample = {
        sampleCode: req.query.sampleCode,
        name: `MOCKED-sample-${req.query.sampleCode}`,
        description: "this is a non-descript sample of some sort.",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } else {
      throw new Error("sampleCode is required");
    }
    res.status(200);
    res.json(sample);
  } catch (error) {
    console.error("There was an error getting the sample data. : ", error);
    res.status(400);
    res.json({
      message: "could not get the sample data",
      genericError: error,
    });
  }
  return;
}

async function createSample(req, res) {
  res.status(404);
  res.json({
    message: {
      status: "Sample creation not yet implemented.",
      input: req.body,
    },
  });
}

async function updateSample(req, res) {
  res.status(404);
  res.json({
    message: { status: "Sample update not yet implemented.", input: req.body },
  });
}

async function deleteSample(req, res) {
  console.log("delete req.params %s", JSON.stringify(req.params));
  res.status(404);
  res.json({
    message: `Sample deletion not yet implemented [${req.params.sampleCode}]`,
  });
}

module.exports = {
  getSampleData,
  createSample,
  updateSample,
  deleteSample,
};
