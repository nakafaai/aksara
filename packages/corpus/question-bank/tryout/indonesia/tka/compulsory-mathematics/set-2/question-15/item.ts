import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$$T(x,y)=(y,x)$$",
        },
        {
          isCorrect: true,
          label: "$$T(2,-3)=(-3,2)$$",
        },
        {
          isCorrect: true,
          label: "$$T^2$$ adalah identitas.",
        },
        {
          isCorrect: true,
          label: "Semua titik tetap T terletak pada $$y=x$$.",
        },
        {
          isCorrect: false,
          label: "$$T$$ mempertahankan orientasi.",
        },
      ],
    },
  },
};

export default item;
