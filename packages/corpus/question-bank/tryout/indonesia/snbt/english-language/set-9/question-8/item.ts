import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the trial reached 54, compared with a baseline of 36 and a comparison value of 37, matching symbols on bins and stall permits should become permanent before the stated limitation is examined.",
        },
        {
          isCorrect: true,
          label:
            "The rise to 54, compared with a baseline of 36 and a comparison value of 37 supports a limited extension of matching symbols on bins and stall permits, while the fact that visitor numbers and food types changed across evenings must shape the follow-up.",
        },
        {
          isCorrect: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that visitor numbers and food types changed across evenings affects delivery details, but it does not restrict who can be covered by the conclusion.",
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
