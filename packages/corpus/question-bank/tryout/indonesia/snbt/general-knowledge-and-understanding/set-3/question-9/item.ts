import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "polysemy",
  },
  stimulus: "kedelai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia ingin *membalas* jasa gurunya dengan merawat beliau di hari tua.",
        },
        {
          correct: false,
          label:
            "Hutan yang dijaga warga *membalas* mereka dengan mata air yang tak pernah kering.",
        },
        {
          correct: false,
          label:
            "Warga *membalas* kiriman bibit dari dinas pertanian dengan sekeranjang hasil panen pertama.",
        },
        {
          correct: false,
          label:
            "Pemilik sawah *membalas* bantuan para tetangganya dengan sebagian hasil panen.",
        },
        {
          correct: true,
          label:
            "Setelah ditraktir makan siang, ia *membalas* pesan temannya dengan ucapan terima kasih yang singkat.",
        },
      ],
    },
  },
};

export default item;
