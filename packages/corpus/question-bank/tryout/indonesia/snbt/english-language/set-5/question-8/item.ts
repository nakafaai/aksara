import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the trial reached 47, compared with a baseline of 32 and a comparison value of 33, shelf labels showing when each package entered the pantry should become permanent before the stated limitation is examined.",
        },
        {
          isCorrect: true,
          label:
            "The rise to 47, compared with a baseline of 32 and a comparison value of 33 supports a limited extension of shelf labels showing when each package entered the pantry, while the fact that package demand changed with school holidays and local events must shape the follow-up.",
        },
        {
          isCorrect: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that package demand changed with school holidays and local events affects delivery details, but it does not restrict who can be covered by the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "Because staffing and schedules were stable, the difference between the trial and comparison is best attributed to those unchanged conditions.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
