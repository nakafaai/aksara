import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Wavelength $$1.2\\text{ cm}$$, angle of refraction $$56^\\circ$$",
        },
        {
          correct: false,
          label:
            "Wavelength $$3.3\\text{ cm}$$, angle of refraction $$17^\\circ$$",
        },
        {
          correct: true,
          label:
            "Wavelength $$1.2\\text{ cm}$$, angle of refraction $$17^\\circ$$",
        },
        {
          correct: false,
          label:
            "Wavelength $$2.0\\text{ cm}$$, angle of refraction $$17^\\circ$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Panjang gelombang $$1.2\\text{ cm}$$, sudut biasan $$56^\\circ$$",
        },
        {
          correct: false,
          label:
            "Panjang gelombang $$3.3\\text{ cm}$$, sudut biasan $$17^\\circ$$",
        },
        {
          correct: true,
          label:
            "Panjang gelombang $$1.2\\text{ cm}$$, sudut biasan $$17^\\circ$$",
        },
        {
          correct: false,
          label:
            "Panjang gelombang $$2.0\\text{ cm}$$, sudut biasan $$17^\\circ$$",
        },
      ],
    },
  },
};

export default item;
