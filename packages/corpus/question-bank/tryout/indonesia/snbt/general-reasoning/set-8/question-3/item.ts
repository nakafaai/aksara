import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "rasa",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Sebanyak $$80$$ peserta dapat membedakan rasa kedua minuman.",
        },
        {
          column: 2,
          label: "Lebih dari $$60$$ peserta lebih menyukai rasa minuman lama.",
        },
        {
          column: 1,
          label: "Sebanyak $$24$$ peserta lebih menyukai rasa minuman baru.",
        },
        {
          column: 2,
          label:
            "Peserta yang lebih menyukai minuman baru lebih banyak daripada peserta yang tidak dapat membedakan rasa.",
        },
      ],
    },
  },
};

export default item;
