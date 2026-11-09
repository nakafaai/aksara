import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "awan",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Hujan buatan dapat dibuat walaupun langit benar-benar cerah.",
        },
        {
          column: 1,
          label: "Garam membantu uap air membentuk tetes yang lebih besar.",
        },
        {
          column: 1,
          label:
            "Penyemaian awan dapat dipakai untuk mengurangi hujan yang menumpuk di atas kota.",
        },
        {
          column: 2,
          label:
            "Hasil penyemaian paling mudah dipastikan pada musim kemarau panjang.",
        },
      ],
    },
  },
};

export default item;
