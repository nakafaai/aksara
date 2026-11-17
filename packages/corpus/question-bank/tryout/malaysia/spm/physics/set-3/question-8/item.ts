import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Orbital speed $$5.0\\text{ km s}^{-1}$$ and escape speed $$3.5\\text{ km s}^{-1}$$, so the probe escapes, and a low orbit takes about $$71$$ minutes",
        },
        {
          correct: false,
          label:
            "Orbital speed $$3.5\\text{ km s}^{-1}$$ and escape speed $$5.0\\text{ km s}^{-1}$$, so the probe falls straight back without going round, and a low orbit takes about $$100$$ minutes",
        },
        {
          correct: true,
          label:
            "Orbital speed $$3.5\\text{ km s}^{-1}$$ and escape speed $$5.0\\text{ km s}^{-1}$$, so the probe climbs above a low orbit but does not escape, and a low orbit takes about $$100$$ minutes",
        },
        {
          correct: false,
          label:
            "Orbital speed $$3.5\\text{ km s}^{-1}$$ and escape speed $$5.0\\text{ km s}^{-1}$$, so the probe climbs above a low orbit but does not escape, and a low orbit takes about $$71$$ minutes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Laju orbit $$5.0\\text{ km s}^{-1}$$ dan laju lepas $$3.5\\text{ km s}^{-1}$$, jadi prob itu terlepas, dan satu orbit rendah mengambil masa kira-kira $$71$$ minit",
        },
        {
          correct: false,
          label:
            "Laju orbit $$3.5\\text{ km s}^{-1}$$ dan laju lepas $$5.0\\text{ km s}^{-1}$$, jadi prob itu jatuh terus tanpa mengelilingi planet, dan satu orbit rendah mengambil masa kira-kira $$100$$ minit",
        },
        {
          correct: true,
          label:
            "Laju orbit $$3.5\\text{ km s}^{-1}$$ dan laju lepas $$5.0\\text{ km s}^{-1}$$, jadi prob itu naik melepasi orbit rendah tetapi tidak terlepas, dan satu orbit rendah mengambil masa kira-kira $$100$$ minit",
        },
        {
          correct: false,
          label:
            "Laju orbit $$3.5\\text{ km s}^{-1}$$ dan laju lepas $$5.0\\text{ km s}^{-1}$$, jadi prob itu naik melepasi orbit rendah tetapi tidak terlepas, dan satu orbit rendah mengambil masa kira-kira $$71$$ minit",
        },
      ],
    },
  },
};

export default item;
