import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "phineas-gage",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "It included details, such as fights and heavy drinking, that appear in no account by anyone who knew him.",
        },
        {
          correct: true,
          label:
            "It treated changes seen soon after the accident as lasting for the rest of his life.",
        },
        {
          correct: false,
          label:
            "It claimed that Gage survived an iron rod passing through his head.",
        },
        {
          correct: true,
          label:
            "It said he could never hold a job again, although he later worked for years as a coach driver in Chile.",
        },
        {
          correct: false,
          label:
            "It used Harlow's report that Gage's friends said he was \"no longer Gage\".",
        },
      ],
    },
  },
};

export default item;
