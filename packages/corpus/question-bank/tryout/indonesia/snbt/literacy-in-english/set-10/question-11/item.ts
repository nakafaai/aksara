import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Caleb waited for every supplier to provide a final figure before allowing the team to make any budget decision.",
        },
        {
          isCorrect: true,
          label:
            "Caleb exposed uncertainty in a concert budget, turned it into labelled scenarios and assigned questions, and helped the team protect a necessary deposit.",
        },
        {
          isCorrect: false,
          label:
            "Caleb solved the budget mainly by adding an unexplained contingency amount large enough to absorb every possible change.",
        },
        {
          isCorrect: false,
          label:
            "The budget became reliable when the venue and supplier assumed responsibility for choosing which optional cost to remove.",
        },
        {
          isCorrect: false,
          label:
            "The main improvement was that the revised spreadsheet looked less tidy, regardless of whether it clarified the team's next decision.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
