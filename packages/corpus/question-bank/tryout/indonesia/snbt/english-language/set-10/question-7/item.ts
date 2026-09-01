import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The 35 correct budgets show that the separated sheet eliminated classification errors and guaranteed accurate supplier totals.",
        },
        {
          isCorrect: false,
          label:
            "The 21 and 22 results differ, so variation between the old-sheet rounds makes the 35 result unusable as evidence.",
        },
        {
          isCorrect: false,
          label:
            "The trial result can be applied directly to a real event because cost classification and final-price accuracy measure the same outcome.",
        },
        {
          isCorrect: false,
          label:
            "The second old-sheet round makes the baseline unnecessary, so only 35 and 22 should be considered.",
        },
        {
          isCorrect: true,
          label:
            "The separated sheet produced 35 correct classifications versus 21 and 22 with the old sheet, but estimated prices prevent that pattern from proving accurate real-event totals.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
