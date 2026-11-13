import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "el-nino-drought",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kekeringan akan lebih parah daripada pada tahun El Nino biasa karena dua samudra sama-sama menyimpang dari keadaan normalnya.",
        },
        {
          correct: false,
          label:
            "Hujan akan tetap normal karena pengaruh IOD dan pengaruh El Nino saling meniadakan.",
        },
        {
          correct: false,
          label:
            "Pengaruh El Nino belum terasa pada bulan itu karena pengaruhnya baru muncul pada puncak musim hujan.",
        },
        {
          correct: false,
          label:
            "Hujan akan jauh di atas normal karena perairan hangat di dekat Sumatra dan Jawa lebih menentukan daripada El Nino.",
        },
        {
          correct: true,
          label:
            "Kekurangan hujan mungkin lebih ringan daripada bila El Nino datang sendirian, tetapi kemarau yang lebih kering tetap mungkin terjadi.",
        },
      ],
    },
  },
};

export default item;
