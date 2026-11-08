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
          correct: true,
          label: "Nilai maksimum $$7$$ saat $$x=75^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai maksimum $$7$$ saat $$x=45^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai maksimum $$7$$ saat $$x=15^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai maksimum $$3$$ saat $$x=75^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai maksimum $$1$$ saat $$x=165^\\circ$$",
        },
      ],
    },
  },
};

export default item;
