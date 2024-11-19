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
exports.createCompany = void 0;
const db_1 = __importDefault(require("../db"));
const createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clerkId, name, owner_id, slug, logo_url, max_members } = yield req.body;
        console.log(clerkId, owner_id, slug, name, logo_url, max_members);
        const company = yield db_1.default.company.create({
            data: {
                clerkId,
                name,
                owner_id,
                slug,
                logo_url,
                max_members,
            },
        });
        yield db_1.default.user.update({
            where: {
                clerkId: owner_id,
            },
            data: {
                company: {
                    connect: {
                        id: company.id,
                    },
                },
                owned_company: {
                    connect: {
                        id: company.id,
                    },
                },
            },
        });
        res.status(201).json({ message: 'Successfully created company', company });
        return;
    }
    catch (error) {
        console.log('[ERROR] createCompany:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.createCompany = createCompany;
