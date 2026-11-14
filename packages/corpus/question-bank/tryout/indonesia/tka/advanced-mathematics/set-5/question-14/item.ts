import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x^2+y^2-4x+10y+25=0$$",
        },
        {
          correct: true,
          label: "$$x^2+y^2+4x-10y+25=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+4x-10y+4=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+4x-10y+29=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+4x-10y+27=0$$",
        },
      ],
    },
  },
};

export default item;
