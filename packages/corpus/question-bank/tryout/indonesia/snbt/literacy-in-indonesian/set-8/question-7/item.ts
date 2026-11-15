import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "symbol",
  },
  stimulus: "last-newsstand",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nama-nama itu orang yang masih berutang kepadanya, dan coretan menandai utang yang sudah lunas, didukung oleh uang pas yang diserahkan Pak Darto.",
        },
        {
          correct: true,
          label:
            "Nama-nama itu pelanggan tetap yang ia layani, dan coretan menandai yang sudah tidak datang lagi, didukung oleh percakapan bahwa Pak Darto datang karena Pak Harun selalu membawa koran.",
        },
        {
          correct: false,
          label:
            "Nama-nama itu pelanggan tetap yang ia layani, dan coretan menandai yang sudah tidak datang lagi, didukung oleh sopir bus yang pergi tanpa melirik koran.",
        },
        {
          correct: false,
          label:
            "Nama-nama itu koran yang akan berhenti terbit, dan coretan menandai koran yang sudah berhenti, didukung oleh kabar bahwa Pagi Raya berhenti cetak bulan depan.",
        },
        {
          correct: false,
          label:
            "Nama-nama itu pelanggan tetap, dan coretan menandai pelanggan yang beralih membaca berita di ponsel, didukung oleh ucapan sopir bus tentang ponselnya.",
        },
      ],
    },
  },
};

export default item;
