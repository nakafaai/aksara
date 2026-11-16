import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "response-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "X in Q and S; Y in P and R" },
        { correct: false, label: "X in Q only; Y in P, R and S" },
        { correct: false, label: "X in Q, R and S; Y in P only" },
        { correct: false, label: "X in P and R; Y in Q and S" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "X dalam Q dan S; Y dalam P dan R" },
        { correct: false, label: "X dalam Q sahaja; Y dalam P, R dan S" },
        { correct: false, label: "X dalam Q, R dan S; Y dalam P sahaja" },
        { correct: false, label: "X dalam P dan R; Y dalam Q dan S" },
      ],
    },
  },
};

export default item;
