import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "saudara",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14$$ siswa",
        },
        {
          correct: false,
          label: "$$20$$ siswa",
        },
        {
          correct: true,
          label: "$$25$$ siswa",
        },
        {
          correct: false,
          label: "$$29$$ siswa",
        },
        {
          correct: false,
          label: "$$34$$ siswa",
        },
      ],
    },
  },
};

export default item;
