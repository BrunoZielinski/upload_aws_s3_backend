"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(routes_1.router);
// Cria uma rota estática
app.use('/uploads', express_1.default.static((0, path_1.resolve)(__dirname, '..', 'tmp', 'uploads')));
app.listen(process.env.SERVER_PORT || process.env.PORT, () => console.log('🚀 Server is running on port ' + process.env.SERVER_PORT ||
    process.env.PORT));
