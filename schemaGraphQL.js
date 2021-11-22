const graphql = require("graphql");
const buildSchema = graphql.buildSchema;
let schema = buildSchema(`
    type Query {
        getUsersData(userToken:String):UserData,
        auth(password:String!,email:String!):authData,
        reg(email:String!,password:String!,passwordAccess:String!):String,
        access(id:String!):String
    }
    type authData {
        templates:[TemplatesType],
        token:String
    }
    type UserData {
        templates:[TemplatesType],
        token:String
    }
    type TemplatesType {
        generalBackgroundColor:String,
        formBackgroundColor:String,
        titleColor:String,
        descriptionColor:String,
        formWidth:Int,
        formMarginTop:Int,
        buttHeight:Int,
        buttWidth:Int,
        textColor:String,
        buttColor:String,
        buttTextColor:String,
        title:String,
        labelsPosition:String,
        numOfFields:Int,
        inputs:[InputsType]
    }
    type InputsType {
        id:String,
        name:String,
        placeholder:String,
        type:String,
        width:Int,
        height:Int,
        fieldDescription:String,
        descriptionPosition:String
        
    }
    type Mutation{
        saveTemplate(token:String!,template:saveTemplateTemplatesType!):[TemplatesType],
        deleteTemplate(index:Int!,token:String!):[TemplatesType],
        sendMessage(name:String!,email:String!,message:String!):String
    }
    input saveTemplateTemplatesType {
        generalBackgroundColor:String,
        formBackgroundColor:String,
        titleColor:String,
        descriptionColor:String,
        formWidth:Int,
        formMarginTop:Int,
        buttHeight:Int,
        buttWidth:Int,
        textColor:String,
        buttColor:String,
        buttTextColor:String,
        title:String,
        labelsPosition:String,
        numOfFields:Int,
        inputs:[saveTemplateInputType]
    }
    input saveTemplateInputType {
        id:String,
        name:String,
        placeholder:String,
        type:String,
        width:Int,
        height:Int,
        fieldDescription:String,
        descriptionPosition:String
        
    }
`
);
module.exports=schema;