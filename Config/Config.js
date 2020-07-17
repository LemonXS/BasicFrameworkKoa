const env = process.env.NODE_ENV//环境参数

let MYSQL_CONF;
let MongoDB_CONF;

if (env === 'dev') {
    MYSQL_CONF = {
        DATABASE: 'koaproj', //数据库名称
        USERNAME: 'root', //mysql用户名
        PASSWORD: '13579468250', //mysql密码
        PORT: '3306', //mysql端口号
        HOST: '127.0.0.1' //服务器ip
    }
    MongoDB_CONF={
        dbUrl:'mongodb://localhost:27017/',
        dbName:'koa'
    }
}

// if (env === 'production') {
    MYSQL_CONF = {
        DATABASE: 'koaproj', //数据库名称
        USERNAME: 'root', //mysql用户名
        PASSWORD: '13579468250', //mysql密码
        PORT: '3306', //mysql端口号
        HOST: '127.0.0.1' //服务器ip
    }
    MongoDB_CONF={
        dbUrl:'mongodb://localhost:27017/',
        dbName:'koa'
    }
// }


const conf={
    secret:'abcdefghigklmnopqrstuvwsyz', //token的密钥
    appkey:['abcdefghigklmnopqrstuvwsyz'] ,//session 或 cookie的密钥
    aes256key:"abcdefghigklmnopqrstuvwsyz123456",//aes256密钥
    ivkey:"",//aes256 iv
    public_key : "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGp/2IzCUcjbZg6Y1rJzthI48r7EyeRonRS3E10WH1mU6mA0jS6eoam0KYSyibYChNzTdBFb5Rm/QJtQiy5kqEwxcvbIBplyUWStoptrh4A4gku9N65NbEBluzrLOW3ttM01Km5wXVRBRyXZcynWkJ+3vhBEpJg/ycYz6AAVEwXQIDAQAB",
    privatePem :"MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMan/YjMJRyNtmDpjWsnO2EjjyvsTJ5GidFLcTXRYfWZTqYDSNLp6hqbQphLKJtgKE3NN0EVvlGb9Am1CLLmSoTDFy9sgGmXJRZK2im2uHgDiCS703rk1sQGW7Oss5be20zTUqbnBdVEFHJdlzKdaQn7e+EESkmD/JxjPoABUTBdAgMBAAECgYB7UlYF0hVHwIFzcAkmd9hY2SZL8gkuSEPN9bN14WGagW1dibRvml6F3dRdjmrK6cqbYcXnVYQsTVAVppib1nJzF5PsodMSQUaIIP5GUsINZfjRxZHLko6rRHAqqBMJwzA2GLssyc4Ox+0ljzSroEStpKx3TFKZHorti0vNe4SsgQJBAPL4Rnj7haq3M6A3cWjpTysoxYsIzOuv5GfFZ3KkkudFcRF0uscU6jDAtstd1B79Ol8WoaacFsTFNjsl4pCmdWUCQQDRT1W/mJj90QUGqm0XNsgkuSDUmSN85o2/loetBdEpLqes6vNeESG0yl9yv4FZCth8vnlTmcbQARUfJwhDn/uZAkEAhzcUQQ/4+2CpImi4fKIapPIzvYRQRnnEqtt5Dpv4BSzoF8bWiyRgkHEvSU4WVoimi3SU0ZvcL/VwkMospEN+4QJAVCzHm0nPHSQWFVwsiw1o5/vbjCQZ9XzyvH3ZCmgweZNds1i5jrbtCzvnrsn9RsXp0iD3wfsxzSziRaj41dlc4QJAGbpFc24Db1jLE0F4hA3ol9ULqbZhG7S0tcxu+KbQz1OmWR0aLMKAXnt+AiIdJzxCaObVBzzLm2PHRjwWHflsVg==",
   
    // yyzh:"a32448bc6cf9427abd19613c50157ef4",
    // csmy:"12345678901234567890123456789012",
    // ewmurl:"http://192.168.3.10",
    // invoiceurl: "http://10.1.93.157:8080/dzpj/rest",
    // // invoiceurl: "http://127.0.0.1:8080/dzpj/rest",
    // serial_number:"i5amcc5g3ryteq5sqj2x8jhozhz42q9f",

    // invoice:{
    //  url:"http://61.152.146.52:9955/agency-front/agency3/rest.do",
    //  agency_code:"00021001017001",
    //  app_id:"A32448BC6CF9427ABD19613C50157EF4",
    //  appkey:"439D1FA6A6914D3EAABA4C1FC7D657FF",
    // },
    MYSQL_CONF:MYSQL_CONF,
    MongoDB_CONF:MongoDB_CONF
}



module.exports=conf;