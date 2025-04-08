declare const GetApiV1Chatbots: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                };
                readonly additionalProperties: false;
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApiV1Getcontacts: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Page Size";
                };
                readonly pageNumber: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Page Number";
                };
                readonly name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Contact Name";
                };
                readonly attribute: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Attribute (parameters format : [{name: \"name\", operator: \"contain\", value: \"test\"}] )<br />\r\nPossible values for operator are contain, notContain, exist, notExist, ==, !=, valid, invalid";
                };
                readonly createdDate: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Created Date (YYYY-MM-DD or MM-DD-YYYY)";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const GetApiV1Getmedia: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly fileName: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Filename format should be full path. For example: data/images/c1d465a1-3cbf-4190-a936-1c2ddd63f057.jpg";
                };
            };
            readonly required: readonly ["fileName"];
        }];
    };
};
declare const GetApiV1GetmessagesWhatsappnumber: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Page Size";
                };
                readonly pageNumber: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Page Number";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const GetApiV1Getmessagetemplates: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly pageSize: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Page Size";
                };
                readonly pageNumber: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Page Number";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const GetApiV1OrderDetailsReferenceid: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["referenceId"];
        }];
    };
};
declare const GetApiV1PaymentStatusReferenceid: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["referenceId"];
        }];
    };
};
declare const PostApiV1AddcontactWhatsappnumber: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly customParams: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly value: {
                            readonly type: "string";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }];
    };
};
declare const PostApiV1Assignoperator: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly email: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "User Email (if Email is not specified, the chat will be assigned to the Bot)";
                };
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }];
    };
};
declare const PostApiV1ChatbotsStart: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
                readonly chatbotId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Chatbot Id";
                };
            };
            readonly required: readonly ["whatsappNumber", "chatbotId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "string";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApiV1Rotatetoken: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Token to block";
                };
            };
            readonly required: readonly ["token"];
        }];
    };
};
declare const PostApiV1Sendinteractivebuttonsmessage: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly body: {
                readonly type: "string";
                readonly maxLength: 1024;
                readonly minLength: 0;
            };
            readonly footer: {
                readonly type: "string";
                readonly maxLength: 60;
                readonly minLength: 0;
            };
            readonly header: {
                readonly type: "object";
                readonly properties: {
                    readonly text: {
                        readonly type: "string";
                        readonly maxLength: 60;
                        readonly minLength: 0;
                    };
                    readonly type: {
                        readonly type: "string";
                    };
                    readonly media: {
                        readonly type: "object";
                        readonly properties: {
                            readonly url: {
                                readonly type: "string";
                            };
                            readonly fileName: {
                                readonly type: "string";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly additionalProperties: false;
            };
            readonly buttons: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly text: {
                            readonly type: "string";
                            readonly maxLength: 20;
                            readonly minLength: 0;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }];
    };
};
declare const PostApiV1Sendinteractivelistmessage: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly body: {
                readonly type: "string";
                readonly maxLength: 1024;
                readonly minLength: 0;
            };
            readonly footer: {
                readonly type: "string";
                readonly maxLength: 60;
                readonly minLength: 0;
            };
            readonly header: {
                readonly type: "string";
                readonly maxLength: 60;
                readonly minLength: 0;
            };
            readonly sections: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly rows: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly title: {
                                        readonly type: "string";
                                        readonly maxLength: 24;
                                        readonly minLength: 0;
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly maxLength: 72;
                                        readonly minLength: 0;
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly title: {
                            readonly type: "string";
                            readonly maxLength: 24;
                            readonly minLength: 0;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly buttonText: {
                readonly type: "string";
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }];
    };
};
declare const PostApiV1SendsessionfileWhatsappnumber: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["file"];
        readonly properties: {
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly caption: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "(optional)";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const PostApiV1SendsessionmessageWhatsappnumber: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly messageText: {
                    readonly type: "string";
                    readonly maxLength: 4096;
                    readonly minLength: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Message to send";
                };
            };
            readonly required: readonly ["messageText"];
        }];
    };
};
declare const PostApiV1Sendtemplatemessage: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["broadcast_name", "parameters", "template_name"];
        readonly properties: {
            readonly parameters: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["name", "value"];
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                        readonly value: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly template_name: {
                readonly type: "string";
                readonly minLength: 1;
            };
            readonly broadcast_name: {
                readonly type: "string";
                readonly minLength: 1;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }];
    };
};
declare const PostApiV1Sendtemplatemessagecsv: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["whatsapp_numbers_csv"];
        readonly properties: {
            readonly whatsapp_numbers_csv: {
                readonly type: "string";
                readonly format: "binary";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly template_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Defined in the Template Message under Broadcast";
                };
                readonly broadcast_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Broadcast Name";
                };
            };
            readonly required: readonly ["template_name", "broadcast_name"];
        }];
    };
};
declare const PostApiV1Sendtemplatemessages: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["broadcast_name", "receivers", "template_name"];
        readonly properties: {
            readonly receivers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["customParams", "whatsappNumber"];
                    readonly properties: {
                        readonly customParams: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                    };
                                    readonly value: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly whatsappNumber: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly template_name: {
                readonly type: "string";
                readonly minLength: 1;
            };
            readonly broadcast_name: {
                readonly type: "string";
                readonly minLength: 1;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const PostApiV1Updatechatstatus: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["ticketStatus", "whatsappNumber"];
        readonly properties: {
            readonly ticketStatus: {
                readonly type: "string";
                readonly minLength: 1;
            };
            readonly whatsappNumber: {
                readonly type: "string";
                readonly minLength: 1;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const PostApiV1UpdatecontactattributesWhatsappnumber: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly customParams: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly value: {
                            readonly type: "string";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }];
    };
};
declare const PostApiV1Updatecontactattributesformulticontacts: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["contacts"];
        readonly properties: {
            readonly contacts: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["customParams", "whatsappNumber"];
                    readonly properties: {
                        readonly customParams: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                    };
                                    readonly value: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly whatsappNumber: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const PostApiV2Sendtemplatemessage: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["broadcast_name", "parameters", "template_name"];
        readonly properties: {
            readonly parameters: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["name", "value"];
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                        readonly value: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly template_name: {
                readonly type: "string";
                readonly minLength: 1;
            };
            readonly broadcast_name: {
                readonly type: "string";
                readonly minLength: 1;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly whatsappNumber: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "WhatsApp Number with country code. Example, 85264318721";
                };
            };
            readonly required: readonly ["whatsappNumber"];
        }];
    };
};
declare const PostApiV2Sendtemplatemessages: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["broadcast_name", "receivers", "template_name"];
        readonly properties: {
            readonly receivers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["customParams", "whatsappNumber"];
                    readonly properties: {
                        readonly customParams: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                    };
                                    readonly value: {
                                        readonly type: "string";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly whatsappNumber: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly template_name: {
                readonly type: "string";
                readonly minLength: 1;
            };
            readonly broadcast_name: {
                readonly type: "string";
                readonly minLength: 1;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
export { GetApiV1Chatbots, GetApiV1Getcontacts, GetApiV1Getmedia, GetApiV1GetmessagesWhatsappnumber, GetApiV1Getmessagetemplates, GetApiV1OrderDetailsReferenceid, GetApiV1PaymentStatusReferenceid, PostApiV1AddcontactWhatsappnumber, PostApiV1Assignoperator, PostApiV1ChatbotsStart, PostApiV1Rotatetoken, PostApiV1Sendinteractivebuttonsmessage, PostApiV1Sendinteractivelistmessage, PostApiV1SendsessionfileWhatsappnumber, PostApiV1SendsessionmessageWhatsappnumber, PostApiV1Sendtemplatemessage, PostApiV1Sendtemplatemessagecsv, PostApiV1Sendtemplatemessages, PostApiV1Updatechatstatus, PostApiV1UpdatecontactattributesWhatsappnumber, PostApiV1Updatecontactattributesformulticontacts, PostApiV2Sendtemplatemessage, PostApiV2Sendtemplatemessages };
