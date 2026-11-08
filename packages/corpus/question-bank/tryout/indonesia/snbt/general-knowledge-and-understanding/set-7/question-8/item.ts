import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "sidat",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Sidat dewasa meninggalkan sungai untuk memijah di laut.",
        },
        {
          column: 1,
          label:
            "Sidat muda yang baru masuk ke muara memiliki tubuh yang bening.",
        },
        {
          column: 2,
          label: "Sidat dapat dipijahkan dengan mudah di kolam budi daya.",
        },
        {
          column: 2,
          label:
            "Bendungan hanya menghalangi perjalanan sidat dewasa menuju laut.",
        },
      ],
    },
  },
};

export default item;
