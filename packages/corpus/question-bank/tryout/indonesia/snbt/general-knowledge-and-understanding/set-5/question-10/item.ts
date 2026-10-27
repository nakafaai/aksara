import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dokumen tertulis membuktikan bahwa kesaksian lisan tidak memiliki nilai sejarah.",
        },
        {
          correct: false,
          label:
            "Arsip harus memilih narasumber yang paling yakin dan menghapus rekaman yang tidak sesuai.",
        },
        {
          correct: false,
          label:
            "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah.",
        },
        {
          correct: true,
          label:
            "Tafsir terbaik saat ini tetap terbuka untuk koreksi karena sumber sejarah tidak merekam masa lalu secara sempurna.",
        },
        {
          correct: false,
          label:
            "Tafsir yang telah dimuat dalam pameran tidak boleh diubah meskipun ditemukan bukti baru.",
        },
      ],
    },
  },
};

export default item;
