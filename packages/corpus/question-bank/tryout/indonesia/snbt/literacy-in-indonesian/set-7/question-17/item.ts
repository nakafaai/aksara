import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "rooftop-solar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menambah panel surya agar listrik yang mengalir ke jaringan pada siang hari makin besar.",
        },
        {
          correct: false,
          label:
            "Mematikan panel surya pada siang hari agar listrik di jaringan tidak berlebih.",
        },
        {
          correct: false,
          label:
            "Menyalakan pompa air pada malam hari ketika panel tidak bekerja.",
        },
        {
          correct: false,
          label:
            "Menjual sebagian panel kepada Rumah R yang pemakaiannya paling besar.",
        },
        {
          correct: true,
          label:
            "Memindahkan pemakaian alat yang boros listrik dari malam hari ke siang hari.",
        },
      ],
    },
  },
};

export default item;
