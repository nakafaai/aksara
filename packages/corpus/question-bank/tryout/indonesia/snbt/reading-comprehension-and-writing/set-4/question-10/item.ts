import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "cassava-flour",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "merendam irisan singkong di dalam air yang diberi bakteri baik",
        },
        {
          correct: true,
          label: "mencampur tepung singkong fermentasi dengan sedikit terigu",
        },
        {
          correct: false,
          label: "membuat kue seluruhnya dari tepung singkong",
        },
        {
          correct: false,
          label: "menanam singkong sendiri di kabupaten itu",
        },
        {
          correct: false,
          label: "mengeringkan dan menggiling irisan singkong",
        },
      ],
    },
  },
};

export default item;
