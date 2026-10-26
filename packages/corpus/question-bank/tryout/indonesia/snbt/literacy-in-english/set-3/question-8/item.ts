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
            "Because the trial reached $$44$$, compared with a baseline of $$28$$ and a comparison value of $$30$$, a map showing walking time from each bus stop should become permanent before the stated limitation is examined.",
        },
        {
          correct: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          correct: true,
          label:
            "The rise to $$44$$, compared with $$28$$ at baseline and $$30$$ in the comparison, supports a limited extension of the map trial. Differences in mobility needs must shape the follow-up.",
        },
        {
          correct: false,
          label:
            "The limitation that walking times differed for people with different mobility needs affects delivery details, but it does not restrict who can be covered by the conclusion.",
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
