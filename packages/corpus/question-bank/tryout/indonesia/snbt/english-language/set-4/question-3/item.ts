import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because visible ice first formed at -4°C, compared with -1°C at baseline and 0°C in the comparison condition, holding water volume, container material, and thermometer position constant isolates adding a measured mass of table salt as the only possible cause.",
        },
        {
          isCorrect: false,
          label:
            "The strongest follow-up would change both adding a measured mass of table salt and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          isCorrect: true,
          label:
            "visible ice first formed at -4°C, compared with -1°C at baseline and 0°C in the comparison condition; this supports an association between added salt and the temperature of ice formation under the tested conditions, while the freezer shelves did not cool at exactly the same rate requires further testing before a broader claim.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that the freezer shelves did not cool at exactly the same rate affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          isCorrect: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of added salt and the temperature of ice formation.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
