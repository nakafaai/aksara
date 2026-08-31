import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the trial reached 35, compared with a baseline of 21 and a comparison value of 22, a budget sheet separating fixed, flexible, and shared costs should become permanent before the stated limitation is examined.",
        },
        {
          isCorrect: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that the exercise used estimated prices rather than final invoices affects delivery details, but it does not restrict who can be covered by the conclusion.",
        },
        {
          isCorrect: true,
          label:
            "The rise to 35, compared with a baseline of 21 and a comparison value of 22 supports a limited extension of a budget sheet separating fixed, flexible, and shared costs, while the fact that the exercise used estimated prices rather than final invoices must shape the follow-up.",
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
