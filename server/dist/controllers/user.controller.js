"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, email, clerkId } = yield req.body;
        if (!first_name || !last_name || !username || !email || !clerkId) {
            res.status(400).json({ message: 'Please provide all required fields' });
            return;
        }
        const user = yield db_1.default.user.create({
            data: {
                first_name,
                last_name,
                username,
                email,
                clerkId,
            },
        });
        res.status(201).json({ message: 'Successfully created user', user });
        return;
    }
    catch (error) {
        console.log('[ERROR] createUser:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.createUser = createUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield db_1.default.user.findUnique({
            where: {
                clerkId: id,
            },
            include: {
                company: {
                    include: {
                        employees: true,
                    },
                },
            },
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'Successfully retrieved user', user });
        return;
    }
    catch (error) {
        console.log('[ERROR] getUser:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.getUser = getUser;
