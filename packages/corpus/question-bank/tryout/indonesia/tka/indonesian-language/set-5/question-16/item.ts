import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "old-letter",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Wulan memenangi lomba geografi berkat atlas tua",
        },
        {
          correct: false,
          label: "Hasan berhasil menjuarai lomba geografi pada tahun 1987",
        },
        {
          correct: false,
          label:
            "Bu Rina melarang siswa menyelipkan surat di buku perpustakaan",
        },
        {
          correct: true,
          label:
            "nasihat dalam surat lama mengubah cara belajar Wulan, lalu Wulan meneruskannya kepada peminjam berikutnya",
        },
        {
          correct: false,
          label:
            "menghafal daftar ibu kota dari ponsel adalah cara belajar terbaik",
        },
      ],
    },
  },
};

export default item;
