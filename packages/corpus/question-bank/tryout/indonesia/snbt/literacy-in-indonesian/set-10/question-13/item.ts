import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "ai-homework",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$115$$ siswa, sekitar $$72\\%$$ dari angkatan",
        },
        {
          correct: false,
          label: "$$70$$ siswa, sekitar $$44\\%$$ dari angkatan",
        },
        {
          correct: false,
          label: "$$45$$ siswa, sekitar $$28\\%$$ dari angkatan",
        },
        {
          correct: false,
          label: "$$115$$ siswa, sekitar $$56\\%$$ dari angkatan",
        },
        {
          correct: false,
          label: "$$105$$ siswa, sekitar $$66\\%$$ dari angkatan",
        },
      ],
    },
  },
};

export default item;
