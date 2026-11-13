import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "mercury-gold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menjadikan kadar merkuri total dalam air sebagai ukuran bahaya, padahal bahaya bagi warga bergantung pada metilmerkuri yang sampai ke daging ikan.",
        },
        {
          correct: false,
          label:
            "salah membaca data air, sebab kadar merkuri total di rawa hilir sebenarnya lebih tinggi daripada di titik dekat tambang.",
        },
        {
          correct: false,
          label:
            "hanya memperhatikan ikan pemangsa, padahal ikan pemakan tumbuhan di hilir juga sudah melampaui batas yang dipakai tim.",
        },
        {
          correct: false,
          label:
            "mengabaikan bahwa ikan hanya ditangkap pada satu musim kemarau sehingga data tim belum mewakili musim hujan.",
        },
        {
          correct: false,
          label:
            "melupakan bahwa memasak dan menggoreng ikan tidak menurunkan kadar metilmerkuri yang terikat pada protein daging.",
        },
      ],
    },
  },
};

export default item;
