import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "batik-wax",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Malam dihilangkan dari kain dengan cara merebus kain tersebut.",
        },
        {
          column: 2,
          label:
            "Pada batik tulis, malam dibubuhkan dengan cap tembaga yang bermotif.",
        },
        {
          column: 1,
          label:
            "Garis retakan dapat muncul pada batik tulis maupun batik cap.",
        },
        {
          column: 2,
          label: "Teknik cap mulai berkembang pada abad ke-15.",
        },
      ],
    },
  },
};

export default item;
