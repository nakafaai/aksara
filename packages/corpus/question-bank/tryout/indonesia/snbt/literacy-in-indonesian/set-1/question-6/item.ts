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
            "Ia menolak anggapan bahwa beasiswa memerlukan proses seleksi.",
        },
        {
          correct: false,
          label:
            "Ia menyarankan agar beasiswa dibagikan secara merata kepada semua siswa.",
        },
        {
          correct: true,
          label:
            "Ia mengakui kebutuhan seleksi itu, tetapi menunjukkan bahwa sekolah dapat memenuhinya tanpa mencantumkan peringkat di rapor setiap siswa.",
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
