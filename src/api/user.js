import axios from "axios";

export async function newUser(name, email, password) {
  try {
    const { data } = await axios.post("http://localhost:3333/register", {
      name,
      email,
      password,
    });
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function loginUser(email, password) {
  try {
    const data = await axios.post("http://localhost:3333/login", {
      email,
      password,
    });
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
