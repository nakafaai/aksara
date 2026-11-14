import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-1<k<1$$ atau $$k>1$$",
        },
        {
          correct: true,
          label: "$$k<-5$$ atau $$-1<k<1$$ atau $$k>1$$",
        },
        {
          correct: false,
          label: "$$k<-5$$ atau $$k>-1$$",
        },
        {
          correct: false,
          label: "$$-5<k<-1$$",
        },
        {
          correct: false,
          label: "$$k\\neq-5$$ dan $$k\\neq1$$",
        },
      ],
    },
  },
};

export default item;
