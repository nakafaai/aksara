import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "antibiotik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sekolah itu menerapkan aturan seragam yang *ketat*, tanpa pengecualian bagi siapa pun.",
        },
        {
          correct: true,
          label:
            "Selama pertandingan final, pintu masuk stadion dijaga *ketat* oleh petugas.",
        },
        {
          correct: false,
          label:
            "Celana olahraganya terlalu *ketat* sehingga ia sulit berlari.",
        },
        {
          correct: false,
          label:
            "Pekan ini ia sangat *sibuk* sehingga jarang pulang sebelum malam.",
        },
        {
          correct: false,
          label: "Baut pada roda sepeda itu sudah *kencang* kembali.",
        },
      ],
    },
  },
};

export default item;
