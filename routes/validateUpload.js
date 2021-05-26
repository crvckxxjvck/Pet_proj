const Ajv = require("ajv");

const schema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
      maxLength: 100,
      pattern: "^[a-zA-Z]+$",
    },
    tags: {
      type: "string",
      minLength: 1,
      maxLength: 100,
      pattern: "^[a-zA-Z \,]+$",
    },
  },
};

const validateUpload = (req, res, next) => {
  const ajv = new Ajv({ allErrors: true });

  const valid = ajv.validate(schema, req.body);

  if (!valid) {
    res.send(ajv.errors);

    return;
  }
  next();
};

module.exports = validateUpload;
