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
          label: "$$0.00750\\text{ mol}$$, $$37.5\\%$$, $$180\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.0175\\text{ mol}$$, $$87.5\\%$$, $$840\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$0.0175\\text{ mol}$$, $$87.5\\%$$, $$420\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.0175\\text{ mol}$$, $$27.8\\%$$, $$420\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.00750\\text{ mol}$$, $$37.5\\%$$, $$180\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.0175\\text{ mol}$$, $$87.5\\%$$, $$840\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$0.0175\\text{ mol}$$, $$87.5\\%$$, $$420\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.0175\\text{ mol}$$, $$27.8\\%$$, $$420\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
