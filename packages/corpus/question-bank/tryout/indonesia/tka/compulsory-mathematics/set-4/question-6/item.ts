import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1\\text{ tahun}$$",
        },
        {
          correct: false,
          label: "$$5\\text{ tahun}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ tahun}$$",
        },
        {
          correct: true,
          label: "$$25\\text{ tahun}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ tahun}$$",
        },
      ],
    },
  },
};

export default item;
