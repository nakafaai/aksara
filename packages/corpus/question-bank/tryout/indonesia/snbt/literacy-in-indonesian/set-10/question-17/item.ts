import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "bike-share",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah sepeda yang rusak atau hilang di kota itu selama bulan Juni saja",
        },
        {
          correct: false,
          label:
            "Pendapat warga tentang warna dan bentuk sepeda sewa yang dipakai",
        },
        {
          correct: false,
          label:
            "Jumlah perjalanan harian di kota itu selama bulan Januari saja",
        },
        {
          correct: true,
          label:
            "Jumlah perjalanan bulanan di kota serupa yang sepedanya tetap 200",
        },
        {
          correct: false,
          label:
            "Jumlah penduduk kota itu menurut sensus terakhir yang dilakukan",
        },
      ],
    },
  },
};

export default item;
