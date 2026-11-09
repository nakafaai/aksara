import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause",
  },
  stimulus: "bambu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "batangnya tumbuh terlalu cepat sehingga dindingnya tipis",
        },
        {
          correct: false,
          label: "batangnya dipanen ketika berumur tiga sampai lima tahun",
        },
        {
          correct: false,
          label: "pati di dalam batangnya larut ketika batang direndam air",
        },
        {
          correct: false,
          label: "bambu terlalu lentur untuk dipakai sebagai tiang rumah",
        },
        {
          correct: true,
          label: "patinya menarik kumbang bubuk yang melubangi batang",
        },
      ],
    },
  },
};

export default item;
