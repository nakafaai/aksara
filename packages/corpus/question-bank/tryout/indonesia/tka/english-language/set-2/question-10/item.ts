import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Frustration that the class recorded unresolved barriers without cancelling the fair",
        },
        {
          isCorrect: false,
          label:
            "Relief that the revised route proves the next disruption will be manageable",
        },
        {
          isCorrect: false,
          label:
            "Disappointment that the class considered accessibility only after visitors complained",
        },
        {
          isCorrect: false,
          label:
            "Approval of the delay because extra setup time guarantees equal access",
        },
        {
          isCorrect: true,
          label:
            "Respect for the class's honest review instead of a claim of perfection",
        },
      ],
    },
  },
  stimulusKey: "accessible-fair",
};

export default item;
