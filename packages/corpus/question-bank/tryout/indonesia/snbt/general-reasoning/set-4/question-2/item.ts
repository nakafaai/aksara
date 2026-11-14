import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "itik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pemeriksaan tembolok itik pada pertengahan musim menunjukkan bahwa wereng hanya sebagian kecil dari isinya, jauh lebih sedikit daripada keong dan biji gulma yang ikut dimakan.",
        },
        {
          correct: true,
          label:
            "Semua petak yang dilepasi itik ditanam serentak lebih awal, sedangkan sebagian besar petak tanpa itik ditanam tiga pekan kemudian, dan sejak sebelum ada itik, petak yang ditanam belakangan di desa itu lebih sering melewati ambang wereng.",
        },
        {
          correct: false,
          label:
            "Pada petak yang dilepasi itik, hitungan wereng tertinggi selama musim itu rata-rata $$7$$ ekor per rumpun, tidak jauh di bawah ambang yang membuat sebuah petak wajib disemprot.",
        },
        {
          correct: false,
          label:
            "Pemilik petak tanpa itik menghitung wereng dua kali seminggu pada rumpun yang dipilih acak, dengan cara yang sama seperti pemilik petak yang dilepasi itik.",
        },
        {
          correct: false,
          label:
            "Sebagian pemilik petak tanpa itik mengatakan bahwa mereka tidak memelihara itik karena khawatir itiknya dicuri dan tidak punya waktu untuk menggembalakannya.",
        },
      ],
    },
  },
};

export default item;
