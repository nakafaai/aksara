import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "piano-lessons",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "That the note is a habit so old the narrator no longer notices it, and Mr Hollis, who can hear it, stops her there in his first week.",
        },
        {
          correct: false,
          label:
            "That the note is a habit so old the narrator no longer notices it, and the narrator finally fixes it before leaving Mrs Varga.",
        },
        {
          correct: false,
          label:
            "That the note is something Mrs Varga herself had stopped hearing, and Mr Hollis, who can hear it, stops the narrator there.",
        },
        {
          correct: false,
          label:
            "That the note is a habit so old the narrator no longer notices it, and Mr Hollis stops her there because the conservatory piano is out of tune.",
        },
        {
          correct: false,
          label:
            "That the note comes from an old piano, and the conservatory's piano shows the note was never wrong.",
        },
      ],
    },
  },
};

export default item;
