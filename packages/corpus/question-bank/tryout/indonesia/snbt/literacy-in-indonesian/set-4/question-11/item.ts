import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "class-size",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Project STAR dilakukan di Amerika Serikat, sehingga hasilnya sama sekali tidak dapat dipakai untuk sekolah dasar di Indonesia.",
        },
        {
          correct: false,
          label:
            "Pembagian acak dalam Project STAR membuat siswa yang kebetulan lebih pandai masuk ke kelas kecil.",
        },
        {
          correct: false,
          label:
            "Hasil pembatasan kelas di California lebih kecil daripada hasil yang dicapai Project STAR.",
        },
        {
          correct: false,
          label:
            "Biaya kelas kecil mungkin lebih mahal daripada biaya mengejar ketertinggalan membaca siswa di kelas-kelas berikutnya.",
        },
        {
          correct: true,
          label:
            "Project STAR membandingkan kelas $$13$$ sampai $$17$$ siswa dengan kelas $$22$$ sampai $$25$$ siswa, bukan kelas $$36$$ dengan $$24$$ siswa.",
        },
      ],
    },
  },
};

export default item;
