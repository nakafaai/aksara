import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Making the projector, the danger of looking at the Sun, adjusting the image, setting it up, a final warning",
        },
        {
          isCorrect: false,
          label:
            "The danger of looking at the Sun, setting it up, making the projector, adjusting the image, a final warning",
        },
        {
          isCorrect: true,
          label:
            "The danger of looking at the Sun, making the projector, setting it up, adjusting the image, a final warning",
        },
        {
          isCorrect: false,
          label:
            "The danger of looking at the Sun, making the projector, testing sunglasses, setting it up, adjusting the image",
        },
        {
          isCorrect: false,
          label:
            "The danger of looking at the Sun, making the projector, looking through the pinhole, adjusting the image, a final warning",
        },
      ],
    },
  },
  stimulusKey: "pinhole-projector",
};

export default item;
