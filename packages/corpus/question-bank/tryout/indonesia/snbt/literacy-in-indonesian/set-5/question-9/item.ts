import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "social-media-age",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "remaja akan selalu jujur tentang usianya ketika membuat akun di platform besar",
        },
        {
          correct: true,
          label:
            "rancangan platform, bukan hanya usia pengguna, ikut menentukan bahaya bagi remaja",
        },
        {
          correct: false,
          label:
            "orang dewasa tidak boleh lagi memilih beranda yang disusun oleh algoritma",
        },
        {
          correct: false,
          label:
            "perundungan daring hanya terjadi pada akun media sosial yang bersifat publik",
        },
        {
          correct: false,
          label:
            "platform kecil tanpa tim moderasi kemungkinan akan ditutup oleh negara",
        },
      ],
    },
  },
};

export default item;
