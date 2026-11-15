import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "text-structure",
  },
  stimulus: "tide-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bait itu menutup puisi dengan kesimpulan bahwa jam ponsel lebih tepat daripada tanda-tanda alam.",
        },
        {
          correct: true,
          label:
            "Bait itu menjadi peralihan dari kenangan masa kecil di kampung ke kehidupan aku di kota, dan menyiapkan ucapan ayah di akhir dengan menunjukkan bahwa jam yang tepat tidak mengajarkan kapan harus bertindak.",
        },
        {
          correct: false,
          label:
            "Bait itu menjadi peralihan dari kenangan ke masa kini, dan menyiapkan ucapan ayah di akhir dengan menunjukkan bahwa aku sudah pandai membaca pasang hidupnya.",
        },
        {
          correct: false,
          label:
            "Bait itu mengulang isi bait ketiga tentang jadwal makan dan tidur, sehingga tidak menambah makna baru.",
        },
        {
          correct: false,
          label:
            "Bait itu menjadi peralihan ke masa kini, dan menyiapkan kabar bahwa ayah berhenti melaut karena laut di kampungnya tidak lagi pasang.",
        },
      ],
    },
  },
};

export default item;
