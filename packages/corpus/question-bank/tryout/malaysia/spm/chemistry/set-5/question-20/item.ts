import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$57.6\\text{ kg}$$ of boric acid, $$7.74\\text{ m}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$115\\text{ kg}$$ of boric acid, $$15.5\\text{ m}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$115\\text{ kg}$$ of boric acid, $$7.74\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: true,
          label:
            "$$115\\text{ kg}$$ of boric acid, $$7.74\\text{ m}^3$$ of carbon dioxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$57.6\\text{ kg}$$ asid borik, $$7.74\\text{ m}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$115\\text{ kg}$$ asid borik, $$15.5\\text{ m}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$115\\text{ kg}$$ asid borik, $$7.74\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: true,
          label:
            "$$115\\text{ kg}$$ asid borik, $$7.74\\text{ m}^3$$ karbon dioksida",
        },
      ],
    },
  },
};

export default item;
