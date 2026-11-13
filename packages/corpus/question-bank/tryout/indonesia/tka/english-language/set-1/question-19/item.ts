import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "supporting-detail",
  },
  stimulus: "boardwalk",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "To warn visitors not to touch the mud from the boardwalk",
        },
        {
          correct: false,
          label:
            "To suggest that waste from the car park has polluted the low marsh",
        },
        {
          correct: true,
          label:
            "To give a sign that the soil holds no air, which explains why the grass must carry air down to its roots",
        },
        {
          correct: false,
          label: "To show that the low marsh is saltier than the high marsh",
        },
        {
          correct: false,
          label:
            "To explain why no plant can root in the mudflat at the far end",
        },
      ],
    },
  },
};

export default item;
