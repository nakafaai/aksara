import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "testing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mahasiswa yang membaca empat kali memang mengingat paling banyak, sehingga perkiraan mereka tepat.",
        },
        {
          correct: false,
          label:
            "Mahasiswa yang mengingat tiga kali lebih rendah hati, sehingga mereka sengaja memberi perkiraan yang rendah.",
        },
        {
          correct: true,
          label:
            "Rasa lancar karena membaca ulang membuat mahasiswa merasa lebih siap daripada yang ditunjukkan hasil tes satu minggu.",
        },
        {
          correct: false,
          label:
            "Perkiraan mahasiswa tidak berhubungan dengan cara belajar, karena setiap orang menilai dirinya secara berbeda.",
        },
        {
          correct: false,
          label:
            "Mahasiswa yang membaca empat kali sengaja melebih-lebihkan perkiraannya agar terlihat pandai di depan peneliti.",
        },
      ],
    },
  },
};

export default item;
