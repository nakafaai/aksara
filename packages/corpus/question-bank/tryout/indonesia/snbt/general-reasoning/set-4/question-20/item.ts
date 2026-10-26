import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Makanan selingan sekolah yang aman dan bergizi seimbang dapat membantu memenuhi asupan zat gizi anak",
        },
        {
          correct: false,
          label: "Semua jajanan sekolah tidak aman",
        },
        {
          correct: false,
          label: "Anak sebaiknya mengganti makanan utama dengan jajanan",
        },
        {
          correct: false,
          label:
            "Keamanan mikrobiologis dan kimia boleh diabaikan jika jajanan menyediakan cukup energi",
        },
        {
          correct: false,
          label:
            "Energi merupakan satu-satunya pertimbangan gizi saat memilih makanan selingan",
        },
      ],
    },
  },
};

export default item;
