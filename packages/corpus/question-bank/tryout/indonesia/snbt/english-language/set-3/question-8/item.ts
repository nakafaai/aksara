import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the trial reached 44, compared with a baseline of 28 and a comparison value of 30, a map showing walking time from each bus stop should become permanent before the stated limitation is examined.",
        },
        {
          isCorrect: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          isCorrect: true,
          label:
            "The rise to 44, compared with a baseline of 28 and a comparison value of 30 supports a limited extension of a map showing walking time from each bus stop, while the fact that walking times differed for people with different mobility needs must shape the follow-up.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that walking times differed for people with different mobility needs affects delivery details, but it does not restrict who can be covered by the conclusion.",
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
