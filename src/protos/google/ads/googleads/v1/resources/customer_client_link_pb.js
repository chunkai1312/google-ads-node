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

var google_ads_googleads_v1_enums_manager_link_status_pb = require('../../../../../google/ads/googleads/v1/enums/manager_link_status_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
var google_api_annotations_pb = require('../../../../../google/api/annotations_pb.js');
goog.exportSymbol('proto.google.ads.googleads.v1.resources.CustomerClientLink', null, global);

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
proto.google.ads.googleads.v1.resources.CustomerClientLink = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.ads.googleads.v1.resources.CustomerClientLink, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.ads.googleads.v1.resources.CustomerClientLink.displayName = 'proto.google.ads.googleads.v1.resources.CustomerClientLink';
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
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.toObject = function(opt_includeInstance) {
  return proto.google.ads.googleads.v1.resources.CustomerClientLink.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.ads.googleads.v1.resources.CustomerClientLink} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.toObject = function(includeInstance, msg) {
  var f, obj = {
    resourceName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    clientCustomer: (f = msg.getClientCustomer()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    managerLinkId: (f = msg.getManagerLinkId()) && google_protobuf_wrappers_pb.Int64Value.toObject(includeInstance, f),
    status: jspb.Message.getFieldWithDefault(msg, 5, 0),
    hidden: (f = msg.getHidden()) && google_protobuf_wrappers_pb.BoolValue.toObject(includeInstance, f)
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
 * @return {!proto.google.ads.googleads.v1.resources.CustomerClientLink}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.ads.googleads.v1.resources.CustomerClientLink;
  return proto.google.ads.googleads.v1.resources.CustomerClientLink.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.ads.googleads.v1.resources.CustomerClientLink} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.ads.googleads.v1.resources.CustomerClientLink}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setResourceName(value);
      break;
    case 3:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setClientCustomer(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.Int64Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.Int64Value.deserializeBinaryFromReader);
      msg.setManagerLinkId(value);
      break;
    case 5:
      var value = /** @type {!proto.google.ads.googleads.v1.enums.ManagerLinkStatusEnum.ManagerLinkStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 6:
      var value = new google_protobuf_wrappers_pb.BoolValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.BoolValue.deserializeBinaryFromReader);
      msg.setHidden(value);
      break;
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
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.ads.googleads.v1.resources.CustomerClientLink.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.ads.googleads.v1.resources.CustomerClientLink} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResourceName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getClientCustomer();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getManagerLinkId();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_wrappers_pb.Int64Value.serializeBinaryToWriter
    );
  }
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getHidden();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_wrappers_pb.BoolValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional string resource_name = 1;
 * @return {string}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.getResourceName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.setResourceName = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional google.protobuf.StringValue client_customer = 3;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.getClientCustomer = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 3));
};


/** @param {?proto.google.protobuf.StringValue|undefined} value */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.setClientCustomer = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.clearClientCustomer = function() {
  this.setClientCustomer(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.hasClientCustomer = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.Int64Value manager_link_id = 4;
 * @return {?proto.google.protobuf.Int64Value}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.getManagerLinkId = function() {
  return /** @type{?proto.google.protobuf.Int64Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.Int64Value, 4));
};


/** @param {?proto.google.protobuf.Int64Value|undefined} value */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.setManagerLinkId = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.clearManagerLinkId = function() {
  this.setManagerLinkId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.hasManagerLinkId = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.ads.googleads.v1.enums.ManagerLinkStatusEnum.ManagerLinkStatus status = 5;
 * @return {!proto.google.ads.googleads.v1.enums.ManagerLinkStatusEnum.ManagerLinkStatus}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.getStatus = function() {
  return /** @type {!proto.google.ads.googleads.v1.enums.ManagerLinkStatusEnum.ManagerLinkStatus} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {!proto.google.ads.googleads.v1.enums.ManagerLinkStatusEnum.ManagerLinkStatus} value */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.setStatus = function(value) {
  jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional google.protobuf.BoolValue hidden = 6;
 * @return {?proto.google.protobuf.BoolValue}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.getHidden = function() {
  return /** @type{?proto.google.protobuf.BoolValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.BoolValue, 6));
};


/** @param {?proto.google.protobuf.BoolValue|undefined} value */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.setHidden = function(value) {
  jspb.Message.setWrapperField(this, 6, value);
};


proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.clearHidden = function() {
  this.setHidden(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.ads.googleads.v1.resources.CustomerClientLink.prototype.hasHidden = function() {
  return jspb.Message.getField(this, 6) != null;
};


goog.object.extend(exports, proto.google.ads.googleads.v1.resources);
