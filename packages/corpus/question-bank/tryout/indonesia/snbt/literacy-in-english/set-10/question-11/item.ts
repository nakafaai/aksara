import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Caleb waited for every supplier to provide a final figure before allowing the team to make any budget decision.",
        },
        {
          correct: true,
          label:
            "Caleb exposed uncertainty in a concert budget, turned it into labelled scenarios and assigned questions, and helped the team protect a necessary deposit.",
        },
        {
          correct: false,
          label:
            "Caleb solved the budget mainly by adding an unexplained contingency amount large enough to absorb every possible change.",
        },
        {
          correct: false,
          label:
            "The budget became reliable when the venue and supplier assumed responsibility for choosing which optional cost to remove.",
        },
        {
          correct: false,
          label:
            "The main improvement was that the revised spreadsheet looked less tidy, regardless of whether it clarified the team's next decision.",
        },
      ],
    },
  },
};

export default item;
