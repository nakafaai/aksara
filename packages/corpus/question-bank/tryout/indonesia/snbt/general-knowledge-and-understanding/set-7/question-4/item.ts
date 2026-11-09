import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "angklung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (7) membantah pernyataan pada kalimat (6).",
        },
        {
          correct: false,
          label:
            "Kalimat (7) memberikan contoh lagu modern yang dimainkan dengan angklung.",
        },
        {
          correct: false,
          label:
            "Kalimat (7) menjelaskan cara membuat angklung bertangga nada diatonis.",
        },
        {
          correct: false,
          label:
            "Kalimat (7) mengulang isi kalimat (6) dengan kata-kata yang berbeda tetapi bermakna sama.",
        },
        {
          correct: true,
          label:
            "Kalimat (7) menyebutkan akibat dari perubahan yang dijelaskan pada kalimat (6).",
        },
      ],
    },
  },
};

export default item;
