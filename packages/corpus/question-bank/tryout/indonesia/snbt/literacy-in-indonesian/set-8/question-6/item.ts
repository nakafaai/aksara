import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "school-distance",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Aturan jarak sebaiknya dihapus dan diganti dengan seleksi nilai seperti dulu.",
        },
        {
          correct: false,
          label:
            "Aturan jarak sudah berjalan sempurna sehingga tidak perlu diubah sama sekali.",
        },
        {
          correct: true,
          label:
            "Aturan jarak perlu dipertahankan, tetapi kelemahannya di lapangan harus diatasi.",
        },
        {
          correct: false,
          label:
            "Aturan jarak hanya cocok diterapkan di kecamatan yang memiliki tiga SMA negeri.",
        },
        {
          correct: false,
          label:
            "Aturan jarak lebih adil jika setiap keluarga boleh memilih alamatnya sendiri.",
        },
      ],
    },
  },
};

export default item;
