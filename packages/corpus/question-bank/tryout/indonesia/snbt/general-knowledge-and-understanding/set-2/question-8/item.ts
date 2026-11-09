import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "bakau",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (7) dan (8) membantah isi kalimat (6).",
        },
        {
          correct: false,
          label:
            "Kalimat (7) dan (8) memberikan definisi istilah dalam kalimat (6).",
        },
        {
          correct: false,
          label: "Kalimat (7) dan (8) menyebutkan penyebab mangrove ditebang.",
        },
        {
          correct: true,
          label:
            "Kalimat (7) dan (8) menjelaskan akibat dari keadaan pada kalimat (6).",
        },
        {
          correct: false,
          label: "Kalimat (7) dan (8) membandingkan tambak dengan permukiman.",
        },
      ],
    },
  },
};

export default item;
