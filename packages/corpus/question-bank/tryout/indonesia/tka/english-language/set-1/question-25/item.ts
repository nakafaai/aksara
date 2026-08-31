import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage says that the school should report different measures honestly.",
        },
        {
          isCorrect: false,
          label:
            "The passage says that the school should keep a clear route back if the costs outweigh the benefits.",
        },
        {
          isCorrect: false,
          label:
            "The passage states that a later bus may prevent a student from collecting a younger sibling.",
        },
        {
          isCorrect: false,
          label:
            "The passage states that the schedule affects several connected routines.",
        },
        {
          isCorrect: true,
          label:
            "A secondary school should test a later start time for one term.",
        },
      ],
    },
  },
  stimulusKey: "later-start",
};

export default item;
