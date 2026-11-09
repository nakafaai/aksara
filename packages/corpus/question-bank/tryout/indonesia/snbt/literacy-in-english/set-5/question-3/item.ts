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
            "Because mean travel time reached $$67$$ tenths of a second, compared with $$42$$ and $$41$$, holding block mass, ramp angle, and release point constant isolates covering the ramp with coarse fabric as the only possible cause.",
        },
        {
          correct: true,
          label:
            "Mean travel time reached $$67$$ tenths of a second, compared with $$42$$ and $$41$$. This supports an association between coarse fabric and longer travel time under the tested conditions, but possible surface wear requires further testing before a broader claim.",
        },
        {
          correct: false,
          label:
            "The strongest follow-up would change both covering the ramp with coarse fabric and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          correct: false,
          label:
            "The limitation that wear could change the fabric surface during repeated trials affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          correct: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of coarse fabric and model-ramp travel time.",
        },
      ],
    },
  },
};

export default item;
