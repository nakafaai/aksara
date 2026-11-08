import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "paraphrase",
  },
  stimulus: "bunga",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Selisih hasil bunga tunggal dan bunga majemuk makin besar jika uang disimpan makin lama.",
        },
        {
          correct: false,
          label:
            "Bunga majemuk selalu menghasilkan dua kali lipat bunga tunggal.",
        },
        {
          correct: false,
          label:
            "Pada tahun pertama, bunga tunggal lebih besar daripada bunga majemuk.",
        },
        {
          correct: false,
          label:
            "Bunga majemuk hanya menguntungkan penabung jika uangnya disimpan di bank kurang dari satu tahun.",
        },
        {
          correct: false,
          label: "Selisih hasil kedua cara itu tetap sama setiap tahun.",
        },
      ],
    },
  },
};

export default item;
