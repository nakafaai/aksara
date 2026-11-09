import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "noken",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (8) membantah pernyataan pada kalimat (7).",
        },
        {
          correct: true,
          label:
            "Kalimat (8) menyebutkan penyebab terancamnya noken yang dinyatakan pada kalimat (7).",
        },
        {
          correct: false,
          label:
            "Kalimat (8) menjelaskan cara melindungi noken dari kepunahan.",
        },
        {
          correct: false,
          label: "Kalimat (8) menyimpulkan isi seluruh bacaan tentang noken.",
        },
        {
          correct: false,
          label:
            "Kalimat (8) memberikan contoh lain kegunaan noken dalam kehidupan sehari-hari masyarakat Papua.",
        },
      ],
    },
  },
};

export default item;
