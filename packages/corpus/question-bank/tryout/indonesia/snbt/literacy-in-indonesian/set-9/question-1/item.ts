import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "c4-photosynthesis",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Air tanah menipis, stomata menutup, suhu daun naik, lalu Rubisco lebih sering mengikat oksigen.",
        },
        {
          correct: true,
          label:
            "Air tanah menipis, stomata menutup, $$\\mathrm{CO_2}$$ sulit masuk sementara oksigen menumpuk, lalu Rubisco lebih sering mengikat oksigen dan sebagian karbon terlepas kembali.",
        },
        {
          correct: false,
          label:
            "Air tanah menipis, stomata membuka lebar, oksigen keluar dari daun, lalu Rubisco kekurangan oksigen.",
        },
        {
          correct: false,
          label:
            "Air tanah menipis, stomata menutup, $$\\mathrm{CO_2}$$ menumpuk di dalam daun, lalu Rubisco lebih sering mengikat $$\\mathrm{CO_2}$$.",
        },
        {
          correct: false,
          label:
            "Air tanah menipis, stomata menutup, $$\\mathrm{CO_2}$$ sulit masuk, lalu PEP karboksilase mengikat oksigen sebagai gantinya.",
        },
      ],
    },
  },
};

export default item;
