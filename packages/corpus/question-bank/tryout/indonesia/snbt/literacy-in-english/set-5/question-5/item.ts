import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "continental-drift",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To show that the continents were in fact standing still in Wegener's lifetime, just as most of his critics at the time had claimed.",
        },
        {
          correct: false,
          label:
            "To explain why physicists concluded that the push caused by the Earth's spin was far too weak to move an entire continent.",
        },
        {
          correct: false,
          label:
            "To point out that Wegener's critics had measured the drift of Greenland much more accurately than Wegener himself had managed to.",
        },
        {
          correct: false,
          label:
            "To suggest that a rate of a few centimetres a year is too slow ever to have separated South America from Africa.",
        },
        {
          correct: true,
          label:
            "To show that some doubt about drift had a fair basis in Wegener's own data, which weakens the story of critics who dismissed him unthinkingly.",
        },
      ],
    },
  },
};

export default item;
