import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the trial reached 29, compared with a baseline of 17 and a comparison value of 18, short captions separating observation from interpretation should become permanent before the stated limitation is examined.",
        },
        {
          isCorrect: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          isCorrect: true,
          label:
            "The rise to 29, compared with a baseline of 17 and a comparison value of 18 supports a limited extension of short captions separating observation from interpretation, while the fact that the trial did not include visitors using screen readers must shape the follow-up.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that the trial did not include visitors using screen readers affects delivery details, but it does not restrict who can be covered by the conclusion.",
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
