import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/config";

interface PhonebookEntry {
  name: string;
  number: string;
  isFavourite: boolean;
  id: string;
}
const PhonebookList = () => {
  const [data, setData]: [PhonebookEntry[], (f1: any) => void] = useState([]);

  const getData = async () => {
    const reqUrl = `${BACKEND_URL}/contacts`;
    console.log(`Connecting to ${reqUrl}`)
    const response = await fetch(reqUrl);
    const json = await response.json();
    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <ul>
          {data.map((elem: PhonebookEntry, index: number) => {
            return (
              <li key={index}>
                {elem.name} : {elem.number}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export { PhonebookList };
