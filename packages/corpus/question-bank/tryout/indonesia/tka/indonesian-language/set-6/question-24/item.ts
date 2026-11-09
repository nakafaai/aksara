import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "countdown-lights",
  versions: {
    id: {
      columns: ["Pendapat pendukung", "Pendapat penentang", "Langkah dinas"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pengendara menjadi lebih sabar karena tahu berapa lama harus menunggu.",
        },
        {
          column: 2,
          label:
            "Sebagian pengendara mempercepat laju ketika lampu hijau hampir habis.",
        },
        {
          column: 3,
          label:
            "Alat itu diuji di persimpangan yang lebih ramai pejalan kaki.",
        },
        {
          column: 1,
          label:
            "Antrean bergerak lebih cepat karena pengendara bersiap berangkat.",
        },
      ],
    },
  },
};

export default item;
