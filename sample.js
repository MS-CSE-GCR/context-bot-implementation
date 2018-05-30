const dialogs = [
    {
        
        name:"main",
        type:"dialog",
        body:[
            {
                key:"doMain",
                msg:"Main Menu",
                type:"menu",
                options:{
                    "Input your location":"inputLocation",
                    "Make Call":"call",
                    "Schedule Meeting":"meeting",
                    "Send Mail":"mail",
                    "Quit":"quit"
                }
                
            }
        ]
    },
    {
        name:"inputLocation",
        type:"dialog",
        body:[
            {
                key:"setLocation",
                msg:"Please input your location",
                type:"text",
            },
            {
                key:"doDefect",
                msg:"Do you want to check defects?",
                type:"confirm",
            },
            {
                key:"chooseCheckList",
                msg:"Select a check list?",
                type:"menu",
                optionsfunc:function(){
                    //mockup data from database
                    return {
                        "list 1":"checklist1",
                        "list 2":"checklist2"
                    };
                }
                
            }
        ],
        cancel:/^nevermind$|^cancel$/i
    },
    {
        name:"checklist",
        type:"programic",
        body:function() {
            //mockup data from database
            return [
                {
                    name:"checklist1",
                    type:"dialog",
                    body:[
                        {
                            key:"checklist1-q1",
                            msg:"checklist1 q1?",
                            type:"choice",
                            options:{
                                "Checked":"Checked",
                                "Unchecked":"Unchecked",
                                "N/A":"N/A"
                            },
                            
                        },
                        {
                            key:"checklist1-questionfollowup",
                            msg:"checklist1 q1 questionfollowup?",
                            type:"goto",
                            dialog:"questionfollowup"
                            
                        },
                        {
                            key:"checklist1-q2",
                            msg:"checklist1 q2?",
                            type:"choice",
                            options:{
                                "Checked":"Checked",
                                "Unchecked":"Unchecked",
                                "N/A":"N/A"
                            },
                            
                        },
                        {
                            key:"checklist1-questionfollowup",
                            msg:"checklist1 q2 questionfollowup?",
                            type:"goto",
                            dialog:"questionfollowup"
                            
                        },
                        
                    ]
                },
                {
                    name:"checklist2",
                    type:"dialog",
                    body:[
                        {
                            key:"checklist2-q1",
                            msg:"checklist2 q1?",
                            type:"choice",
                            options:{
                                "Checked":"Checked",
                                "Unchecked":"Unchecked",
                                "N/A":"N/A"
                            },
                            
                        },
                        {
                            key:"checklist2-questionfollowup",
                            msg:"checklist2 q1 questionfollowup?",
                            type:"goto",
                            dialog:"questionfollowup"
                            
                        },
                        {
                            key:"checklist2-q2",
                            msg:"checklist2 q2?",
                            type:"choice",
                            options:{
                                "Checked":"Checked",
                                "Unchecked":"Unchecked",
                                "N/A":"N/A"
                            },
                           
                        },
                        {
                            key:"checklist2-questionfollowup",
                            msg:"checklist2 q2 questionfollowup?",
                            type:"goto",
                            dialog:"questionfollowup"
                            
                        },
                        
                    ]
                },
            ]
        }
    },
    {
        
        name:"questionfollowup",
        type:"dialog",
        body:[
            {
                key:"questionfollowup",
                msg:"Follow up",
                type:"menu",
                options:{
                    "Create Defect":"newDefect",
                    "Make Call":"call",
                    "Schedule Meeting":"meeting",
                    "Send Mail":"mail",
                    "Next Question":"goup",
                    "Quit":"quit"
                }
                
            }

            
        ]
    },
    {
        
        name:"newDefect",
        type:"dialog",
        body:[
            {
                "key":"doNewDefect",
                "msg":"Create Defect",
                "action":function(res) {
                    return "Create Defect: "+res;
                }
            },
        ]
    },
    {
        
        name:"call",
        type:"dialog",
        body:[
            {
                "key":"doCall",
                "msg":"Make Call",
                "action":function(res) {
                    return "Make Call: "+res;
                }
            },
        ]
    },
    {
        
        name:"meeting",
        type:"dialog",
        body:[
            {
                "key":"doMeeting",
                "msg":"Schedule a meeting",
                "action":function(res) {
                    return "Schedule a meeting: "+res;
                },
                "goto":"main"
            },
            
        ]
    },
    {
        
        name:"mail",
        type:"dialog",
        body:[
            {
                "key":"doMail",
                "msg":"Send Mail",
                "action":function(res) {
                    return "Send Mail: "+res;
                }
            },
        ]
    },
    {
        
        name:"goup",
        type:"goup",
        
    },
    {
        
        name:"quit",
        type:"quit",
    },

]


module.exports = dialogs;