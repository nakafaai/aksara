import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ethanoic acid needs only $$1.0\\text{ cm}^3$$ of alkali, because only $$4.0\\%$$ of its molecules are ionised",
        },
        {
          correct: false,
          label:
            "Both acids need $$25.0\\text{ cm}^3$$ of alkali, and about $$0.40\\%$$ of the ethanoic acid molecules are ionised",
        },
        {
          correct: false,
          label:
            "Ethanoic acid needs more than $$25.0\\text{ cm}^3$$ of alkali, because its molecules keep ionising as the alkali is added",
        },
        {
          correct: true,
          label:
            "Both acids need $$25.0\\text{ cm}^3$$ of alkali, and about $$4.0\\%$$ of the ethanoic acid molecules are ionised, more than the $$1.3\\%$$ at $$0.10\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Asid etanoik hanya memerlukan $$1.0\\text{ cm}^3$$ alkali, kerana hanya $$4.0\\%$$ molekulnya mengion",
        },
        {
          correct: false,
          label:
            "Kedua-dua asid memerlukan $$25.0\\text{ cm}^3$$ alkali, dan kira-kira $$0.40\\%$$ molekul asid etanoik mengion",
        },
        {
          correct: false,
          label:
            "Asid etanoik memerlukan lebih daripada $$25.0\\text{ cm}^3$$ alkali, kerana molekulnya terus mengion semasa alkali ditambah",
        },
        {
          correct: true,
          label:
            "Kedua-dua asid memerlukan $$25.0\\text{ cm}^3$$ alkali, dan kira-kira $$4.0\\%$$ molekul asid etanoik mengion, lebih daripada $$1.3\\%$$ pada $$0.10\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
