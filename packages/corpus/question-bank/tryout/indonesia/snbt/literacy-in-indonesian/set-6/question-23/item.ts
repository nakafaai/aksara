import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "pranata-mangsa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Segera membajak dan menyemai, karena letak Lintang Waluku sudah menunjukkan saatnya.",
        },
        {
          correct: false,
          label:
            "Meninggalkan pranata mangsa sepenuhnya dan hanya menunggu siaran prakiraan resmi.",
        },
        {
          correct: false,
          label:
            "Menyemai sebagian benih sekarang dan sisanya pada tanggal yang sama tahun depan.",
        },
        {
          correct: false,
          label:
            "Mengikuti jadwal tanam daerah lain yang musim hujannya sudah dimulai.",
        },
        {
          correct: true,
          label:
            "Menunda menyemai sampai tanda dari makhluk hidup dan keadaan tanah menunjukkan hujan benar-benar datang, sambil mencocokkannya dengan prakiraan resmi.",
        },
      ],
    },
  },
};

export default item;
