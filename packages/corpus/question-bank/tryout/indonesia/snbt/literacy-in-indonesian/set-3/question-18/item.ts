import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "village-tourism",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Upacara syukur panen sebaiknya digelar lebih sering untuk wisatawan.",
        },
        {
          correct: true,
          label:
            "Pariwisata memberi penghasilan baru dan membuat sebagian anak muda pulang.",
        },
        {
          correct: false,
          label:
            "Jumlah pengunjung perlu dibatasi agar rumah adat tidak rusak.",
        },
        {
          correct: false,
          label: "Lahan parkir bus sebaiknya dibangun di dekat rumah adat.",
        },
        {
          correct: false,
          label:
            "Wisatawan sebaiknya dilarang menyaksikan semua kegiatan budaya desa.",
        },
      ],
    },
  },
};

export default item;
