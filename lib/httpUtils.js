module.exports = {
  extractPostBody : (req, callback) => {
    var payload = new Buffer(0);

    req.on('data', (data) => {
      payload = Buffer.concat([payload, data]);
    });

    req.on('end', () => {
      callback(undefined, payload);
    });
  }
}
