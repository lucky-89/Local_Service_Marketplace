import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * Get existing chatbots
     *
     */
    getApiV1Chatbots(): Promise<FetchResponse<200, types.GetApiV1ChatbotsResponse200>>;
    /**
     * Get media by file name
     *
     */
    getApiV1Getmedia(metadata: types.GetApiV1GetmediaMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Contacts List
     *
     */
    getApiV1Getcontacts(metadata?: types.GetApiV1GetcontactsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Rotate Token
     *
     */
    postApiV1Rotatetoken(metadata: types.PostApiV1RotatetokenMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Update WhatsApp Pay order status of an order (Private Beta)
     *
     */
    postApiV1Order_status(): Promise<FetchResponse<number, unknown>>;
    /**
     * Send WhatsApp Pay order detail message to customer (Private Beta)
     *
     */
    postApiV1Order_details(): Promise<FetchResponse<number, unknown>>;
    /**
     * Assign User
     *
     */
    postApiV1Assignoperator(metadata: types.PostApiV1AssignoperatorMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Start chatbot
     *
     */
    postApiV1ChatbotsStart(metadata: types.PostApiV1ChatbotsStartMetadataParam): Promise<FetchResponse<200, types.PostApiV1ChatbotsStartResponse200>>;
    /**
     * Update Chat Status
     *
     */
    postApiV1Updatechatstatus(body: types.PostApiV1UpdatechatstatusBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Message Templates
     *
     */
    getApiV1Getmessagetemplates(metadata?: types.GetApiV1GetmessagetemplatesMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Send template message
     *
     */
    postApiV1Sendtemplatemessage(body: types.PostApiV1SendtemplatemessageBodyParam, metadata: types.PostApiV1SendtemplatemessageMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Send template message (Beta)
     *
     */
    postApiV2Sendtemplatemessage(body: types.PostApiV2SendtemplatemessageBodyParam, metadata: types.PostApiV2SendtemplatemessageMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Send template messages
     *
     */
    postApiV1Sendtemplatemessages(body: types.PostApiV1SendtemplatemessagesBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Send template messages (Beta)
     *
     */
    postApiV2Sendtemplatemessages(body: types.PostApiV2SendtemplatemessagesBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Send template messages(CSV)
     *
     */
    postApiV1Sendtemplatemessagecsv(body: types.PostApiV1SendtemplatemessagecsvBodyParam, metadata: types.PostApiV1SendtemplatemessagecsvMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Send Interactive List Message
     *
     */
    postApiV1Sendinteractivelistmessage(body: types.PostApiV1SendinteractivelistmessageBodyParam, metadata: types.PostApiV1SendinteractivelistmessageMetadataParam): Promise<FetchResponse<number, unknown>>;
    postApiV1Sendinteractivelistmessage(metadata: types.PostApiV1SendinteractivelistmessageMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Add Contact
     *
     */
    postApiV1AddcontactWhatsappnumber(body: types.PostApiV1AddcontactWhatsappnumberBodyParam, metadata: types.PostApiV1AddcontactWhatsappnumberMetadataParam): Promise<FetchResponse<number, unknown>>;
    postApiV1AddcontactWhatsappnumber(metadata: types.PostApiV1AddcontactWhatsappnumberMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get WhatsApp Pay order details of particular order (Private Beta)
     *
     */
    getApiV1Order_detailsReferenceid(metadata: types.GetApiV1OrderDetailsReferenceidMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Messages by whatsapp number
     *
     */
    getApiV1GetmessagesWhatsappnumber(metadata: types.GetApiV1GetmessagesWhatsappnumberMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get payment status information of particular order (Private Beta)
     *
     */
    getApiV1Payment_statusReferenceid(metadata: types.GetApiV1PaymentStatusReferenceidMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Send Interactive Buttons Message
     *
     */
    postApiV1Sendinteractivebuttonsmessage(body: types.PostApiV1SendinteractivebuttonsmessageBodyParam, metadata: types.PostApiV1SendinteractivebuttonsmessageMetadataParam): Promise<FetchResponse<number, unknown>>;
    postApiV1Sendinteractivebuttonsmessage(metadata: types.PostApiV1SendinteractivebuttonsmessageMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Send File to opened session
     *
     */
    postApiV1SendsessionfileWhatsappnumber(body: types.PostApiV1SendsessionfileWhatsappnumberBodyParam, metadata: types.PostApiV1SendsessionfileWhatsappnumberMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Send Message to opened session
     *
     */
    postApiV1SendsessionmessageWhatsappnumber(metadata: types.PostApiV1SendsessionmessageWhatsappnumberMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Update Contact Attributes
     *
     */
    postApiV1Updatecontactattributesformulticontacts(body: types.PostApiV1UpdatecontactattributesformulticontactsBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Update Contact Attributes
     *
     */
    postApiV1UpdatecontactattributesWhatsappnumber(body: types.PostApiV1UpdatecontactattributesWhatsappnumberBodyParam, metadata: types.PostApiV1UpdatecontactattributesWhatsappnumberMetadataParam): Promise<FetchResponse<number, unknown>>;
    postApiV1UpdatecontactattributesWhatsappnumber(metadata: types.PostApiV1UpdatecontactattributesWhatsappnumberMetadataParam): Promise<FetchResponse<number, unknown>>;
}
declare const createSDK: SDK;
export = createSDK;
