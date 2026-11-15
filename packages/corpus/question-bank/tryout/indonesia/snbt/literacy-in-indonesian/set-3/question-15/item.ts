import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "online-loan",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Pemahaman warga tentang biaya pinjaman tetap ada gunanya.",
        },
        {
          column: 2,
          label:
            "Survei terhadap peminjam yang gagal bayar sudah cukup untuk menunjukkan akar masalahnya.",
        },
        {
          column: 2,
          label:
            "Aplikasi sebaiknya diwajibkan menampilkan total biaya dalam rupiah di satu halaman.",
        },
        {
          column: 1,
          label:
            "Bunga per hari yang tampak kecil menjadi jauh lebih besar bila dihitung untuk sebulan.",
        },
        {
          column: 2,
          label:
            "Angka biaya pinjaman Aplikasi Kilat sudah dapat dilihat lengkap sebelum pinjaman disetujui.",
        },
      ],
    },
  },
};

export default item;
