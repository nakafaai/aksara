import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because the trial reached $$31$$, compared with a baseline of $$19$$ and a comparison value of $$20$$, a shared glossary with examples from each participant should become permanent before the stated limitation is examined.",
        },
        {
          correct: true,
          label:
            "The mean of $$31$$, compared with $$19$$ at baseline and $$20$$ in the comparison, supports further glossary testing. Entries must retain their contexts and remain open to challenges from participants with different usage.",
        },
        {
          correct: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          correct: false,
          label:
            "The limitation that one glossary could not capture every regional or family usage affects delivery details, but it does not restrict who can be covered by the conclusion.",
        },
        {
          correct: false,
          label:
            "Because staffing and schedules were stable, the difference between the trial and comparison is best attributed to those unchanged conditions.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
