import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "kawi-script",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Satu huruf konsonan tanpa tanda tambahan dibaca dengan vokal /a/.",
        },
        {
          column: 2,
          label:
            "Untuk menulis suku kata *ki*, juru tulis memakai huruf yang sama sekali berbeda dari huruf untuk *ka*.",
        },
        {
          column: 1,
          label:
            "Suku kata yang diakhiri konsonan, seperti *tan*, memerlukan tanda yang mematikan vokal.",
        },
        {
          column: 2,
          label:
            "Setiap vokal ditulis sebagai huruf tersendiri yang selalu berdiri di samping konsonan.",
        },
      ],
    },
  },
};

export default item;
