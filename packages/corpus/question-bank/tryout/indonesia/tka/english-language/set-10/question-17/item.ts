import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "sequence",
  },
  stimulus: "book-cover",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "taping each corner of the flaps to the plastic",
        },
        {
          correct: false,
          label: "marking a line 5 centimeters outside the book",
        },
        {
          correct: true,
          label:
            "folding the plastic along the top and bottom edges over the inside of the covers",
        },
        { correct: false, label: "opening and closing the book a few times" },
        { correct: false, label: "writing your name on a sticker" },
      ],
    },
  },
};

export default item;
