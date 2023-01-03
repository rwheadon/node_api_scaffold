/*  
getSampleData
createSample
updateSample
deleteSampleObject
*/
const uuid = require("uuid");
const { logger } = require("../logging");

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
    } else if (req.query.sampleName) {
      if (req.query.sampleName === "BOGUS NAME") {
        throw new Error(
          "No record found or you don't have necessary access to it."
        );
      }
      sample = {
        sampleCode: uuid.v4(),
        name: req.query.sampleName,
        description: "this is a non-descript sample of some sort.",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } else {
      throw new Error("sampleCode or sampleName is required");
    }
    logger.warn(`***************** sample data : ${JSON.stringify(sample)}`);
    res.status(200);
    res.json(sample);
  } catch (error) {
    logger.error("There was an error getting the sample data. : ", error);
    res.status(400);
    res.json({
      message: "could not get the sample data",
      genericError: error.message,
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
  if (req.params.sampleCode) {
    logger.log({
      level: "info",
      message: ("delete req.params %s", JSON.stringify(req.params)),
    });
    res.status(404);
    res.json({
      message: `Sample deletion not yet implemented [${req.params.sampleCode}]`,
    });
  } else {
    res.status(500);
    res.json({
      message: `There was an error running sampleCode deletion for "${req.params.sampleCode}"`,
    });
  }
}

module.exports = {
  getSampleData,
  createSample,
  updateSample,
  deleteSample,
};
