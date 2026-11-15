import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "mengadakan pelatihan motivasi selama sebulan bagi atlet terbaik menjelang kejuaraan nasional",
        },
        {
          correct: true,
          label:
            "mendukung klub setempat agar menggelar kompetisi rutin bertahun-tahun, lalu memilih regu dari pemain yang terbentuk di sana",
        },
        {
          correct: false,
          label:
            "mendatangkan pemain berprestasi dari daerah lain beberapa bulan menjelang kejuaraan agar regunya langsung kuat",
        },
        {
          correct: false,
          label:
            "membangun satu gedung olahraga besar dan menunggu bakat muncul dengan sendirinya",
        },
        {
          correct: false,
          label:
            "memutar rekaman pertandingan 1958 di sekolah-sekolah setiap pekan agar siswa bersemangat seperti para pemain dulu",
        },
      ],
    },
  },
};

export default item;
