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
          label: "Nilai minimum $$-3$$ saat $$x=110^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai minimum $$-3$$ saat $$x=20^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai minimum $$-3$$ saat $$x=70^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai minimum $$-4$$ saat $$x=110^\\circ$$",
        },
        {
          correct: false,
          label: "Nilai minimum $$5$$ saat $$x=20^\\circ$$",
        },
      ],
    },
  },
};

export default item;
