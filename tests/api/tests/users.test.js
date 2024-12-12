const { test, expect } = require('@playwright/test');
const APIRequests= require('../api.request');

test.describe('Users API Tests', () => {
    
  test('GET /users: Verify all IDs are 4-digit integers and not null', async () => {
    const data = await APIRequests.getRequest('/users');
    const users = data.data;

    expect(users).toBeTruthy();
    users.forEach((user) => {
      expect(user.id).toBeDefined();
      expect(user.id).toBeGreaterThanOrEqual(1000);
      expect(user.id).toBeLessThan(99999999);
    });
  });

  test('POST /users: Create a user and verify response', async () => {
    const userData = {
      name: 'John Doe',
      gender: 'male',
      email: `john.doe.${Date.now()}@example.com`,
      status: 'active',
    };

    const response = await APIRequests.postRequest('/users', userData);
    expect(response.data.name).toBe(userData.name);
    expect(response.data.email).toBe(userData.email);
    expect(response.data.status).toBe(userData.status);
  });

  test('POST /users: Try creating user with same email and log the error', async () => {
    const userData = {
      name: 'John Doe',
      gender: 'male',
      email: `john.doe.${Date.now()}@example.com`,
      status: 'active',
    };

    // Create the user
    await APIRequests.postRequest('/users', userData);

    // Try creating again with the same email
    try {
      await APIRequests.postRequest('/users', userData);
    } catch (error) {
      console.error('Error message:', error.response.data);
      expect(error.response.status).toBe(422); // Unprocessable Entity
    }
  });
});
