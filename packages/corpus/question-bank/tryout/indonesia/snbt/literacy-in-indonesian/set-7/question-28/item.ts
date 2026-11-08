import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "waste-meeting",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "anak Bu Ning sudah sembuh sehingga tidak akan batuk lagi",
        },
        {
          correct: false,
          label: "Bu Ning menuduh Pak Hasan sebagai penyebab batuk anaknya",
        },
        {
          correct: false,
          label: "warga lain sudah lebih dulu batuk karena bau sampah",
        },
        {
          correct: true,
          label: "membakar sampah akan mengganggu kesehatan lebih banyak warga",
        },
        {
          correct: false,
          label:
            "Bu Ning mungkin ingin pindah dari kampung itu bersama anaknya",
        },
      ],
    },
  },
};

export default item;
