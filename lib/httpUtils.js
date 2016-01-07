module.exports = {
  extractPostBody : (req, callback) => {
    var payload = new Buffer(0);

    req.on('data', (data) => {
      payload = Buffer.concat([payload, data]);
    });

    req.on('end', () => {
      callback(undefined, payload);
    });
  },
  extractJsonPostBody : (req, callback) => {
    module.exports.extractPostBody(req, (err, payload) => {
      const jsonPayload = JSON.parse(payload);
      callback(undefined, jsonPayload);
    })
  }
}
