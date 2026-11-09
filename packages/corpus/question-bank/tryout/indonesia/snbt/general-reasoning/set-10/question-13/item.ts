import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "negation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pendaftaran lomba tidak dibuka hari Senin atau tidak ditutup hari Jumat.",
        },
        {
          correct: false,
          label:
            "Pendaftaran lomba tidak dibuka hari Senin dan tidak ditutup hari Jumat.",
        },
        {
          correct: false,
          label: "Pendaftaran lomba dibuka hari Senin atau ditutup hari Jumat.",
        },
        {
          correct: false,
          label:
            "Jika pendaftaran lomba dibuka hari Senin, pendaftaran itu ditutup hari Jumat.",
        },
        {
          correct: false,
          label: "Pendaftaran lomba dibuka hari Selasa dan ditutup hari Sabtu.",
        },
      ],
    },
  },
};

export default item;
