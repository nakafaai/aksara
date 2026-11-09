import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause",
  },
  stimulus: "rempah",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Cengkih dan pala hanya dihasilkan di Maluku.",
        },
        {
          column: 1,
          label:
            "Rempah berpindah melalui banyak pedagang sebelum sampai ke Eropa.",
        },
        {
          column: 2,
          label:
            "Bibit cengkih dan pala ditanam di wilayah lain di luar Maluku.",
        },
        {
          column: 2,
          label: "Bangsa Eropa berusaha memotong peran para perantara.",
        },
      ],
    },
  },
};

export default item;
