import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "berani mengambil risiko tanpa memeriksa akibatnya",
        },
        {
          isCorrect: true,
          label:
            "tanggap memanfaatkan alat yang tersedia saat rencana pertama gagal",
        },
        {
          isCorrect: false,
          label:
            "setia mempertahankan kebiasaan walaupun keadaan sudah berubah",
        },
        {
          isCorrect: false,
          label: "bergantung pada orang dewasa untuk memulai pertolongan",
        },
        {
          isCorrect: false,
          label: "keras kepala menolak alat baru yang ditawarkan kampung",
        },
      ],
    },
  },
  stimulusKey: "harbor-lamp",
};

export default item;
