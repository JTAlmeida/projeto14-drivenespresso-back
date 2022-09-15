import db from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function userSignIn(req, res) {
  const user = req.body;

  try {
    const thisUser = await db
      .collection("users")
      .findOne({ email: user.email });

    const validatePassword = hasUser
      ? bcrypt.compareSync(user.password, thisUser.password)
      : false;

    if (!thisUser || !validatePassword) {
      return res
        .status(422)
        .send({ message: "Erro: email e/ou senha inválido(s)." });
    }

    await db.collection("sessions").deleteMany({ userId: thisUser._id });

    const token = uuid();

    await db.collection("sessions").insertOne({ token, userId: thisUser._id });

    return res.status(200).send({
      message: `${thisUser.name} successfully logged in!`,
      token,
      user: { name: thisUser.name, email: thisUser.email },
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
