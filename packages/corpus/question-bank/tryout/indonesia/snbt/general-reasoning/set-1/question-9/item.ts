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
            "Sebuah perusahaan taksi mengundi $$15$$ dari $$30$$ sopirnya untuk mengikuti pelatihan. Bulan berikutnya, keluhan penumpang terhadap ke-$$15$$ sopir itu turun, sedangkan keluhan terhadap sopir lainnya tetap. Jadi, pelatihan itu mengurangi keluhan.",
        },
        {
          correct: false,
          label:
            "Survei di sebuah stasiun menunjukkan bahwa $$80\\%$$ penumpang setuju tarif kereta dinaikkan. Jadi, sebagian besar warga kota setuju tarif kereta dinaikkan.",
        },
        {
          correct: true,
          label:
            "Sebuah rumah sakit memilih $$20$$ perawat yang paling sering terlambat pada bulan lalu, lalu memberi mereka teguran tertulis. Bulan ini, rata-rata keterlambatan ke-$$20$$ perawat itu turun tajam. Jadi, teguran tertulis itu membuat perawat jauh lebih tepat waktu.",
        },
        {
          correct: false,
          label:
            "Sebuah bengkel memilih $$30$$ pompa air yang paling boros listrik pada bulan lalu, lalu mengundi separuhnya untuk dibersihkan. Bulan ini, pemakaian listrik kedua kelompok turun hampir sama besar. Jadi, pembersihan itu tidak banyak menghemat listrik.",
        },
        {
          correct: false,
          label:
            "Sejak lampu lalu lintas dipasang di sebuah perempatan, kecelakaan di perempatan itu turun. Jadi, lampu lalu lintas itu menurunkan kecelakaan.",
        },
      ],
    },
  },
};

export default item;
