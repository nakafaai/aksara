import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The peroxide is now $$0.16\\text{ mol dm}^{-3}$$, so $$60\\%$$ of it has decomposed in the bottle",
        },
        {
          correct: false,
          label:
            "The peroxide is now $$0.32\\text{ mol dm}^{-3}$$, so $$20\\%$$ has decomposed, and less than $$0.50\\text{ g}$$ of manganese(IV) oxide is recovered",
        },
        {
          correct: true,
          label:
            "The peroxide is now $$0.32\\text{ mol dm}^{-3}$$, so $$20\\%$$ has decomposed, and all $$0.50\\text{ g}$$ of manganese(IV) oxide is recovered",
        },
        {
          correct: false,
          label:
            "The peroxide is now $$0.32\\text{ mol dm}^{-3}$$, so $$80\\%$$ has decomposed in the bottle",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Peroksida kini $$0.16\\text{ mol dm}^{-3}$$, jadi $$60\\%$$ daripadanya telah terurai dalam botol",
        },
        {
          correct: false,
          label:
            "Peroksida kini $$0.32\\text{ mol dm}^{-3}$$, jadi $$20\\%$$ telah terurai, dan kurang daripada $$0.50\\text{ g}$$ mangan(IV) oksida diperoleh semula",
        },
        {
          correct: true,
          label:
            "Peroksida kini $$0.32\\text{ mol dm}^{-3}$$, jadi $$20\\%$$ telah terurai, dan kesemua $$0.50\\text{ g}$$ mangan(IV) oksida diperoleh semula",
        },
        {
          correct: false,
          label:
            "Peroksida kini $$0.32\\text{ mol dm}^{-3}$$, jadi $$80\\%$$ telah terurai dalam botol",
        },
      ],
    },
  },
};

export default item;
