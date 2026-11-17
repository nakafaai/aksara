import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Focal length $$12.5\\text{ cm}$$, power $$+8.0\\text{ D}$$, and an image $$25\\text{ cm}$$ wide",
        },
        {
          correct: true,
          label:
            "Focal length $$12.2\\text{ cm}$$, power $$+8.2\\text{ D}$$, and an image $$25\\text{ cm}$$ wide",
        },
        {
          correct: false,
          label:
            "Focal length $$12.2\\text{ cm}$$, power $$-8.2\\text{ D}$$, and an image $$25\\text{ cm}$$ wide",
        },
        {
          correct: false,
          label:
            "Focal length $$12.2\\text{ cm}$$, power $$+8.2\\text{ D}$$, and an image $$28\\text{ cm}$$ wide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Panjang fokus $$12.5\\text{ cm}$$, kuasa $$+8.0\\text{ D}$$, dan imej selebar $$25\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "Panjang fokus $$12.2\\text{ cm}$$, kuasa $$+8.2\\text{ D}$$, dan imej selebar $$25\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "Panjang fokus $$12.2\\text{ cm}$$, kuasa $$-8.2\\text{ D}$$, dan imej selebar $$25\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "Panjang fokus $$12.2\\text{ cm}$$, kuasa $$+8.2\\text{ D}$$, dan imej selebar $$28\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
