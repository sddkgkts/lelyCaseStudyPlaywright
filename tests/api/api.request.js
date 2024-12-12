const httpClient = require('../../utils/requestHelper');

class APIRequests {
  static async getRequest(endPoint) {
    const response = await httpClient.get(endPoint);
    return response.data;
  }

  static async postRequest(endPoint, userData) {
    const response = await httpClient.post(endPoint, userData);
    return response.data;
  }
}

module.exports = APIRequests;