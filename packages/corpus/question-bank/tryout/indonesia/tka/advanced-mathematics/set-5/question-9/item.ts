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
          label: "Nilai maksimum $$1$$ dan periode $$120^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai maksimum $$3$$ dan periode $$360^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai maksimum $$2$$ dan periode $$120^\\circ$$",
        },
        {
          correct: true,
          label: "Nilai maksimum $$3$$ dan periode $$120^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai maksimum $$-1$$ dan periode $$1080^\\circ$$",
        },
      ],
    },
  },
};

export default item;
