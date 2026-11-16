import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10\\,700\\text{ years}$$",
        },
        {
          correct: true,
          label: "$$11\\,460\\text{ years}$$",
        },
        {
          correct: false,
          label: "$$22\\,920\\text{ years}$$",
        },
        {
          correct: false,
          label: "$$5730\\text{ years}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10\\,700\\text{ tahun}$$",
        },
        {
          correct: true,
          label: "$$11\\,460\\text{ tahun}$$",
        },
        {
          correct: false,
          label: "$$22\\,920\\text{ tahun}$$",
        },
        {
          correct: false,
          label: "$$5730\\text{ tahun}$$",
        },
      ],
    },
  },
};

export default item;
