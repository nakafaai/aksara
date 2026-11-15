import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "night-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "From a stranger she feared to someone who protected her only because her mother had asked, so his care meant little.",
        },
        {
          correct: true,
          label:
            "From a stranger she feared to someone who quietly protected her, perhaps at more trouble to himself than her mother knew.",
        },
        {
          correct: false,
          label:
            "From a stranger she feared to someone who quietly protected her on his own way home, two streets past hers, as her mother said.",
        },
        {
          correct: false,
          label:
            "From a stranger she feared to someone who quietly protected her because he wanted to be thanked.",
        },
        {
          correct: false,
          label:
            "From a stranger she ignored to a neighbour she had known all along.",
        },
      ],
    },
  },
};

export default item;
