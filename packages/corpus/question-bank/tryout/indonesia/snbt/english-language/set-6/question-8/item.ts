import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the trial reached $$25$$, compared with a baseline of $$14$$ and a comparison value of $$15$$, a card listing the tools needed for each repair should become permanent before the stated limitation is examined.",
        },
        {
          isCorrect: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that repair difficulty differed greatly between objects affects delivery details, but it does not restrict who can be covered by the conclusion.",
        },
        {
          isCorrect: true,
          label:
            "The mean of $$25$$, compared with $$14$$ at baseline and $$15$$ in the comparison, supports a limited extension of the tool-card trial. The follow-up must group outcomes by repair difficulty.",
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
