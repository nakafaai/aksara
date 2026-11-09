import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "outline",
  },
  stimulus: "borrowed-camera",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Aunt Ratih lends Bayu her film camera" },
        {
          correct: false,
          label: "Bayu walks around the harbor and takes three pictures",
        },
        { correct: false, label: "Bayu gives his prize money to his aunt" },
        {
          correct: true,
          label: "the lens cap rolls between the rocks into the water",
        },
        {
          correct: false,
          label: "the judge writes a note on the back of the photo",
        },
      ],
    },
  },
};

export default item;
