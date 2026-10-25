import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$y=x^2$$",
        },
        {
          isCorrect: false,
          label: "$$y=x^2-6$$",
        },
        {
          isCorrect: false,
          label: "$$y=x^2+8$$",
        },
        {
          isCorrect: false,
          label: "$$y=x^2-8x+10$$",
        },
        {
          isCorrect: false,
          label: "$$y=x^2-8x+16$$",
        },
      ],
    },
  },
};

export default item;
