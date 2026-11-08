import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "gut-bacteria",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Memfermentasinya menjadi asam lemak yang memberi energi bagi sel usus besar.",
        },
        {
          correct: false,
          label:
            "Mengubah serat menjadi gula yang langsung diserap oleh lambung.",
        },
        {
          correct: false,
          label:
            "Menghancurkan serat di usus halus sebelum serat itu sempat sampai ke usus besar.",
        },
        {
          correct: false,
          label: "Mengeluarkan serat dari tubuh tanpa mengubahnya sedikit pun.",
        },
        {
          correct: false,
          label:
            "Menyimpan serat di dinding usus sebagai cadangan makanan tubuh.",
        },
      ],
    },
  },
};

export default item;
