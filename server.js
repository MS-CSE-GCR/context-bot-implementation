var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var inMemoryStorage = new builder.MemoryBotStorage();

var dialogsModel = require('./sample.js'); 


// This bot ensures user's profile is up to date.
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.beginDialog('main');
    }
]).set('storage', inMemoryStorage); // Register in-memory storage 


var dialogsModel = require('./sample.js'); 

const buildModel = function(bot, dialogsModel) {
    for(let dialogModel of dialogsModel) {
        let func = [];
        if(dialogModel.type=="goup") {
           
            func.push(
                function(session, results){
                    session.endDialog();
                }
            );

        } else if(dialogModel.type=="quit") {
           
            func.push(
                function(session, results){
                    var msg = `Quit the conversation`;
                    session.endConversation(msg);
                }
            );

        } else if(dialogModel.type=='dialog') {
            for(let idx in dialogModel.body) {
                let item = dialogModel.body[idx];
                let lastitem = idx>0?dialogModel.body[idx-1]:null;
                (function(item, lastitem, idx) {
                    if(item.type=="goto") {
                       
                        func.push(
                            function(session, results){
                                session.beginDialog(item.dialog);
                            }
                        );
                    } else if(!item.action) {
                        func.push(
                            function(session, results, next){
                                if(item.type=="choice" || item.type=="menu") {
                                    if(item.optionsfunc) {
                                        builder.Prompts.choice(session, item.msg, item.optionsfunc(), { listStyle: 3 });
                                    } else if(item.options) {
                                        builder.Prompts.choice(session, item.msg, item.options, { listStyle: 3 });
                                    } else {
                                        next()
                                    }
                                } else {
                                    try{
                                        builder.Prompts[item.type](session, item.msg);
                                    } catch(e) {
                                        console.log("wrong type "+item.type);
                                        
                                    }
                                    
                                }
                                
                                if(idx > 0) {
                                    session.dialogData[dialogModel.body[idx-1].key] = results.response;
                                }


                            }
                        );
                    } 

                    if(item.type=="menu") {
                        let options = item.options || item.optionsfunc()
                        func.push(
                            function(session, results){
                                if(results.response){
                                    var opt = options[results.response.entity]
                                    session.beginDialog(opt);
                                }
                            }
                        );
                    }
                    if(item.action) {
                        func.push(
                            function(session, results){
                                builder.Prompts.text(session, item.msg);
                            }
                        );
                        func.push(
                            function(session, results){
                                session.send(item.action(results.response));
                                session.endDialog();
                                if(item.goto) {
                                    session.beginDialog(item.goto);
                                }
                            }
                        );
                    } else if(idx == dialogModel.body.length-1) {
                        func.push(
                            function(session, results){
                                if(lastitem)
                                    session.dialogData[lastitem.key] = results.response;
                                session.endDialog();
                            }
                        );
                    }
                    
                })(item, lastitem, idx);
                
            }
        } else if(dialogModel.type=='programic') {
            const dialogModel2 = dialogModel.body();
            buildModel(bot, dialogModel2)
        }
        var dialog = bot.dialog(dialogModel.name, func);
        if(dialogModel.cancel) {
            dialog.cancelAction('cancelAction', 'Cancel dialog', {
                matches: dialogModel.cancel
            });
        }

    }
}




buildModel(bot, dialogsModel);
