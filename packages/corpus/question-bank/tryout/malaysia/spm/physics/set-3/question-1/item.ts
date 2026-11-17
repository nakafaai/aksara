import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$7.94\\text{ g cm}^{-3}$$, and the ball has no cavity because it is denser than steel",
        },
        {
          correct: true,
          label:
            "$$7.80\\text{ g cm}^{-3}$$, and the ball hides a cavity of about $$0.95\\text{ mm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.975\\text{ g cm}^{-3}$$, and the ball hides a cavity of about $$0.96\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$7.87\\text{ g cm}^{-3}$$, and the ball has no cavity because it is denser than steel",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$7.94\\text{ g cm}^{-3}$$, dan bebola itu tidak berongga kerana lebih tumpat daripada keluli",
        },
        {
          correct: true,
          label:
            "$$7.80\\text{ g cm}^{-3}$$, dan bebola itu menyembunyikan rongga kira-kira $$0.95\\text{ mm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.975\\text{ g cm}^{-3}$$, dan bebola itu menyembunyikan rongga kira-kira $$0.96\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$7.87\\text{ g cm}^{-3}$$, dan bebola itu tidak berongga kerana lebih tumpat daripada keluli",
        },
      ],
    },
  },
};

export default item;
