const controllers = require("../../../controllers");
const uuid = require("uuid");
const { faker } = require("@faker-js/faker");

const mockRequest = (sessionData, body, params, query) => ({
  session: { data: sessionData },
  body,
  params,
  query,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("INTEGRATION : sample controller tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET Should return a sample object if sampleCode is provided", async () => {
    const uuidKey = uuid.v4();
    const req = mockRequest(
      {
        /*session*/
      },
      {
        /*body*/
      },
      {
        /*params*/
      },
      {
        /*query*/
        sampleCode: uuidKey,
      }
    );
    const res = mockResponse();
    await controllers.getSampleData(req, res);
    const sample = res.json.mock.calls[0][0];
    expect(sample.sampleCode).toEqual(uuidKey);
    expect(sample.name).toEqual(`MOCKED-sample-${uuidKey}`);
  });

  test("GET Should return a sample object if sampleName is provided", async () => {
    const name = faker.word.noun();
    const req = mockRequest(
      {
        /*session*/
      },
      {
        /*body*/
      },
      {
        /*params*/
      },
      {
        /*query*/
        sampleName: name,
      }
    );
    const res = mockResponse();
    await controllers.getSampleData(req, res);
    const sample = res.json.mock.calls[0][0];
    expect(sample.name).toEqual(`${name}`);
  });

  test("GET Should error if bad sampleCode is provided", async () => {
    const name = faker.word.noun();
    const req = mockRequest(
      {
        /*session*/
      },
      {
        /*body*/
      },
      {
        /*params*/
      },
      {
        /*query*/
        sampleCode: "7357-84dc-0d3r",
      }
    );
    const res = mockResponse();
    await controllers.getSampleData(req, res);
    expect(res.status.mock.calls[0][0]).toEqual(400);
    const error = res.json.mock.calls[0][0];
    const expectedMessage = "could not get the sample data";
    const expectedGenericError =
      "No record found or you don't have necessary access to it.";
    expect(error.message).toEqual(`${expectedMessage}`);
    expect(error.genericError).toEqual(`${expectedGenericError}`);
  });

  test("GET Should error if bad sampleName is provided", async () => {
    const name = faker.word.noun();
    const req = mockRequest(
      {
        /*session*/
      },
      {
        /*body*/
      },
      {
        /*params*/
      },
      {
        /*query*/
        sampleName: "BOGUS NAME",
      }
    );
    const res = mockResponse();
    await controllers.getSampleData(req, res);
    expect(res.status.mock.calls[0][0]).toEqual(400);
    const error = res.json.mock.calls[0][0];
    const expectedMessage = "could not get the sample data";
    const expectedGenericError =
      "No record found or you don't have necessary access to it.";
    expect(error.message).toEqual(`${expectedMessage}`);
    expect(error.genericError).toEqual(`${expectedGenericError}`);
  });

  test("GET Should error if sampleCode and sampleName omitted", async () => {
    const name = faker.word.noun();
    const req = mockRequest(
      {
        /*session*/
      },
      {
        /*body*/
      },
      {
        /*params*/
      },
      {
        /*query*/
      }
    );
    const res = mockResponse();
    await controllers.getSampleData(req, res);
    expect(res.status.mock.calls[0][0]).toEqual(400);
    const error = res.json.mock.calls[0][0];
    const expectedMessage = "could not get the sample data";
    const expectedGenericError = "sampleCode or sampleName is required";
    expect(error.message).toEqual(`${expectedMessage}`);
    expect(error.genericError).toEqual(`${expectedGenericError}`);
  });

  test("POST : Should return a 404 not implemented.", async () => {
    const req = mockRequest(
      {
        /*session*/
      },
      {
        /*body*/
        name: "test-sample",
        description: "some description",
      },
      {
        /*params*/
      },
      {
        /*query*/
      }
    );
    const res = mockResponse();
    await controllers.createSample(req, res);
    const sample = res.json.mock.calls[0][0];
    expect(res.status.mock.calls[0][0]).toEqual(404);
    expect(sample.message.input.name).toEqual(req.body.name);
    expect(sample.message.input.description).toEqual(req.body.description);
  });

  test("PUT : Should return a 404 not implemented.", async () => {
    const req = mockRequest(
      {
        /*session*/
      },
      {
        /*body*/
        name: "updated-name",
        description: "updated sample description",
        sampleCode: "456f-jc3y-0s44-9x9o",
      },
      {
        /*params*/
      },
      {
        /*query*/
      }
    );
    const res = mockResponse();
    await controllers.updateSample(req, res);
    const sample = res.json.mock.calls[0][0];
    expect(res.status.mock.calls[0][0]).toEqual(404);
    expect(sample.message.input.name).toEqual(req.body.name);
    expect(sample.message.input.description).toEqual(req.body.description);
    expect(sample.message.input.sampleCode).toEqual(req.body.sampleCode);
  });

  test("DELETE : Should return a 404 not implemented with messages.", async () => {
    const uuidKey = uuid.v4();
    const req = mockRequest(
      {
        /*session*/
      },
      {
        /*body*/
      },
      {
        /*params*/
        sampleCode: uuidKey,
      },
      {
        /*query*/
      }
    );
    const res = mockResponse();
    await controllers.deleteSample(req, res);
    const sample = res.json.mock.calls[0][0];
    const expectedMessage = `Sample deletion not yet implemented [${uuidKey}]`;
    expect(res.status.mock.calls[0][0]).toEqual(404);
    expect(sample.message).toEqual(expectedMessage);
  });

  test("DELETE : Should return a 404 if no param is passed", async () => {
    const uuidKey = uuid.v4();
    const req = mockRequest(
      {
        /*session*/
      },
      {
        /*body*/
      },
      {
        /*params*/
      },
      {
        /*query*/
      }
    );
    const res = mockResponse();
    await controllers.deleteSample(req, res);
    const resContent = res.json.mock.calls[0][0];
    expect(res.status.mock.calls[0][0]).toEqual(500);
    const expectedMessage =
      'There was an error running sampleCode deletion for "undefined"';
    expect(resContent.message).toEqual(expectedMessage);
  });
});
