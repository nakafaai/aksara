import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because the trial reached $$47$$, compared with a baseline of $$32$$ and a comparison value of $$33$$, shelf labels showing when each package entered the pantry should become permanent before the stated limitation is examined.",
        },
        {
          correct: true,
          label:
            "The mean of $$47$$, compared with $$32$$ at baseline and $$33$$ in the comparison, supports a limited extension of the entry-date label trial. The follow-up must account for demand changes during school holidays and local events.",
        },
        {
          correct: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          correct: false,
          label:
            "The limitation that package demand changed with school holidays and local events affects delivery details, but it does not restrict who can be covered by the conclusion.",
        },
        {
          correct: false,
          label:
            "Because staffing and schedules were stable, the difference between the trial and comparison is best attributed to those unchanged conditions.",
        },
      ],
    },
  },
};

export default item;
