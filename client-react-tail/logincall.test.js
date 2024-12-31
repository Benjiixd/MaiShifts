const loginCall = require('./logincall');

test('loginCall', async () => {
    const data = await loginCall('ben', 'ben');
    expect(data).toHaveProperty('token');
});