"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var minimist_1 = __importDefault(require("minimist"));
var argv = (0, minimist_1.default)(process.argv.slice(2));
console.log(process.argv0);
console.log(process.argv[1]);
console.log(argv);
