import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "karst",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Gua dan dolina terbentuk karena batu kapur larut oleh air yang bersifat sedikit asam.",
        },
        {
          column: 2,
          label:
            "Penambangan batu kapur hanya merusak pemandangan di atas permukaan kawasan karst.",
        },
        {
          column: 1,
          label:
            "Limbah yang dibuang ke dolina dapat mencemari sungai bawah tanah.",
        },
        {
          column: 2,
          label:
            "Sungai bawah tanah di kawasan karst terbentuk hanya dalam beberapa tahun.",
        },
      ],
    },
  },
};

export default item;
