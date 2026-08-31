import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the colour-change measure reached 31 units, compared with 18 and 19, holding sample volume, pH, and reaction time constant isolates holding the mixture at 37°C as the only possible cause.",
        },
        {
          isCorrect: false,
          label:
            "The strongest follow-up would change both holding the mixture at 37°C and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          isCorrect: true,
          label:
            "The colour-change measure reached 31 units, compared with 18 and 19. This supports an association between 37°C and the classroom measure of enzyme activity, but eye-based estimation requires more precise testing before a broader claim.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that the colour scale was estimated by eye affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          isCorrect: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of 37°C and the classroom measure of enzyme activity.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
