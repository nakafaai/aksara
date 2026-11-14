import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "saluran",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$315$$ liter per detik",
        },
        {
          correct: false,
          label: "$$360$$ liter per detik",
        },
        {
          correct: false,
          label: "$$432$$ liter per detik",
        },
        {
          correct: false,
          label: "$$450$$ liter per detik",
        },
        {
          correct: false,
          label: "$$480$$ liter per detik",
        },
      ],
    },
  },
};

export default item;
