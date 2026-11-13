import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "ocean-acidification",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Collect adult pteropods near a volcanic vent and compare their shells with those of adults from normal water nearby.",
        },
        {
          correct: false,
          label:
            "Hold larvae at a steady late-century level for a few weeks, as most studies do, but repeat the experiment many times to settle the disagreement.",
        },
        {
          correct: false,
          label:
            "Measure the carbon dioxide in the bay every hour for a year to find how often it already rises above the late-century level.",
        },
        {
          correct: false,
          label:
            "Raise pteropods through their whole life cycle at a steady late-century level, feeding them generously so that hunger cannot hide the effect of acidity.",
        },
        {
          correct: true,
          label:
            "Raise several generations of pteropods in warmer tanks where carbon dioxide rises and falls each day around a higher average and food stays at the bay's natural level.",
        },
      ],
    },
  },
};

export default item;
