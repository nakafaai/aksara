import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The $$35$$ correct classifications support permanent adoption because controlling the scenario removes the need to test real supplier quotes.",
        },
        {
          correct: false,
          label:
            "The two old-sheet rounds show that mentor instructions, rather than the sheet, must explain the difference in the trial round.",
        },
        {
          correct: false,
          label:
            "Because fixed costs stay unchanged, replacing estimates with supplier quotes cannot affect the usefulness of the budget sheet.",
        },
        {
          correct: true,
          label:
            "The controlled comparison supports trying the separated sheet at one real event, where final supplier quotes can test whether better classification also yields a reliable total.",
        },
        {
          correct: false,
          label:
            "A real-event trial should change the sheet, instructions, price source, and classification rules together so the result covers more possibilities.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
