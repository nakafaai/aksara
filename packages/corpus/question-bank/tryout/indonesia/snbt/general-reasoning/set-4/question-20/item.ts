import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Makanan selingan sekolah yang aman dan bergizi seimbang dapat membantu memenuhi asupan zat gizi anak",
        },
        {
          isCorrect: false,
          label: "Semua jajanan sekolah tidak aman",
        },
        {
          isCorrect: false,
          label: "Anak sebaiknya mengganti makanan utama dengan jajanan",
        },
        {
          isCorrect: false,
          label:
            "Keamanan mikrobiologis dan kimia boleh diabaikan jika jajanan menyediakan cukup energi",
        },
        {
          isCorrect: false,
          label:
            "Energi merupakan satu-satunya pertimbangan gizi saat memilih makanan selingan",
        },
      ],
    },
  },
};

export default item;
