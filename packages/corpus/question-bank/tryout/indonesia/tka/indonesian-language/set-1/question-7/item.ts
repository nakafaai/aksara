import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "harbor-lamp",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "berani mengambil risiko tanpa memeriksa akibatnya",
        },
        {
          correct: true,
          label:
            "tanggap memanfaatkan alat yang tersedia saat rencana pertama gagal",
        },
        {
          correct: false,
          label:
            "setia mempertahankan kebiasaan walaupun keadaan sudah berubah",
        },
        {
          correct: false,
          label: "bergantung pada orang dewasa untuk memulai pertolongan",
        },
        {
          correct: false,
          label: "keras kepala menolak alat baru yang ditawarkan kampung",
        },
      ],
    },
  },
};

export default item;
