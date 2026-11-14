import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "affix-meaning",
  },
  stimulus: "kopi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "_pengolahan_ dan _pengemasan_, karena keduanya sudah tepat",
        },
        { correct: false, label: "_olahan_ dan _pengemasan_" },
        { correct: true, label: "_olahan_ dan _kemasan_" },
        { correct: false, label: "_pengolahan_ dan _kemasan_" },
        { correct: false, label: "_pengolah_ dan _pengemas_" },
      ],
    },
  },
};

export default item;
