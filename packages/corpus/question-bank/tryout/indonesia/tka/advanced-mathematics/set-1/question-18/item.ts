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
          correct: true,
          label: "pencerminan terhadap garis $$y=-x$$",
        },
        {
          correct: false,
          label: "pencerminan terhadap garis $$y=x$$",
        },
        {
          correct: false,
          label: "rotasi $$90^\\circ$$ berlawanan arah jarum jam dengan pusat $$O$$",
        },
        {
          correct: false,
          label: "rotasi $$180^\\circ$$ dengan pusat $$O$$",
        },
        {
          correct: false,
          label: "pencerminan terhadap sumbu $$x$$",
        },
      ],
    },
  },
};

export default item;
