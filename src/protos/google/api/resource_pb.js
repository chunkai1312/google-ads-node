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

var google_protobuf_descriptor_pb = require('google-protobuf/google/protobuf/descriptor_pb.js');
goog.exportSymbol('proto.google.api.Resource', null, global);
goog.exportSymbol('proto.google.api.resource', null, global);
goog.exportSymbol('proto.google.api.resourceDefinitionList', null, global);
goog.exportSymbol('proto.google.api.resourceReference', null, global);

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
proto.google.api.Resource = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.api.Resource, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.api.Resource.displayName = 'proto.google.api.Resource';
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
proto.google.api.Resource.prototype.toObject = function(opt_includeInstance) {
  return proto.google.api.Resource.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.api.Resource} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.Resource.toObject = function(includeInstance, msg) {
  var f, obj = {
    pattern: jspb.Message.getFieldWithDefault(msg, 1, ""),
    symbol: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.google.api.Resource}
 */
proto.google.api.Resource.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.api.Resource;
  return proto.google.api.Resource.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.api.Resource} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.api.Resource}
 */
proto.google.api.Resource.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPattern(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSymbol(value);
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
proto.google.api.Resource.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.api.Resource.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.api.Resource} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.Resource.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPattern();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSymbol();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string pattern = 1;
 * @return {string}
 */
proto.google.api.Resource.prototype.getPattern = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.api.Resource.prototype.setPattern = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string symbol = 2;
 * @return {string}
 */
proto.google.api.Resource.prototype.getSymbol = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.google.api.Resource.prototype.setSymbol = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * A tuple of {field number, class constructor} for the extension
 * field named `resource`.
 * @type {!jspb.ExtensionFieldInfo<!proto.google.api.Resource>}
 */
proto.google.api.resource = new jspb.ExtensionFieldInfo(
    1053,
    {resource: 0},
    proto.google.api.Resource,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         proto.google.api.Resource.toObject),
    0);

google_protobuf_descriptor_pb.FieldOptions.extensionsBinary[1053] = new jspb.ExtensionFieldBinaryInfo(
    proto.google.api.resource,
    jspb.BinaryReader.prototype.readMessage,
    jspb.BinaryWriter.prototype.writeMessage,
    proto.google.api.Resource.serializeBinaryToWriter,
    proto.google.api.Resource.deserializeBinaryFromReader,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.FieldOptions.extensions[1053] = proto.google.api.resource;


/**
 * A tuple of {field number, class constructor} for the extension
 * field named `resourceReference`.
 * @type {!jspb.ExtensionFieldInfo<string>}
 */
proto.google.api.resourceReference = new jspb.ExtensionFieldInfo(
    1055,
    {resourceReference: 0},
    null,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         null),
    0);

google_protobuf_descriptor_pb.FieldOptions.extensionsBinary[1055] = new jspb.ExtensionFieldBinaryInfo(
    proto.google.api.resourceReference,
    jspb.BinaryReader.prototype.readString,
    jspb.BinaryWriter.prototype.writeString,
    undefined,
    undefined,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.FieldOptions.extensions[1055] = proto.google.api.resourceReference;


/**
 * A tuple of {field number, class constructor} for the extension
 * field named `resourceDefinitionList`.
 * @type {!jspb.ExtensionFieldInfo<!Array<!proto.google.api.Resource>>}
 */
proto.google.api.resourceDefinitionList = new jspb.ExtensionFieldInfo(
    1053,
    {resourceDefinitionList: 0},
    proto.google.api.Resource,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         proto.google.api.Resource.toObject),
    1);

google_protobuf_descriptor_pb.FileOptions.extensionsBinary[1053] = new jspb.ExtensionFieldBinaryInfo(
    proto.google.api.resourceDefinitionList,
    jspb.BinaryReader.prototype.readMessage,
    jspb.BinaryWriter.prototype.writeRepeatedMessage,
    proto.google.api.Resource.serializeBinaryToWriter,
    proto.google.api.Resource.deserializeBinaryFromReader,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.FileOptions.extensions[1053] = proto.google.api.resourceDefinitionList;

goog.object.extend(exports, proto.google.api);
