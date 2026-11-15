import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "crossing-guard",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia marah kepada Rani, dan rinciannya adalah ia menyimpan potongan koran agar Rani tidak membacanya.",
        },
        {
          correct: true,
          label:
            "Ia terguncang oleh kejadian sore itu dan tidak sanggup menceritakannya, dan rinciannya adalah potongan koran tentang kecelakaan yang ia simpan bertahun-tahun di lacinya.",
        },
        {
          correct: false,
          label:
            "Ia lupa pada janjinya, dan rinciannya adalah ia baru datang setelah kereta jam lima lewat.",
        },
        {
          correct: false,
          label:
            "Ia malu karena terlambat, dan rinciannya adalah berita yang memuji penjaga dari pos terdekat.",
        },
        {
          correct: false,
          label:
            "Ia lelah karena kehujanan, dan rinciannya adalah seragamnya yang basah, sedangkan kejadian di perlintasan tidak berhubungan dengan diamnya.",
        },
      ],
    },
  },
};

export default item;
