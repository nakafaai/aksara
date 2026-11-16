import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Its relative atomic mass is 36.0, and the X₂ peaks at 70, 72 and 74 have equal heights",
        },
        {
          correct: false,
          label:
            "Its relative atomic mass is 35.5, and only two X₂ peaks appear, at 70 and 74",
        },
        {
          correct: true,
          label:
            "Its relative atomic mass is 35.5, and the X₂ peaks at 70, 72 and 74 have heights in the ratio of about 10 : 6 : 1",
        },
        {
          correct: false,
          label:
            "Its relative atomic mass is 36.5, and the X₂ peaks at 70, 72 and 74 have heights in the ratio of about 10 : 6 : 1",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jisim atom relatifnya ialah 36.0, dan puncak X₂ pada 70, 72 dan 74 sama tinggi",
        },
        {
          correct: false,
          label:
            "Jisim atom relatifnya ialah 35.5, dan hanya dua puncak X₂ muncul, pada 70 dan 74",
        },
        {
          correct: true,
          label:
            "Jisim atom relatifnya ialah 35.5, dan puncak X₂ pada 70, 72 dan 74 mempunyai ketinggian dalam nisbah kira-kira 10 : 6 : 1",
        },
        {
          correct: false,
          label:
            "Jisim atom relatifnya ialah 36.5, dan puncak X₂ pada 70, 72 dan 74 mempunyai ketinggian dalam nisbah kira-kira 10 : 6 : 1",
        },
      ],
    },
  },
};

export default item;
