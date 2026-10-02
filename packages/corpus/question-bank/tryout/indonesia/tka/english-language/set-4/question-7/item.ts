import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  responses: {
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 2,
          label:
            "Before the first rehearsal, the writer practiced every evening on a saron at home.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "The group had to stop twice because the writer's speed did not match theirs.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Bu Ratna told the writer to count the beats more carefully in the next piece.",
        },
      ],
    },
  },
  stimulusKey: "gamelan-rehearsal",
};

export default item;
