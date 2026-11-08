import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$a>0$$",
        },
        {
          correct: true,
          label: "$$c<0$$",
        },
        {
          correct: true,
          label: "Sumbu simetri grafik $$f$$ adalah garis $$x=1$$.",
        },
        {
          correct: false,
          label: "Nilai minimum $$f$$ adalah $$-3$$.",
        },
        {
          correct: false,
          label: "$$b>0$$",
        },
      ],
    },
  },
};

export default item;
