import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "seminar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bayu tampil pada giliran $$6$$.",
        },
        {
          correct: false,
          label: "Galih atau Hesti tampil pada giliran $$1$$.",
        },
        {
          correct: false,
          label: "Eka tampil pada giliran $$2$$ atau giliran $$3$$.",
        },
        {
          correct: false,
          label: "Fani tampil pada giliran bernomor ganjil.",
        },
        {
          correct: true,
          label: "Dimas tampil pada giliran $$7$$.",
        },
      ],
    },
  },
};

export default item;
