import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "basic-income",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "To show a response to a national payment that a small pilot cannot reveal",
        },
        {
          correct: false,
          label:
            "To argue that landlords should be the first group to receive the payment",
        },
        {
          correct: false,
          label:
            "To report that prices rose sharply during the Finnish pilot programme",
        },
        {
          correct: false,
          label:
            "To suggest that most shopkeepers would vote in favour of a basic income",
        },
        {
          correct: false,
          label:
            "To claim that prices would certainly double under any universal scheme",
        },
      ],
    },
  },
};

export default item;
