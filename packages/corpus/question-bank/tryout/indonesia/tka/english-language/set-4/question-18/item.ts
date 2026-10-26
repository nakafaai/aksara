import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "pinhole-projector",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Making the projector, the danger of looking at the Sun, adjusting the image, setting it up, a final warning",
        },
        {
          correct: false,
          label:
            "The danger of looking at the Sun, setting it up, making the projector, adjusting the image, a final warning",
        },
        {
          correct: true,
          label:
            "The danger of looking at the Sun, making the projector, setting it up, adjusting the image, a final warning",
        },
        {
          correct: false,
          label:
            "The danger of looking at the Sun, making the projector, testing sunglasses, setting it up, adjusting the image",
        },
        {
          correct: false,
          label:
            "The danger of looking at the Sun, making the projector, looking through the pinhole, adjusting the image, a final warning",
        },
      ],
    },
  },
};

export default item;
