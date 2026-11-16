import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$10\\text{ Hz}$$; the waves are totally reflected",
        },
        {
          correct: false,
          label:
            "$$10\\text{ Hz}$$; they enter the deep region at $$23^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$17\\text{ Hz}$$; they enter the deep region at $$23^\\circ$$",
        },
        {
          correct: false,
          label: "$$6\\text{ Hz}$$; the waves are totally reflected",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$10\\text{ Hz}$$; gelombang dipantulkan sepenuhnya",
        },
        {
          correct: false,
          label:
            "$$10\\text{ Hz}$$; gelombang memasuki kawasan dalam pada $$23^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$17\\text{ Hz}$$; gelombang memasuki kawasan dalam pada $$23^\\circ$$",
        },
        {
          correct: false,
          label: "$$6\\text{ Hz}$$; gelombang dipantulkan sepenuhnya",
        },
      ],
    },
  },
};

export default item;
