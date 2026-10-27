import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Across comparable workshop rounds, the separated budget sheet was linked to fewer classification errors, which justified a limited real-event trial rather than permanent adoption.",
        },
        {
          correct: false,
          label:
            "The separated budget sheet proved that teams using it would calculate accurate totals even when supplier prices changed after the workshop.",
        },
        {
          correct: false,
          label:
            "The two old-sheet rounds produced different results, so the comparison cannot contribute any evidence about the new sheet.",
        },
        {
          correct: false,
          label:
            "Because the event scenario and instructions stayed the same, the trial established the separated sheet as the only possible cause of every corrected budget.",
        },
        {
          correct: false,
          label:
            "The report mainly redefined fixed cost, while the three rounds and the proposed real-event trial served only as background details.",
        },
      ],
    },
  },
};

export default item;
