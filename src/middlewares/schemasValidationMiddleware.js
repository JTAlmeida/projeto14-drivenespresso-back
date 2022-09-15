import joi from "joi";

export async function signInValidation(req, res, next) {
  const user = req.body;

  const validation = joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .validate(user, { abortEarly: false });

  if (validation.error) {
    const err = validation.error.details.map((error) => {
      return error.message;
    });
    return res.status(422).send({ message: err });
  }

  next();
}

export async function signUpValidation(req, res, next) {
  const user = req.body;

  const validation = joi
    .object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      confirmPassword: joi.ref("password"),
    })
    .validate(user, { abortEarly: false });

  if (validation.error) {
    const err = validation.error.details.map((error) => {
      return error.message;
    });
    return res.status(422).send({ message: err });
  }
  
  next();
}
