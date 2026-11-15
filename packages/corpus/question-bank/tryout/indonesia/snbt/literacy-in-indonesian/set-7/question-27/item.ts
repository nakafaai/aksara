import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "testing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kelompok yang membaca empat kali unggul $$5$$ poin persen pada tes lima menit dan tetap unggul $$16$$ poin persen pada tes satu minggu, jadi membaca ulang lebih baik untuk ujian seminggu lagi.",
        },
        {
          correct: false,
          label:
            "Kelompok yang membaca empat kali unggul $$5$$ poin persen pada tes lima menit dan tertinggal $$16$$ poin persen pada tes satu minggu, jadi keduanya sama baiknya karena selisihnya saling menutup.",
        },
        {
          correct: true,
          label:
            "Kelompok yang membaca empat kali unggul $$5$$ poin persen pada tes lima menit tetapi tertinggal $$16$$ poin persen pada tes satu minggu, jadi mengganti satu sesi membaca dengan mengingat lebih menguntungkan untuk ujian seminggu lagi.",
        },
        {
          correct: false,
          label:
            "Kelompok yang membaca empat kali tertinggal $$5$$ poin persen pada tes lima menit dan $$16$$ poin persen pada tes satu minggu, jadi membaca ulang selalu kalah.",
        },
        {
          correct: false,
          label:
            "Kelompok yang membaca empat kali unggul $$12$$ poin persen pada tes lima menit tetapi tertinggal $$21$$ poin persen pada tes satu minggu, jadi mengganti satu sesi membaca dengan mengingat lebih menguntungkan.",
        },
      ],
    },
  },
};

export default item;
