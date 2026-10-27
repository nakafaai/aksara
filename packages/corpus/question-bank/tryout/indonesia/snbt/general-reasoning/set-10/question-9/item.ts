import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$23$$ siswa",
        },
        {
          correct: false,
          label: "$$24$$ siswa",
        },
        {
          correct: false,
          label: "$$25$$ siswa",
        },
        {
          correct: true,
          label: "$$22$$ siswa",
        },
        {
          correct: false,
          label: "$$26$$ siswa",
        },
      ],
    },
  },
};

export default item;
