import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rekonstruksi sejarah yang bertanggung jawab membandingkan sumber, menjelaskan sudut pandang, dan mempertahankan bahan asli untuk penilaian ulang.",
        },
        {
          correct: true,
          label:
            "Jadwal, foto, surat penggunaan ruang, dan wawancara tambahan menunjukkan perpindahan berlangsung bertahap.",
        },
        {
          correct: false,
          label:
            "Perbedaan ingatan dapat muncul karena setiap narasumber menyaksikan bagian peristiwa yang berbeda.",
        },
        {
          correct: false,
          label:
            "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya.",
        },
        {
          correct: false,
          label:
            "Dokumen tertulis membuktikan bahwa kesaksian lisan tidak memiliki nilai sejarah.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
