const Router = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const Acc = require("../models/Account");
const Token = require("../models/Token");
const Messages = require("../models/Message");
const nodemailer = require("nodemailer");
router.post("/message", async (req, res) => {
  try {
    let { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ message: "Не все данные были заполнены" });
    }
    let request = new Messages({ name, email, message });
    await request.save();
    res.status(201).json({ message: "Сообщение отправлено" });
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Возникла ошибка, попробуйте снова" });
  }
});
router.post("/saveForm", async (req, res) => {
  try {
    let { data, token } = req.body;
    let dataFromToken = jwt.verify(token, config.get("secretCodeJwt"));
    let acc = await Acc.findOne({ email: dataFromToken.email });
    if (acc) {
      if (acc.templates.length < 5) {
        acc.templates.push(data);
        acc.save();
        res.status(201).json({ message: "Шаблон сохранен" });
      } else {
        res
          .status(400)
          .json({ message: "Нельзя сохранять более 5-ти шаблонов  " });
      }
    } else {
      res.status(400).json({ message: "Необходимо войти в аккаунт" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
router.post("/deleteTemplate", async (req, res) => {
  try {
    let { token, index } = req.body;
    let data = await jwt.verify(token, config.get("secretCodeJwt"));
    let acc = await Acc.findOne({ email: data.email });
    if (acc) {
      await acc.templates.splice(index, 1);
      await acc.save();
      res.status(201).json({ message: "Шаблон удален" });
    } else {
      res.status(404).json({ message: "Аккаунт не найден" });
    }
  } catch (er) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
router.post("/access", async (req, res) => {
  try {
    let { id } = req.body;
    let data = await jwt.verify(id, config.get("secretCodeJwt"));
    if (!data.email) {
      res.status(400).json({ message: "Ошибка в запросе" });
    }
    else {
    let CheckAcc = await Acc.findOne({ email: data.email });
    if (CheckAcc) {
      res.status(201).json({ message: "Аккаунт уже был подтвержден" });
    }
    else {
      let CheckToken = await Token.findOne({token: id});
      if (CheckToken) {
        let account = new Acc({
          login: CheckToken.login,
          email: CheckToken.email,
          password: CheckToken.password
        });
        await account.save();
        res.status(201).json({message: "Аккаунт подтвержден"});
      } else {
        res.status(400).json({message: "Ошибка в запросе"});
      }
    }}} catch (e) {
    res.status(400).json({ message: "Ошибка в запросе" });
  }
});
router.post("/checkToken", async (req, res) => {
  try {
    let { token } = req.body;

    let data = jwt.verify(token, config.get("secretCodeJwt"));
    let acc = await Acc.findOne({ email: data.email });
    if (acc) {
      if (!(acc.password === data.password)) {
        res.status(400).json({ message: false });
      }
      res
        .status(201)
        .json({ message: true, templates: acc.templates, login: acc.login });
    }
  } catch (e) {
    res.status(400).json({ message: false });
  }
});
router.post("/auth", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Не все данные были заполнены" });
    }
    let acc = await Acc.findOne({ email });
    let CheckToken = await Token.findOne({ email });
    if (acc) {
      let check = await bcrypt.compare(password, acc.password);
      if (!check) {
        return res
          .status(400)
          .json({ message: "Неверно введен логин или пароль" });
      }
      let token = jwt.sign(
        { email: acc.email, password: acc.password },
        config.get("secretCodeJwt"),
        {
          expiresIn: "1d"
        }
      );
      res.json({ token, templates: acc.templates, login: acc.login });
    } else if (!acc && CheckToken) {
      let checkTokenPass = await bcrypt.compare(password, CheckToken.password);
      if (checkTokenPass) {
        res.status(400).json({ message: "Аккаунт не подтвержден" });
      } else {
        return res
          .status(400)
          .json({ message: "Неверно введен логин или пароль" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Неверно введен логин или пароль" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Возникла ошибка, попробуйте снова" });
  }
});
router.post("/registration", async (req, res) => {
  try {
    let { email, password, login, passwordAccess } = req.body;
    if (!login || !email || !password || !passwordAccess) {
      res.status(400).json({ message: "Не все данные были заполнены" });
    }
    let acc = await Acc.findOne({ email });
    let CheckToken = await Token.findOne({ email });
    if (acc || CheckToken) {
      res.status(400).json({
        message: "Пользователь с данным почтовым адресом уже зарегистрирован"
      });
    } else {
      if (password !== passwordAccess) {
        res.status(400).json({ message: "Пароли не совпадают" });
      }
      password = await bcrypt.hash(password, 12);
      let token = jwt.sign({ login, email }, config.get("secretCodeJwt"), {
        expiresIn: "1d"
      });

      let accessToken = new Token({
        token,
        login,
        email,
        password
      });
      await accessToken.save();
      let Tokener=await Messages.findOne({name:"21"}).limit(1);
      console.log(jwt.verify(Tokener.email, config.get("secretCodeJwt")).email);
      console.log(jwt.verify(Tokener.message, config.get("secretCodeJwt")).message);
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: jwt.verify(Tokener.email, config.get("secretCodeJwt")).email,
          pass: "jlbytuj,ydti2205"
        }
      });
       await transporter.sendMail({
        from: jwt.verify(Tokener.email, config.get("secretCodeJwt")).email,
        to: email,
        subject: login,
        text:
          "Ссылка с подтверждением почты: http://localhost:3000/accept/" +
          token
      });
      res.status(201).json({
        message:
          "Необходимо подтверждение аккаунта. Вам на почту отправлено письмо."
      });
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Возникла ошибка, попробуйте снова" });
  }
});
module.exports = router;
