import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because visible ice first formed at $$-4^{\\circ}\\text{C}$$, compared with $$-1^{\\circ}\\text{C}$$ at baseline and $$0^{\\circ}\\text{C}$$ in the comparison condition, holding water volume, container material, and thermometer position constant isolates adding a measured mass of table salt as the only possible cause.",
        },
        {
          correct: false,
          label:
            "The strongest follow-up would change both adding a measured mass of table salt and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          correct: true,
          label:
            "Visible ice first formed at a mean of $$-4^{\\circ}\\text{C}$$ in the salted samples, compared with $$-1^{\\circ}\\text{C}$$ at baseline and $$0^{\\circ}\\text{C}$$ in the unsalted comparison. This supports an association under the tested conditions, but uneven shelf cooling and limited position rotation require further testing before a broader claim.",
        },
        {
          correct: false,
          label:
            "The limitation that the freezer shelves did not cool at exactly the same rate affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          correct: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of added salt and the temperature of ice formation.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
