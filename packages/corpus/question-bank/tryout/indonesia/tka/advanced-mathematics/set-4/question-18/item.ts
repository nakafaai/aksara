import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pencerminan terhadap garis $$y=x$$",
        },
        {
          correct: false,
          label: "Rotasi $$90^\\circ$$ searah jarum jam dengan pusat $$O$$",
        },
        {
          correct: false,
          label: "Pencerminan terhadap sumbu $$Y$$",
        },
        {
          correct: true,
          label:
            "Rotasi $$90^\\circ$$ berlawanan arah jarum jam dengan pusat $$O$$",
        },
        {
          correct: false,
          label: "Rotasi $$180^\\circ$$ dengan pusat $$O$$",
        },
      ],
    },
  },
};

export default item;
