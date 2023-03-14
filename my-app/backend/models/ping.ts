import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ hey: true });
  return;
});

interface PhonebookEntry {
  name: string;
  number: string;
  isFavorite: boolean;
  id: string;
}

const isPhonebookEntry = (candidate: any): candidate is PhonebookEntry => {
  if (
    typeof candidate === "object" &&
    typeof candidate.name === "string" &&
    typeof candidate.number === "string" &&
    typeof candidate.isFavorite === "boolean" &&
    typeof candidate.id === "string"
  ) {
    const correct: PhonebookEntry = {
      name: candidate.name,
      number: candidate.number,
      isFavorite: candidate.isFavorite,
      id: candidate.id,
    };
    return correct ? true : false;
  }
  return false;
};

const data: PhonebookEntry[] = [
  { name: "josh", number: "123123", isFavorite: true, id: "0" },
  { name: "drake", number: "2312312", isFavorite: false, id: "1" },
];

router.get("/", (req: any, res: any) => {
  res.sendStatus(200).json(data);
  return;
});

router.get("/:id", (req: any, res: any): void | PhonebookEntry => {
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

router.post("/", (req: any, res: any): void => {
  let userEntry = req.body;
  if (isPhonebookEntry(userEntry)) {
    userEntry = userEntry as PhonebookEntry;
    data.push(userEntry);
    res.status(201).end();
    return;
  }
  res.sendStatus(400).end();
  return;
});

export default router;
