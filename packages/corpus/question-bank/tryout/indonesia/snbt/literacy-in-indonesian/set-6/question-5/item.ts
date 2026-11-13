import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "el-nino-drought",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Prakiraan musim yang menyebut peluang tinggi jarang meleset, sehingga persiapan hampir tidak pernah sia-sia.",
        },
        {
          correct: false,
          label:
            "Keputusan apa pun untuk menghadapi kemarau, termasuk mengganti tanaman di seluruh lahan, sebaiknya diambil sedini mungkin.",
        },
        {
          correct: false,
          label:
            "Kemarau parah di Indonesia hampir selalu didahului oleh pernyataan resmi bahwa El Nino sedang berlangsung.",
        },
        {
          correct: false,
          label:
            "Pejabat daerah dapat mengetahui dengan pasti apakah El Nino akan terjadi sebelum musim kemarau dimulai.",
        },
        {
          correct: true,
          label:
            "Biaya persiapan yang tetap berguna saat kemarau normal lebih kecil daripada kerugian bila persiapan baru dimulai setelah kemarau kering datang.",
        },
      ],
    },
  },
};

export default item;
