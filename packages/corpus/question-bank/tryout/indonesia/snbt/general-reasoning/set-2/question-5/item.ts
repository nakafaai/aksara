import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "bakau",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Secara keseluruhan, kurang dari sepertiga bibit yang ditanam di keempat desa masih hidup pada 2025.",
        },
        {
          column: 2,
          label:
            "Desa yang menanam bibit paling rapat per kilometer pantai juga memiliki bibit hidup per kilometer pantai paling sedikit.",
        },
        {
          column: 2,
          label:
            "Penurunan laju mundur pantai Pasirkuning kurang dari separuh laju mundurnya sebelum penanaman.",
        },
        {
          column: 1,
          label:
            "Lebih dari separuh bibit yang mati di keempat desa adalah bibit yang ditanam di Karangsari.",
        },
      ],
    },
  },
};

export default item;
