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
          label: "$$a+b+c=-4$$",
        },
        {
          correct: true,
          label: "$$f(4)=5$$",
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
