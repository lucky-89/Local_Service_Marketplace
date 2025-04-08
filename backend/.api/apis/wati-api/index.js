"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'wati-api/v1 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Get existing chatbots
     *
     */
    SDK.prototype.getApiV1Chatbots = function () {
        return this.core.fetch('/api/v1/chatbots', 'get');
    };
    /**
     * Get media by file name
     *
     */
    SDK.prototype.getApiV1Getmedia = function (metadata) {
        return this.core.fetch('/api/v1/getMedia', 'get', metadata);
    };
    /**
     * Get Contacts List
     *
     */
    SDK.prototype.getApiV1Getcontacts = function (metadata) {
        return this.core.fetch('/api/v1/getContacts', 'get', metadata);
    };
    /**
     * Rotate Token
     *
     */
    SDK.prototype.postApiV1Rotatetoken = function (metadata) {
        return this.core.fetch('/api/v1/rotateToken', 'post', metadata);
    };
    /**
     * Update WhatsApp Pay order status of an order (Private Beta)
     *
     */
    SDK.prototype.postApiV1Order_status = function () {
        return this.core.fetch('/api/v1/order_status', 'post');
    };
    /**
     * Send WhatsApp Pay order detail message to customer (Private Beta)
     *
     */
    SDK.prototype.postApiV1Order_details = function () {
        return this.core.fetch('/api/v1/order_details', 'post');
    };
    /**
     * Assign User
     *
     */
    SDK.prototype.postApiV1Assignoperator = function (metadata) {
        return this.core.fetch('/api/v1/assignOperator', 'post', metadata);
    };
    /**
     * Start chatbot
     *
     */
    SDK.prototype.postApiV1ChatbotsStart = function (metadata) {
        return this.core.fetch('/api/v1/chatbots/start', 'post', metadata);
    };
    /**
     * Update Chat Status
     *
     */
    SDK.prototype.postApiV1Updatechatstatus = function (body) {
        return this.core.fetch('/api/v1/updateChatStatus', 'post', body);
    };
    /**
     * Get Message Templates
     *
     */
    SDK.prototype.getApiV1Getmessagetemplates = function (metadata) {
        return this.core.fetch('/api/v1/getMessageTemplates', 'get', metadata);
    };
    /**
     * Send template message
     *
     */
    SDK.prototype.postApiV1Sendtemplatemessage = function (body, metadata) {
        return this.core.fetch('/api/v1/sendTemplateMessage', 'post', body, metadata);
    };
    /**
     * Send template message (Beta)
     *
     */
    SDK.prototype.postApiV2Sendtemplatemessage = function (body, metadata) {
        return this.core.fetch('/api/v2/sendTemplateMessage', 'post', body, metadata);
    };
    /**
     * Send template messages
     *
     */
    SDK.prototype.postApiV1Sendtemplatemessages = function (body) {
        return this.core.fetch('/api/v1/sendTemplateMessages', 'post', body);
    };
    /**
     * Send template messages (Beta)
     *
     */
    SDK.prototype.postApiV2Sendtemplatemessages = function (body) {
        return this.core.fetch('/api/v2/sendTemplateMessages', 'post', body);
    };
    /**
     * Send template messages(CSV)
     *
     */
    SDK.prototype.postApiV1Sendtemplatemessagecsv = function (body, metadata) {
        return this.core.fetch('/api/v1/sendTemplateMessageCSV', 'post', body, metadata);
    };
    SDK.prototype.postApiV1Sendinteractivelistmessage = function (body, metadata) {
        return this.core.fetch('/api/v1/sendInteractiveListMessage', 'post', body, metadata);
    };
    SDK.prototype.postApiV1AddcontactWhatsappnumber = function (body, metadata) {
        return this.core.fetch('/api/v1/addContact/{whatsappNumber}', 'post', body, metadata);
    };
    /**
     * Get WhatsApp Pay order details of particular order (Private Beta)
     *
     */
    SDK.prototype.getApiV1Order_detailsReferenceid = function (metadata) {
        return this.core.fetch('/api/v1/order_details/{referenceId}', 'get', metadata);
    };
    /**
     * Get Messages by whatsapp number
     *
     */
    SDK.prototype.getApiV1GetmessagesWhatsappnumber = function (metadata) {
        return this.core.fetch('/api/v1/getMessages/{whatsappNumber}', 'get', metadata);
    };
    /**
     * Get payment status information of particular order (Private Beta)
     *
     */
    SDK.prototype.getApiV1Payment_statusReferenceid = function (metadata) {
        return this.core.fetch('/api/v1/payment_status/{referenceId}', 'get', metadata);
    };
    SDK.prototype.postApiV1Sendinteractivebuttonsmessage = function (body, metadata) {
        return this.core.fetch('/api/v1/sendInteractiveButtonsMessage', 'post', body, metadata);
    };
    /**
     * Send File to opened session
     *
     */
    SDK.prototype.postApiV1SendsessionfileWhatsappnumber = function (body, metadata) {
        return this.core.fetch('/api/v1/sendSessionFile/{whatsappNumber}', 'post', body, metadata);
    };
    /**
     * Send Message to opened session
     *
     */
    SDK.prototype.postApiV1SendsessionmessageWhatsappnumber = function (metadata) {
        return this.core.fetch('/api/v1/sendSessionMessage/{whatsappNumber}', 'post', metadata);
    };
    /**
     * Update Contact Attributes
     *
     */
    SDK.prototype.postApiV1Updatecontactattributesformulticontacts = function (body) {
        return this.core.fetch('/api/v1/updateContactAttributesForMultiContacts', 'post', body);
    };
    SDK.prototype.postApiV1UpdatecontactattributesWhatsappnumber = function (body, metadata) {
        return this.core.fetch('/api/v1/updateContactAttributes/{whatsappNumber}', 'post', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
