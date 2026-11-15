import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "characterization",
  },
  stimulus: "spare-key",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "That Gran accepts help with her memory as long as it stays private, and the narrator goes along with that.",
        },
        {
          correct: false,
          label:
            "That Gran accepts help with her memory, but the narrator resents having to keep quiet about it.",
        },
        {
          correct: false,
          label:
            "That Gran refuses any help with her memory, so the narrator stops trying to give it.",
        },
        {
          correct: false,
          label:
            "That Gran no longer needs any help, because the note means she will never forget again.",
        },
        {
          correct: false,
          label:
            "That Gran writes the place down to prove to the narrator that her memory is still sound.",
        },
      ],
    },
  },
};

export default item;
