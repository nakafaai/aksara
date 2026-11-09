import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "air-sensor",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "laporan itu pasti benar karena sensor menghitung partikel setiap beberapa menit",
        },
        {
          correct: false,
          label:
            "laporan itu pasti salah karena sensor murah tidak pernah akurat",
        },
        {
          correct: true,
          label:
            "laporan itu perlu diperiksa karena kelembapan kabut dapat membuat angka sensor lebih tinggi daripada keadaan sebenarnya",
        },
        {
          correct: false,
          label:
            "laporan itu dapat dipercaya jika sensor dipasang di dekat dapur",
        },
        {
          correct: false,
          label:
            "laporan itu tepat karena kabut selalu mengandung asap kendaraan",
        },
      ],
    },
  },
};

export default item;
