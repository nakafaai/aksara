import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "solar-heat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It counts the panels' output in kWh instead of as a share of the electricity the school uses.",
        },
        {
          correct: false,
          label:
            "It assumes that July was the hottest month, although the table shows that June was hotter.",
        },
        {
          correct: true,
          label:
            "It judges heat by total output, which more sunlight can raise even while each unit of sunlight is used less well.",
        },
        {
          correct: false,
          label:
            "It forgets that the panels were not washed after March, so the dust on the glass, not the heat, explains the whole of July's loss.",
        },
        {
          correct: false,
          label:
            "It compares July with March, when the panels were new and had not yet lost any of their efficiency.",
        },
      ],
    },
  },
};

export default item;
