import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The 35 correct classifications support permanent adoption because controlling the scenario removes the need to test real supplier quotes.",
        },
        {
          isCorrect: false,
          label:
            "The two old-sheet rounds show that mentor instructions, rather than the sheet, must explain the difference in the trial round.",
        },
        {
          isCorrect: false,
          label:
            "Because fixed costs stay unchanged, replacing estimates with supplier quotes cannot affect the usefulness of the budget sheet.",
        },
        {
          isCorrect: true,
          label:
            "The controlled comparison supports trying the separated sheet at one real event, where final supplier quotes can test whether better classification also yields a reliable total.",
        },
        {
          isCorrect: false,
          label:
            "A real-event trial should change the sheet, instructions, price source, and classification rules together so the result covers more possibilities.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
