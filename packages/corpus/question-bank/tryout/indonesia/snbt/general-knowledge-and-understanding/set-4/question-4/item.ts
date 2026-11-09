import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "awan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kalimat (8) menjelaskan penyebab kebakaran hutan pada kalimat (7).",
        },
        {
          correct: false,
          label: "Kalimat (8) mengulang isi kalimat (7) dengan kata-kata lain.",
        },
        {
          correct: false,
          label:
            "Kalimat (8) membantah manfaat yang disebut pada kalimat (7) dengan menunjukkan bahwa hujan buatan justru membahayakan kota.",
        },
        {
          correct: false,
          label: "Kalimat (8) menyimpulkan seluruh isi paragraf pertama.",
        },
        {
          correct: true,
          label:
            "Kalimat (8) memberikan contoh penggunaan lain yang tujuannya berkebalikan dengan contoh pada kalimat (7).",
        },
      ],
    },
  },
};

export default item;
