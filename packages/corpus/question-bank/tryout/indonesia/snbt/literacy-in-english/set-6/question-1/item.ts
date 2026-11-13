import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "dog-pointing",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The wolf pups had had less contact with people than the dog pups, so the comparison was tilted in the dogs' favour.",
        },
        {
          correct: false,
          label:
            "The pups were too young for learning to have played any part, so the test could not show what experience adds.",
        },
        {
          correct: false,
          label:
            "The dog pups also beat the wolf pups on memory and self-control, so a general gap in ability may explain the result.",
        },
        {
          correct: false,
          label:
            "Only about half of the dog pups chose the right bowl consistently, so the dogs' advantage was too small to interpret.",
        },
        {
          correct: true,
          label:
            "The pups differed in how readily they approached people, and a pup wary of the person pointing could fail without misreading the gesture.",
        },
      ],
    },
  },
};

export default item;
