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
          label: "$$(f\\circ g)(x)\\ge1$$ untuk setiap bilangan real $$x$$.",
        },
        {
          correct: false,
          label: "$$(g\\circ f)(x)\\ge1$$ untuk setiap bilangan real $$x$$.",
        },
        {
          correct: true,
          label:
            "Persamaan $$(f\\circ g)(x)=(g\\circ f)(x)$$ mempunyai tepat dua penyelesaian, yaitu $$x=0$$ dan $$x=-2$$.",
        },
        {
          correct: true,
          label: "$$f^{-1}(g(3))=4$$",
        },
        {
          correct: false,
          label: "$$(f\\circ g)(-1)=(g\\circ f)(-1)$$",
        },
      ],
    },
  },
};

export default item;
