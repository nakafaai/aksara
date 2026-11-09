import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "bekantan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pohon di tepi sungai",
        },
        {
          correct: true,
          label: "kelompok bekantan itu",
        },
        {
          correct: false,
          label: "perkebunan dan permukiman",
        },
        {
          correct: false,
          label: "bakteri di dalam lambung",
        },
        {
          correct: false,
          label: "hutan bakau dan rawa",
        },
      ],
    },
  },
};

export default item;
