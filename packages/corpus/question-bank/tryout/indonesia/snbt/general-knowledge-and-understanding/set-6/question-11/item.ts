import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "noken",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kecepatan bekerja",
        },
        {
          correct: false,
          label: "kekuatan tangan yang besar",
        },
        {
          correct: false,
          label: "keberanian mencoba",
        },
        {
          correct: true,
          label: "kesungguhan dan kesabaran",
        },
        {
          correct: false,
          label: "kecerdikan mencari cara",
        },
      ],
    },
  },
};

export default item;
