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
        { correct: false, label: "About $$3$$ months, and about RM $$480$$" },
        { correct: false, label: "About $$4$$ months, and about RM $$370$$" },
        { correct: false, label: "About $$4$$ months, and about RM $$430$$" },
        { correct: true, label: "About $$4$$ months, and about RM $$410$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kira-kira $$3$$ bulan, dan kira-kira RM $$480$$",
        },
        {
          correct: false,
          label: "Kira-kira $$4$$ bulan, dan kira-kira RM $$370$$",
        },
        {
          correct: false,
          label: "Kira-kira $$4$$ bulan, dan kira-kira RM $$430$$",
        },
        {
          correct: true,
          label: "Kira-kira $$4$$ bulan, dan kira-kira RM $$410$$",
        },
      ],
    },
  },
};

export default item;
