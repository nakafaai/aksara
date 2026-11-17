import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About RM $$830$$ per kWh, and $$12$$ charges",
        },
        {
          correct: false,
          label: "About RM $$420$$ per kWh, and $$6$$ charges",
        },
        { correct: true, label: "About RM $$830$$ per kWh, and $$6$$ charges" },
        {
          correct: false,
          label: "About RM $$1700$$ per kWh, and $$6$$ charges",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira RM $$830$$ sekWj, dan $$12$$ cas" },
        { correct: false, label: "Kira-kira RM $$420$$ sekWj, dan $$6$$ cas" },
        { correct: true, label: "Kira-kira RM $$830$$ sekWj, dan $$6$$ cas" },
        { correct: false, label: "Kira-kira RM $$1700$$ sekWj, dan $$6$$ cas" },
      ],
    },
  },
};

export default item;
