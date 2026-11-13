import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Ada tepat tiga kemungkinan letak titik $$D$$.",
        },
        {
          column: 1,
          label: "Salah satu jajargenjang yang mungkin adalah persegi panjang.",
        },
        {
          column: 2,
          label:
            "Semua jajargenjang yang mungkin mempunyai keliling yang sama.",
        },
      ],
    },
  },
};

export default item;
