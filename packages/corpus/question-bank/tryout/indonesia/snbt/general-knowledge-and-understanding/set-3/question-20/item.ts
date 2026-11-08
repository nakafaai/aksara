import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "lebah",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Serbuk sari jagung berpindah terutama karena tiupan angin.",
        },
        {
          column: 2,
          label:
            "Para peneliti menyatakan pestisida sebagai satu-satunya penyebab menurunnya populasi lebah.",
        },
        {
          column: 1,
          label:
            "Menyemprot pestisida di luar jam aktif lebah termasuk salah satu langkah melindungi lebah.",
        },
        {
          column: 2,
          label:
            "Lebah memindahkan serbuk sari dengan sengaja untuk membantu petani.",
        },
      ],
    },
  },
};

export default item;
