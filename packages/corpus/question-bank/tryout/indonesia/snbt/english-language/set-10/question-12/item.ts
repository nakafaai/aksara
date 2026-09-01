import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Labelling each amount made the supplier quotes final, so the team no longer needed to compare attendance scenarios.",
        },
        {
          isCorrect: false,
          label:
            "Assigning names beside unresolved amounts transferred the financial risk to those people and removed it from the budget.",
        },
        {
          isCorrect: true,
          label:
            "Classifying the figures and comparing attendance scenarios showed which optional choice threatened the deposit while keeping unresolved prices open for confirmation.",
        },
        {
          isCorrect: false,
          label:
            "The two scenarios predicted the exact final cost of security and lighting, which allowed the team to close both questions immediately.",
        },
        {
          isCorrect: false,
          label:
            "Removing the projection rental mattered only because it made the spreadsheet cleaner, not because it protected a required payment.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
