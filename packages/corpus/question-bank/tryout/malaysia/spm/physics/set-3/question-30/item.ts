import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2000\\text{ W}$$; the fuse holds",
        },
        {
          correct: true,
          label: "$$4000\\text{ W}$$; the fuse blows",
        },
        {
          correct: false,
          label: "$$4000\\text{ W}$$; the fuse holds",
        },
        {
          correct: false,
          label: "$$250\\text{ W}$$; the fuse holds",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2000\\text{ W}$$; fius bertahan",
        },
        {
          correct: true,
          label: "$$4000\\text{ W}$$; fius terputus",
        },
        {
          correct: false,
          label: "$$4000\\text{ W}$$; fius bertahan",
        },
        {
          correct: false,
          label: "$$250\\text{ W}$$; fius bertahan",
        },
      ],
    },
  },
};

export default item;
