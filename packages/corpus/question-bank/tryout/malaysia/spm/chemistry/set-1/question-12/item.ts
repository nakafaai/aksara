import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "P and Q both have a pH of $$3$$",
        },
        {
          correct: false,
          label: "P has a pH of $$1$$, and the pH of Q is higher than $$1$$",
        },
        {
          correct: false,
          label: "P has a pH of $$4$$, and the pH of Q is higher than $$4$$",
        },
        {
          correct: true,
          label: "P has a pH of $$3$$, and the pH of Q is higher than $$3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "P dan Q kedua-duanya mempunyai pH $$3$$",
        },
        {
          correct: false,
          label: "P mempunyai pH $$1$$, dan pH Q lebih tinggi daripada $$1$$",
        },
        {
          correct: false,
          label: "P mempunyai pH $$4$$, dan pH Q lebih tinggi daripada $$4$$",
        },
        {
          correct: true,
          label: "P mempunyai pH $$3$$, dan pH Q lebih tinggi daripada $$3$$",
        },
      ],
    },
  },
};

export default item;
