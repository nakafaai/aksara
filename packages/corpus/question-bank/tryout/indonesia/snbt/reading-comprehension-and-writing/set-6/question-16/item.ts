import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "bike-parking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20$$ siswa",
        },
        {
          correct: false,
          label: "$$25$$ siswa",
        },
        {
          correct: true,
          label: "$$70$$ siswa",
        },
        {
          correct: false,
          label: "$$110$$ siswa",
        },
        {
          correct: false,
          label: "$$150$$ siswa",
        },
      ],
    },
  },
};

export default item;
