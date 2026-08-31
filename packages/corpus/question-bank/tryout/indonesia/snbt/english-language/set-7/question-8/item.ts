import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the trial reached 62, compared with a baseline of 41 and a comparison value of 43, an alert naming the street, expected depth, and safe route should become permanent before the stated limitation is examined.",
        },
        {
          isCorrect: true,
          label:
            "The rise to 62, compared with a baseline of 41 and a comparison value of 43 supports a limited extension of an alert naming the street, expected depth, and safe route, while the fact that the exercise could not reproduce the stress of an actual flood must shape the follow-up.",
        },
        {
          isCorrect: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that the exercise could not reproduce the stress of an actual flood affects delivery details, but it does not restrict who can be covered by the conclusion.",
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
