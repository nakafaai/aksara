import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "parallel-reasoning",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Di sebuah desa, petani yang mulai memakai benih unggul pada musim tanam lalu mencatat hasil panen musim itu yang lebih tinggi daripada petani yang tetap memakai benih biasa. Penyuluh menyimpulkan bahwa benih unggul menaikkan hasil panen.",
        },
        {
          correct: false,
          label:
            "Pada hari-hari ketika penjualan payung di sebuah pasar tinggi, angka keterlambatan bus kota di kota itu juga tinggi. Seorang pengamat menyimpulkan bahwa ramainya penjualan payung membuat bus kota terlambat.",
        },
        {
          correct: false,
          label:
            "Tiga pelanggan menulis ulasan daring yang mengeluhkan rasa kopi sebuah kedai yang setiap hari melayani sekitar dua ratus pembeli. Pemilik kedai menyimpulkan bahwa sebagian besar pelanggannya tidak menyukai kopinya.",
        },
        {
          correct: true,
          label:
            "Di sebuah RW, dari rumah yang kini menyimpan alat pemadam api, $$30\\%$$ pernah mengalami kebakaran kecil dalam lima tahun terakhir, sedangkan dari rumah lainnya hanya $$5\\%$$. Ketua RW menyimpulkan bahwa alat pemadam membuat penghuni lengah sehingga lebih sering terjadi kebakaran.",
        },
        {
          correct: false,
          label:
            "Pada bulan ketika kantin sekolah mengganti piring plastik dengan piring kaca, sekolah juga melarang botol minum plastik sekali pakai. Sesudahnya, sampah plastik sekolah berkurang separuh. Kepala sekolah menyimpulkan bahwa penggantian piring itulah yang memangkas sampah plastik.",
        },
      ],
    },
  },
};

export default item;
