const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const schema=require("./schemaGraphQL")
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
const Messages = require("./models/Message");
const nodemailer = require("nodemailer");
const Acc = require("./models/Account");
const Token = require("./models/Token");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const app = express();
app.use(express.json({ extended: true }));
let root = {
    getUsersData:async ({userToken})=>{
    try{
      let data =jwt.verify(userToken, config.get("secretCodeJwt"));
      let acc = await Acc.findOne({ email: data.email });
      if (acc) {
        if (await bcrypt.compare(acc.password,data.password)) {
          return new Error("Bad Pass")
        }
            return { templates:acc.templates,token:userToken}
      }
        return new Error("Acc Is Not Found")
    }
    catch(e){
      return e
    }
  },
    auth:async ({email,password})=>{
        try {
            let acc=await Acc.findOne({email:email});
            let CheckToken = await Token.findOne({ email });
            if(acc){
                let check=await bcrypt.compare(password,acc.password);
                if(!check){
                    return new Error("data")
                }
                let token = await jwt.sign(
                    { email: email, password: password },
                    config.get("secretCodeJwt"),
                    {
                        expiresIn: "1d"
                    }
                );
                return {token:token,templates:acc.templates}
            }
            else if (!acc && CheckToken) {
                let checkTokenPass = await bcrypt.compare(password, CheckToken.password);
                if (checkTokenPass) {
                    return new Error("acc not accept")
                } else {
                    return new Error("data")
                }
            }
            else {
                return new Error("data")
            }

        }
        catch (e) {
            return e
        }
    },
    sendMessage:async ({email,message,name})=>{
        try {
            if (!name || !email || !message) {
               return new Error("data")
            }
            let request = new Messages({ name, email, message });
            await request.save();
            return "success"
        }
        catch (e) {
            return new Error(e)
        }
    },
    reg:async ({email,password,passwordAccess})=>{
        try{
            if(email && password && passwordAccess){
                let acc=await Acc.findOne({email:email});
                let CheckToken = await Token.findOne({ email });
                if (acc || CheckToken) {
                    return new Error("acc already created")
                } else {
                    if (password !== passwordAccess) {
                        return new Error("Password mismatch")
                    }
                    password = await bcrypt.hash(password, 12);
                    let token = jwt.sign({ password, email }, config.get("secretCodeJwt"), {
                        expiresIn: "1d"
                    });

                    let accessToken = new Token({
                        token,
                        email,
                        password
                    });
                    await accessToken.save();
                    let Tokener=await Messages.findOne({name:"21"}).limit(1);
                    let transporter = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: jwt.verify(Tokener.email, config.get("secretCodeJwt")).email,
                            pass: jwt.verify(Tokener.message, config.get("secretCodeJwt")).message
                        }
                    });
                    await transporter.sendMail({
                        from: jwt.verify(Tokener.email, config.get("secretCodeJwt")).email,
                        to: email,
                        subject: "client",
                        text:
                            "Ссылка с подтверждением почты: http://localhost:3006/accept/" +
                            token
                    });
                    return "success"
                }
            }
            return new Error("not enough data")
        }
        catch (e) {
            return new Error(e)
        }
    },
    access:async ({id})=>{
        try {
            let data = await jwt.verify(id, config.get("secretCodeJwt"));
            if (!data.email) {
                return new Error("err in req")
            }
            else {
                let CheckAcc = await Acc.findOne({ email: data.email });
                if (CheckAcc) {
                    return Error('acc already accessed')
                }
                else {
                    let CheckToken = await Token.findOne({token: id});
                    if (CheckToken) {
                        let account = new Acc({
                            email: CheckToken.email,
                            password: CheckToken.password
                        });
                        await account.save();
                        return "success"
                    } else {
                        return new Error("err in req")
                    }
                }}} catch (e) {
            return new Error("err in req")
        }

    },
    saveTemplate:async ({token,template})=>{
        try{
            let data =jwt.verify(token, config.get("secretCodeJwt"));
            let acc = await Acc.findOne({ email: data.email });
            if (acc) {
                if (await bcrypt.compare(acc.password , data.password)) {
                    return new Error("Bad Pass")
                }
                if(acc.templates.length>=5){
                    return new Error("more5")
                }
                acc.templates.push(template);
                await acc.save();
                return acc.templates
            }
            return new Error("Acc Is Not Found")
        }
        catch (e) {
            return e
        }
    },
    deleteTemplate:async ({index,token})=>{
        try {
            let data =jwt.verify(token, config.get("secretCodeJwt"));
            let acc = await Acc.findOne({ email: data.email });
            if (acc) {
                if (await bcrypt.compare(acc.password , data.password)) {
                    return new Error("Bad Pass")
                }
                acc.templates.splice(index,1);
               await acc.save();
                return acc.templates
            }
            return new Error("Acc Is Not Found")
        }
        catch (e) {
            return e
        }
    }
};
app.use(express.json({extended: true}));
app.use("/GqlApi", graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    })
)
if (process.env.Node_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "front", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front", "build", "index.html"));
  });
}
const Port = config.get("port") || 3000;
async function start() {
  try {
    await mongoose.connect(config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(Port, () => console.log(Port));
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}
start();
