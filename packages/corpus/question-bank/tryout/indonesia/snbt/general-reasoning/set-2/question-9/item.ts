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
            "Pohon mangga di kebun Pak Udin berbuah lebat setelah dipupuk kompos buatannya. Jadi, tanaman cabai di kebun itu juga akan berbuah lebat jika dipupuk dengan kompos yang sama.",
        },
        {
          correct: true,
          label:
            "Hampir semua lagu daerah dari masa sebelum kemerdekaan yang masih dinyanyikan sampai sekarang bermelodi sederhana dan mudah diingat. Jadi, pada masa itu sebagian besar lagu daerah memang bermelodi sederhana dan mudah diingat.",
        },
        {
          correct: false,
          label:
            "Catatan sebuah pelabuhan dari abad ke-19 memuat setiap kapal yang berlabuh beserta bahan lambungnya, dan sebagian besar kapal dalam catatan itu berlambung kayu ulin. Jadi, pada abad itu sebagian besar kapal yang berlabuh di sana berlambung kayu ulin.",
        },
        {
          correct: false,
          label:
            "Kelurahan yang paling banyak memiliki pos ronda adalah kelurahan dengan kasus pencurian terbanyak. Jadi, pos ronda justru mengundang pencuri datang ke kelurahan itu.",
        },
        {
          correct: false,
          label:
            "Sejak kantin sebuah sekolah berhenti menjual minuman manis, nilai rata-rata ujian siswanya naik. Jadi, berhenti menjual minuman manis membuat siswa sekolah itu lebih pintar.",
        },
      ],
    },
  },
};

export default item;
