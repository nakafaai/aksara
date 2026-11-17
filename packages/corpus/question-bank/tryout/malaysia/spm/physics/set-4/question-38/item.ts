import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About $$10\\,900$$ years, and about $$10\\,000$$ years earlier",
        },
        {
          correct: false,
          label:
            "About $$22\\,900$$ years, and about $$45\\,800$$ years earlier",
        },
        {
          correct: true,
          label:
            "About $$11\\,460$$ years, and about $$11\\,460$$ years earlier",
        },
        {
          correct: false,
          label:
            "About $$11\\,460$$ years, and about $$22\\,920$$ years earlier",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira $$10\\,900$$ tahun, dan kira-kira $$10\\,000$$ tahun lebih awal",
        },
        {
          correct: false,
          label:
            "Kira-kira $$22\\,900$$ tahun, dan kira-kira $$45\\,800$$ tahun lebih awal",
        },
        {
          correct: true,
          label:
            "Kira-kira $$11\\,460$$ tahun, dan kira-kira $$11\\,460$$ tahun lebih awal",
        },
        {
          correct: false,
          label:
            "Kira-kira $$11\\,460$$ tahun, dan kira-kira $$22\\,920$$ tahun lebih awal",
        },
      ],
    },
  },
};

export default item;
