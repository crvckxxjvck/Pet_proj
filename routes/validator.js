const Ajv = require("ajv");

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 100,
      pattern: "^[a-zA-Z]+$",
    },
    surname: {
      type: "string",
      minLength: 1,
      maxLength: 100,
      pattern: "^[a-zA-Z]+$",
    },
    login: {
      type: "string",
      minLength: 1,
      maxLength: 100,
      pattern: "^[0-9a-zA-Z]+$",
    },
    password: {
      type: "string",
      minLength: 1,
      maxLength: 512,
    },
    mail: {
      type: "string",
      minLength: 1,
      maxLength: 255,
      pattern: "^[^s@]+@[^s@]+.[^s@]+$",
    },
    telephone: {
      type: "string",
      minLength: 5,
      maxLength: 15,
    },
    dateBirthday: {
      type: "string",
      minLength: 5,
      maxLength: 15,
    },
  },
};

const validator = (req, res, next) => {
  const ajv = new Ajv({ allErrors: true });

  const valid = ajv.validate(schema, req.body);
  console.log(req.body);

  const passValidateError = {keyword: "match", dataPath: ".password"};
  let allErrors = [];
  if ( req.body.password_confirm  &&    (req.body.password !== req.body.password_confirm)     )  {allErrors.push(passValidateError)};
     
  if (!valid) {
    res.send(ajv.errors);

    return;
  };

  if (valid && allErrors.length > 0) {
    res.send(allErrors);

    return;
  }
  next();
};

module.exports = validator;
