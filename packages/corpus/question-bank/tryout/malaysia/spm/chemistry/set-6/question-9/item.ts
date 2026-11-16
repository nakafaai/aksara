import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1920\\text{ dm}^3$$, and its atoms have a stable octet, $$2.8.8$$, while the gas is $$1.38$$ times as dense as air, so it settles over the weld",
        },
        {
          correct: false,
          label:
            "$$960\\text{ dm}^3$$, and its atoms have a stable octet, $$2.8.8$$, while the gas is $$1.38$$ times as dense as air, so it settles over the weld",
        },
        {
          correct: false,
          label:
            "$$1920\\text{ dm}^3$$, and its atoms have a stable octet, $$2.8.8$$, while the gas is $$0.73$$ times as dense as air, so it rises over the weld",
        },
        {
          correct: false,
          label:
            "$$1920\\text{ dm}^3$$, and its atoms share electrons in strong $$\\text{Ar}_2$$ molecules, while the gas is $$1.38$$ times as dense as air",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1920\\text{ dm}^3$$, dan atomnya mempunyai oktet yang stabil, $$2.8.8$$, manakala gas itu $$1.38$$ kali lebih tumpat daripada udara, jadi ia mendap di atas kimpalan",
        },
        {
          correct: false,
          label:
            "$$960\\text{ dm}^3$$, dan atomnya mempunyai oktet yang stabil, $$2.8.8$$, manakala gas itu $$1.38$$ kali lebih tumpat daripada udara, jadi ia mendap di atas kimpalan",
        },
        {
          correct: false,
          label:
            "$$1920\\text{ dm}^3$$, dan atomnya mempunyai oktet yang stabil, $$2.8.8$$, manakala gas itu $$0.73$$ kali ketumpatan udara, jadi ia naik di atas kimpalan",
        },
        {
          correct: false,
          label:
            "$$1920\\text{ dm}^3$$, dan atomnya berkongsi elektron dalam molekul $$\\text{Ar}_2$$ yang kuat, manakala gas itu $$1.38$$ kali lebih tumpat daripada udara",
        },
      ],
    },
  },
};

export default item;
