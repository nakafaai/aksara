import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-2<x<3$$",
        },
        {
          correct: false,
          label: "$$3<x<5$$ dengan $$x\\neq4$$",
        },
        {
          correct: false,
          label: "$$x<-2$$ atau $$3<x<5$$",
        },
        {
          correct: true,
          label: "$$x<-2$$ atau $$3<x<5$$, dengan $$x\\neq4$$",
        },
        {
          correct: false,
          label: "$$x<-2$$ atau $$x>3$$, dengan $$x\\neq4$$",
        },
      ],
    },
  },
};

export default item;
