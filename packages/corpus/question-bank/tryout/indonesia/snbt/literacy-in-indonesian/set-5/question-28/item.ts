import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "growth-mindset",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Guru meminta siswa yang gagal mencoba cara lain, lalu menunjukkan satu contoh strategi yang belum dipakai siswa itu.",
        },
        {
          correct: true,
          label:
            'Guru berkata, "Tidak apa-apa, yang penting kamu sudah berusaha keras," kepada siswa yang $$3$$ kali mengulang cara yang sama dan tetap salah, lalu beralih ke siswa lain.',
        },
        {
          correct: false,
          label:
            'Guru berkata, "Kamu memang pintar," kepada siswa yang mendapat nilai sempurna.',
        },
        {
          correct: false,
          label:
            "Guru menjelaskan bahwa otak membentuk sambungan baru ketika dilatih.",
        },
        {
          correct: false,
          label:
            "Guru memberi jam pelajaran tambahan kepada siswa yang tertinggal.",
        },
      ],
    },
  },
};

export default item;
