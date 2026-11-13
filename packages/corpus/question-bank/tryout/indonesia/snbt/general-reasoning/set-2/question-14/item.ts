import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grouping",
  },
  stimulus: "relawan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Registrasi: Indra, Kurnia, Putri. Medis: Jihan, Nanda.",
        },
        {
          correct: false,
          label: "Registrasi: Fikri, Galih, Indra. Medis: Hana, Jihan.",
        },
        {
          correct: false,
          label: "Registrasi: Hana, Kurnia, Putri. Medis: Indra, Jihan.",
        },
        {
          correct: true,
          label: "Registrasi: Indra, Nanda, Putri. Medis: Hana, Jihan.",
        },
        {
          correct: false,
          label: "Registrasi: Fikri, Indra, Putri. Medis: Jihan, Kurnia.",
        },
      ],
    },
  },
};

export default item;
