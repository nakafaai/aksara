import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4$$, $$7$$, dan $$9$$",
        },
        {
          correct: false,
          label: "$$5$$, $$11$$, dan $$12$$",
        },
        {
          correct: false,
          label: "$$6$$, $$9$$, dan $$11$$",
        },
        {
          correct: false,
          label: "$$7$$, $$24$$, dan $$26$$",
        },
        {
          correct: true,
          label: "$$8$$, $$15$$, dan $$17$$",
        },
      ],
    },
  },
};

export default item;
