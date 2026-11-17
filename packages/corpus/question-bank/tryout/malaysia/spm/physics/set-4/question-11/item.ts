import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$83\\text{ kPa}$$, and the cap is pushed in with $$6.7\\text{ N}$$",
        },
        {
          correct: true,
          label:
            "$$111\\text{ kPa}$$, and the cap is pushed out with $$4.4\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$133\\text{ kPa}$$, and the cap is pushed out with $$13\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$111\\text{ kPa}$$, and the cap is pushed out with $$44\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$83\\text{ kPa}$$, dan penutup ditolak ke dalam dengan $$6.7\\text{ N}$$",
        },
        {
          correct: true,
          label:
            "$$111\\text{ kPa}$$, dan penutup ditolak ke luar dengan $$4.4\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$133\\text{ kPa}$$, dan penutup ditolak ke luar dengan $$13\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$111\\text{ kPa}$$, dan penutup ditolak ke luar dengan $$44\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
