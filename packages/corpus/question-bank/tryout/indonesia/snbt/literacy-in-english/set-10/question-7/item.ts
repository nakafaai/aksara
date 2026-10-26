import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The $$35$$ correct budgets show that the separated sheet eliminated classification errors and guaranteed accurate supplier totals.",
        },
        {
          correct: false,
          label:
            "The $$21$$ and $$22$$ results differ, so variation between the old-sheet rounds makes the $$35$$ result unusable as evidence.",
        },
        {
          correct: false,
          label:
            "The trial result can be applied directly to a real event because cost classification and final-price accuracy measure the same outcome.",
        },
        {
          correct: false,
          label:
            "The second old-sheet round makes the baseline unnecessary, so only $$35$$ and $$22$$ should be considered.",
        },
        {
          correct: true,
          label:
            "The separated sheet produced $$35$$ correct classifications versus $$21$$ and $$22$$ with the old sheet, but estimated prices prevent that pattern from proving accurate real-event totals.",
        },
      ],
    },
  },
};

export default item;
