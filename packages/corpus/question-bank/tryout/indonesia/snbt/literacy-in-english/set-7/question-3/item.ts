import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because new leaf area reached $$19\\text{ cm}^2$$, compared with $$12$$ and $$13$$, holding plant variety, water, light duration, and lamp distance constant isolates using a blue light filter as the only possible cause.",
        },
        {
          correct: false,
          label:
            "The strongest follow-up would change both using a blue light filter and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          correct: false,
          label:
            "The limitation that the filter also reduced total light intensity affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          correct: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of the blue filter and new leaf area.",
        },
        {
          correct: true,
          label:
            "New leaf area reached $$19\\text{ cm}^2$$, compared with $$12$$ and $$13$$. This supports an association under the tested conditions, but the filter's lower light intensity must be separated from colour in a stronger follow-up.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
