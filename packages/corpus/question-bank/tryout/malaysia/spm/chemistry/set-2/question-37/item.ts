import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$999$$ water molecules, $$M_r=113\\,018$$" },
        {
          correct: false,
          label: "$$1000$$ water molecules, $$M_r=113\\,000$$",
        },
        { correct: false, label: "$$500$$ water molecules, $$M_r=122\\,000$$" },
        { correct: false, label: "$$999$$ water molecules, $$M_r=131\\,000$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$999$$ molekul air, $$M_r=113\\,018$$" },
        { correct: false, label: "$$1000$$ molekul air, $$M_r=113\\,000$$" },
        { correct: false, label: "$$500$$ molekul air, $$M_r=122\\,000$$" },
        { correct: false, label: "$$999$$ molekul air, $$M_r=131\\,000$$" },
      ],
    },
  },
};

export default item;
