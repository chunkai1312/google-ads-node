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
goog.exportSymbol('proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum', null, global);
goog.exportSymbol('proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.ConversionUploadError', null, global);

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
proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.displayName = 'proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum';
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
proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.prototype.toObject = function(opt_includeInstance) {
  return proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.toObject = function(includeInstance, msg) {
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
 * @return {!proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum}
 */
proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum;
  return proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum}
 */
proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.deserializeBinaryFromReader = function(msg, reader) {
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
proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * @enum {number}
 */
proto.google.ads.googleads.v1.errors.ConversionUploadErrorEnum.ConversionUploadError = {
  UNSPECIFIED: 0,
  UNKNOWN: 1,
  TOO_MANY_CONVERSIONS_IN_REQUEST: 2,
  UNPARSEABLE_GCLID: 3,
  CONVERSION_PRECEDES_GCLID: 4,
  EXPIRED_GCLID: 5,
  TOO_RECENT_GCLID: 6,
  GCLID_NOT_FOUND: 7,
  UNAUTHORIZED_CUSTOMER: 8,
  INVALID_CONVERSION_ACTION: 9,
  TOO_RECENT_CONVERSION_ACTION: 10,
  CONVERSION_TRACKING_NOT_ENABLED_AT_IMPRESSION_TIME: 11,
  EXTERNAL_ATTRIBUTION_DATA_SET_FOR_NON_EXTERNALLY_ATTRIBUTED_CONVERSION_ACTION: 12,
  EXTERNAL_ATTRIBUTION_DATA_NOT_SET_FOR_EXTERNALLY_ATTRIBUTED_CONVERSION_ACTION: 13,
  ORDER_ID_NOT_PERMITTED_FOR_EXTERNALLY_ATTRIBUTED_CONVERSION_ACTION: 14,
  ORDER_ID_ALREADY_IN_USE: 15,
  DUPLICATE_ORDER_ID: 16,
  TOO_RECENT_CALL: 17,
  EXPIRED_CALL: 18,
  CALL_NOT_FOUND: 19,
  CONVERSION_PRECEDES_CALL: 20,
  CONVERSION_TRACKING_NOT_ENABLED_AT_CALL_TIME: 21,
  UNPARSEABLE_CALLERS_PHONE_NUMBER: 22
};

goog.object.extend(exports, proto.google.ads.googleads.v1.errors);
