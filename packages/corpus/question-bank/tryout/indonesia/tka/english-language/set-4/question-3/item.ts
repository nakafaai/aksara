import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  responses: {
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: false,
          label: "The sign asking visitors to stop talking",
        },
        {
          isCorrect: true,
          label: "The reed screens along the end of the boardwalk",
        },
        {
          isCorrect: true,
          label: "The wooden flaps over the viewing slits",
        },
        {
          isCorrect: false,
          label: "The waist-high rail on the upper platform",
        },
      ],
    },
  },
  stimulusKey: "egret-hide",
};

export default item;
