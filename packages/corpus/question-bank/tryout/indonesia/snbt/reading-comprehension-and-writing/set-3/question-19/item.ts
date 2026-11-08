import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "sentence-relation",
  },
  stimulus: "night-watch",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kalimat (3) menyatakan hal yang bertentangan dengan kalimat (2)",
        },
        {
          correct: false,
          label: "kalimat (3) menyatakan akibat dari kalimat (2)",
        },
        {
          correct: false,
          label: "kalimat (3) memerinci isi kalimat (2)",
        },
        {
          correct: true,
          label:
            "kalimat (3) menambahkan perubahan lain selain yang disebut kalimat (2)",
        },
        {
          correct: false,
          label: "kalimat (3) menegaskan ulang isi kalimat (2)",
        },
      ],
    },
  },
};

export default item;
