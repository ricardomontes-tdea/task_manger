const { validateFields } = require("../../middlewares/validateFields");
const httpMock = require("node-mocks-http");

const next = jest.fn();

describe("validateFields", () => {
  test("should validate if email is empty", () => {
    const request = httpMock.createRequest({
      body: {},
    });

    const respose = httpMock.createResponse();

    const result = validateFields(request, respose, next);

    console.log(result);
  });
});
