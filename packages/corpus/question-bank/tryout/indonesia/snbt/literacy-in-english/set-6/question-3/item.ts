import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because the mean colour-change score reached $$31$$, compared with $$18$$ and $$19$$, holding sample volume, pH, and reaction time constant isolates holding the mixture at $$37^{\\circ}\\text{C}$$ as the only possible cause.",
        },
        {
          correct: false,
          label:
            "The strongest follow-up would change both holding the mixture at $$37^{\\circ}\\text{C}$$ and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          correct: true,
          label:
            "The mean colour-change score reached $$31$$, compared with $$18$$ and $$19$$. This supports an association between $$37^{\\circ}\\text{C}$$ and the classroom measure of enzyme activity, but eye-based estimation requires more precise testing before a broader claim.",
        },
        {
          correct: false,
          label:
            "The limitation that the colour scale was estimated by eye affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          correct: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of $$37^{\\circ}\\text{C}$$ and the classroom measure of enzyme activity.",
        },
      ],
    },
  },
};

export default item;
