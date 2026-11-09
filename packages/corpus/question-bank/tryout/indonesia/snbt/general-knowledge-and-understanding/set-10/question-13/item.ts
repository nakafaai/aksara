import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "bekantan",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Hidung bekantan betina lebih besar daripada hidung jantan dewasa.",
        },
        {
          column: 2,
          label: "Buah matang adalah makanan utama bekantan.",
        },
        {
          column: 1,
          label: "Bakteri di dalam lambung membantu bekantan mencerna daun.",
        },
        {
          column: 1,
          label:
            "Jari-jari kaki yang sebagian berselaput membantu bekantan berenang.",
        },
      ],
    },
  },
};

export default item;
