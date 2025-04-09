import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();
const port = 3000;
import { hash, compare } from "bcryptjs";
const salt = 10;
import crypto from "crypto";
const secretString = crypto.randomBytes(32).toString("hex");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const password = await req.body.password;
  const email = await req.body.email;
  const VerifyAccount = await AuthCheck(email);
  //console.log(VerifyAccount)
  if (VerifyAccount) {
    return res.json({ message: "Account already exists" });
  }
  let passData = await hashFnx(password);
  const userInfo = {
    email: email,
    password: passData,
  };
  const fileExists = fs.existsSync("users.json");
  if (fileExists) {
    //append
    const getData = fs.readFileSync("users.json", "utf-8");
    const parseData = JSON.parse(getData);
    parseData.push(userInfo);
    //console.log(userInfo)
    fs.writeFileSync("users.json", JSON.stringify(parseData));
  } else {
    //create
    fs.writeFileSync("users.json", JSON.stringify([userInfo]));
  }
  res.json({ message: "Signup Successful" });
});

app.listen(port, () => {
  console.log(`Server Start on port ${port}`);
});

//hashing
async function hashFnx(password, encrypt) {
  const hashformPassword = await hash(password, salt);
  //console.log(hashformPassword);
  return await encryption(hashformPassword);
}

//encryption
async function encryption(hashformPassword) {
  const Extra = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretString, "hex"),
    Extra
  );
  let encrypt = cipher.update(hashformPassword, "utf-8", "hex");
  encrypt += cipher.final("hex");
  const final = Extra.toString("hex") + ":" + encrypt;
  //console.log(final);
  return final;
}

let temp;
async function AuthCheck(email) {
  const fileExists = fs.existsSync("users.json");
  if (fileExists) {
    const getData = fs.readFileSync("users.json", "utf-8");
    const parseData = JSON.parse(getData);
    parseData.filter((data) => {
      if (data.email === email) {
        return (temp = true);
      } else {
        return (temp = false);
      }
    });
  } else {
    return false;
  }
  return temp;
}

app.post("/login", async (req, res) => {
  const password = await req.body.password;
  const email = await req.body.email;
  const VerifyAccount = await AuthCheck(email);
  //console.log(VerifyAccount)
  if (!VerifyAccount) {
    return res.json({ message: "Account does not exist" });
  } else {
    const getData = fs.readFileSync("users.json", "utf-8");
    const parseData = JSON.parse(getData);
    parseData.filter(async (data) => {
      if (data.email === email) {
        const pass = data.password;
        const decryptedText = await decryption(pass);
        const match = await compare(password, decryptedText);
        if (match) {
          return res.json({ message: "Login Successful", email: data.email });
        }
      }
    });
  }
});

//decryption
async function decryption(pass) {
  const [Extra, encryptedText] = pass.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretString, "hex"),
    Buffer.from(Extra, "hex")
  );
  let decrypt = decipher.update(encryptedText, "hex", "utf-8");
  decrypt += decipher.final("utf-8");
  //console.log(decrypt);
  return decrypt;
}
