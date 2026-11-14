import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "peta",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4$$ hektare",
        },
        {
          correct: false,
          label: "$$5$$ hektare",
        },
        {
          correct: false,
          label: "$$8$$ hektare",
        },
        {
          correct: false,
          label: "$$40$$ hektare",
        },
        {
          correct: false,
          label: "$$64$$ hektare",
        },
      ],
    },
  },
};

export default item;
