import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "argument-structure",
  },
  stimulus: "class-ranking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia menolak anggapan bahwa beasiswa memerlukan proses seleksi berdasarkan prestasi.",
        },
        {
          correct: false,
          label:
            "Ia menyarankan agar beasiswa dibagikan secara merata kepada semua siswa yang membutuhkan.",
        },
        {
          correct: true,
          label:
            "Ia mengakui seleksi itu perlu, tetapi menyebut daftarnya dapat disusun tanpa dicantumkan di rapor setiap siswa.",
        },
        {
          correct: false,
          label:
            "Ia menganggap seleksi beasiswa sebagai satu-satunya alasan yang sah untuk mempertahankan peringkat di rapor.",
        },
        {
          correct: false,
          label:
            "Ia mengusulkan agar penerima beasiswa ditentukan oleh penilaian wali kelas tanpa kriteria tertulis.",
        },
      ],
    },
  },
};

export default item;
