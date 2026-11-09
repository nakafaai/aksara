import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "sidat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kebiasaan sidat bersembunyi di dalam lumpur pada siang hari",
        },
        {
          correct: true,
          label: "perjalanan sidat antara sungai dan laut sepanjang hidupnya",
        },
        {
          correct: false,
          label: "cara petani membudidayakan sidat di kolam",
        },
        {
          correct: false,
          label: "bentuk tubuh sidat yang panjang seperti belut",
        },
        {
          correct: false,
          label: "kebiasaan sidat memakan ikan-ikan kecil di sungai",
        },
      ],
    },
  },
};

export default item;
