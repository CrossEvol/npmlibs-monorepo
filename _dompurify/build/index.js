"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_dompurify_1 = __importDefault(require("isomorphic-dompurify"));
var clean = isomorphic_dompurify_1.default.sanitize('<b>hello there</b>');
console.log(clean);
