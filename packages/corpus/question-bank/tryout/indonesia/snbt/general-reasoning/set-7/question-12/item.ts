import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{,}75\\text{ meter}$$",
        },
        {
          correct: false,
          label: "$$1{,}85\\text{ meter}$$",
        },
        {
          correct: false,
          label: "$$1{,}90\\text{ meter}$$",
        },
        {
          correct: true,
          label: "$$2{,}00\\text{ meter}$$",
        },
        {
          correct: false,
          label: "$$2{,}10\\text{ meter}$$",
        },
      ],
    },
  },
};

export default item;
