import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "At $$30\\text{ cm}$$ or $$60\\text{ cm}$$ from the object, and the image shrinks from $$6.0\\text{ cm}$$ to $$1.5\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "Only at $$45\\text{ cm}$$ from the object, with an image $$3.0\\text{ cm}$$ tall",
        },
        {
          correct: false,
          label:
            "At $$30\\text{ cm}$$ or $$60\\text{ cm}$$ from the object, with an image $$6.0\\text{ cm}$$ tall both times",
        },
        {
          correct: false,
          label:
            "At $$40\\text{ cm}$$ or $$50\\text{ cm}$$ from the object, and the image shrinks from $$6.0\\text{ cm}$$ to $$3.8\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pada $$30\\text{ cm}$$ atau $$60\\text{ cm}$$ dari objek, dan imej mengecil daripada $$6.0\\text{ cm}$$ kepada $$1.5\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "Hanya pada $$45\\text{ cm}$$ dari objek, dengan imej setinggi $$3.0\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "Pada $$30\\text{ cm}$$ atau $$60\\text{ cm}$$ dari objek, dengan imej setinggi $$6.0\\text{ cm}$$ pada kedua-dua kedudukan",
        },
        {
          correct: false,
          label:
            "Pada $$40\\text{ cm}$$ atau $$50\\text{ cm}$$ dari objek, dan imej mengecil daripada $$6.0\\text{ cm}$$ kepada $$3.8\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
