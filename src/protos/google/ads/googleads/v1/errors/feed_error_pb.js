/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_api_annotations_pb = require('../../../../../google/api/annotations_pb.js');
goog.exportSymbol('proto.google.ads.googleads.v1.errors.FeedErrorEnum', null, global);
goog.exportSymbol('proto.google.ads.googleads.v1.errors.FeedErrorEnum.FeedError', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.ads.googleads.v1.errors.FeedErrorEnum = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.ads.googleads.v1.errors.FeedErrorEnum, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.ads.googleads.v1.errors.FeedErrorEnum.displayName = 'proto.google.ads.googleads.v1.errors.FeedErrorEnum';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.ads.googleads.v1.errors.FeedErrorEnum.prototype.toObject = function(opt_includeInstance) {
  return proto.google.ads.googleads.v1.errors.FeedErrorEnum.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.ads.googleads.v1.errors.FeedErrorEnum} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.ads.googleads.v1.errors.FeedErrorEnum.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.ads.googleads.v1.errors.FeedErrorEnum}
 */
proto.google.ads.googleads.v1.errors.FeedErrorEnum.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.ads.googleads.v1.errors.FeedErrorEnum;
  return proto.google.ads.googleads.v1.errors.FeedErrorEnum.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.ads.googleads.v1.errors.FeedErrorEnum} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.ads.googleads.v1.errors.FeedErrorEnum}
 */
proto.google.ads.googleads.v1.errors.FeedErrorEnum.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.ads.googleads.v1.errors.FeedErrorEnum.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.ads.googleads.v1.errors.FeedErrorEnum.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.ads.googleads.v1.errors.FeedErrorEnum} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.ads.googleads.v1.errors.FeedErrorEnum.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * @enum {number}
 */
proto.google.ads.googleads.v1.errors.FeedErrorEnum.FeedError = {
  UNSPECIFIED: 0,
  UNKNOWN: 1,
  ATTRIBUTE_NAMES_NOT_UNIQUE: 2,
  ATTRIBUTES_DO_NOT_MATCH_EXISTING_ATTRIBUTES: 3,
  CANNOT_SPECIFY_USER_ORIGIN_FOR_SYSTEM_FEED: 4,
  CANNOT_SPECIFY_GOOGLE_ORIGIN_FOR_NON_SYSTEM_FEED: 5,
  CANNOT_SPECIFY_FEED_ATTRIBUTES_FOR_SYSTEM_FEED: 6,
  CANNOT_UPDATE_FEED_ATTRIBUTES_WITH_ORIGIN_GOOGLE: 7,
  FEED_REMOVED: 8,
  INVALID_ORIGIN_VALUE: 9,
  FEED_ORIGIN_IS_NOT_USER: 10,
  INVALID_AUTH_TOKEN_FOR_EMAIL: 11,
  INVALID_EMAIL: 12,
  DUPLICATE_FEED_NAME: 13,
  INVALID_FEED_NAME: 14,
  MISSING_OAUTH_INFO: 15,
  NEW_ATTRIBUTE_CANNOT_BE_PART_OF_UNIQUE_KEY: 16,
  TOO_MANY_ATTRIBUTES: 17,
  INVALID_BUSINESS_ACCOUNT: 18,
  BUSINESS_ACCOUNT_CANNOT_ACCESS_LOCATION_ACCOUNT: 19,
  INVALID_AFFILIATE_CHAIN_ID: 20
};

goog.object.extend(exports, proto.google.ads.googleads.v1.errors);
