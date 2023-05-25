"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.dbConnect = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var dbConnect = function () {
    mongoose_1["default"].set('strictQuery', true);
    mongoose_1["default"].connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(function () { return console.log("connect successfully"); }, function (error) { return console.log(error.message); });
};
exports.dbConnect = dbConnect;
