import express from "express";
const router = express.Router();

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
    typeof candidate.isFavorite === "boolean"
  ) {
    return true;
  }
  return false;
};

const data: PhonebookEntry[] = [
  { name: "josh", number: "123123", isFavorite: true, id: "0" },
  { name: "drake", number: "2312312", isFavorite: false, id: "1" },
];

router.get("/", (req: any, res: any) => {
  res.json(data);
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
    const newData: PhonebookEntry = {
      ...userEntry,
      id: (data.length + 1).toString(),
    };
    data.push(newData);
    res.status(201).json(newData);
    return;
  }
  res.sendStatus(400).end();
  return;
});

export default router;
