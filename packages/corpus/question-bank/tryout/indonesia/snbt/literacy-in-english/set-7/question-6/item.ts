import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "attendance-rules",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "By questioning the review's numbers, on the grounds that motivated students make the link between attendance and grades look stronger than it is",
        },
        {
          correct: false,
          label:
            "By accepting the review but answering it with department figures that, in the writer's view, prove a rule leaves marks unchanged",
        },
        {
          correct: true,
          label:
            "By accepting the link the review found but arguing that it describes students who chose to attend, not what a rule would do to the rest",
        },
        {
          correct: false,
          label:
            "By setting the review aside because it studied lectures, whereas the writer thinks attendance matters only in small tutorials",
        },
        {
          correct: false,
          label:
            "By accepting the review and agreeing that a rule would raise marks, though only for new students in first-year tutorials",
        },
      ],
    },
  },
};

export default item;
