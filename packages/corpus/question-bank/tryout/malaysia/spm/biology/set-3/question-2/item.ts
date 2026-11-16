import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cell-biology-and-organisation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Flight muscle P, adipose tissue S" },
        { correct: false, label: "Flight muscle P, adipose tissue Q" },
        { correct: true, label: "Flight muscle R, adipose tissue Q" },
        { correct: false, label: "Flight muscle R, adipose tissue S" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Otot penerbangan P, tisu adipos S" },
        { correct: false, label: "Otot penerbangan P, tisu adipos Q" },
        { correct: true, label: "Otot penerbangan R, tisu adipos Q" },
        { correct: false, label: "Otot penerbangan R, tisu adipos S" },
      ],
    },
  },
};

export default item;
