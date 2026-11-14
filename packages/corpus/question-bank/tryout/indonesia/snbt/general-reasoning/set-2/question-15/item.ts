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
          correct: true,
          label: "Kurnia dan Nanda tidak bertugas di pos yang sama.",
        },
        {
          correct: false,
          label: "Kurnia tidak bertugas di pos registrasi.",
        },
        {
          correct: false,
          label: "Putri bertugas di pos yang sama dengan Nanda.",
        },
        {
          correct: false,
          label: "Hana atau Indra bertugas di pos medis.",
        },
        {
          correct: false,
          label: "Fikri bertugas di pos registrasi.",
        },
      ],
    },
  },
};

export default item;
