import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "jelantah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Jika langsung dibuat menjadi biodiesel tanpa dipisahkan airnya lebih dulu, sebagian jelantah itu berisiko berubah menjadi sabun.",
        },
        {
          correct: false,
          label:
            "Pengumpul keliling dapat membayar lebih mahal karena mereka tidak perlu menyaring dan mendiamkan jelantah.",
        },
        {
          correct: false,
          label:
            "Jelantah itu lebih banyak mengandung air daripada jelantah yang disetor warga ke bank sampah.",
        },
        {
          correct: false,
          label:
            "Pabrik biodiesel menolak jelantah yang dibeli pengumpul keliling.",
        },
        {
          correct: false,
          label:
            "Jelantah itu pasti dijernihkan lalu dijual lagi sebagai minyak goreng curah.",
        },
      ],
    },
  },
};

export default item;
