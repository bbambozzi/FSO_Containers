"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ hey: true });
    return;
});
const isPhonebookEntry = (candidate) => {
    if (typeof candidate === "object" &&
        typeof candidate.name === "string" &&
        typeof candidate.number === "string" &&
        typeof candidate.isFavorite === "boolean" &&
        typeof candidate.id === "string") {
        const correct = {
            name: candidate.name,
            number: candidate.number,
            isFavorite: candidate.isFavorite,
            id: candidate.id,
        };
        return correct ? true : false;
    }
    return false;
};
const data = [
    { name: "josh", number: "123123", isFavorite: true, id: "0" },
    { name: "drake", number: "2312312", isFavorite: false, id: "1" },
];
router.get("/", (req, res) => {
    res.sendStatus(200).json(data);
    return;
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    if (typeof id == undefined) {
        res.sendStatus(404).end();
        return;
    }
    const ans = data.find((user) => user.id == id);
    if (ans === undefined) {
        res.status(404).end();
        return;
    }
    res.json(data).end();
    return;
});
router.post("/", (req, res) => {
    let userEntry = req.body;
    if (isPhonebookEntry(userEntry)) {
        userEntry = userEntry;
        data.push(userEntry);
        res.status(201).end();
        return;
    }
    res.sendStatus(400).end();
    return;
});
exports.default = router;
