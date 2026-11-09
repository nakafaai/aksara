import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "machine-pictures",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A user who typed a one-line prompt and posted the first picture unchanged",
        },
        {
          correct: false,
          label:
            "A buyer who commissioned a portrait and described what it should show",
        },
        {
          correct: true,
          label:
            "A comic artist who redrew AI backgrounds and laid out every panel by hand",
        },
        {
          correct: false,
          label:
            "A company that owns the computers on which the image generator runs",
        },
        {
          correct: false,
          label:
            "A website that stores and displays the picture after a user uploads it",
        },
      ],
    },
  },
};

export default item;
