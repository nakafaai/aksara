import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mahasiswa baru mencari perguruan tinggi swasta dengan fasilitas yang lengkap",
        },
        {
          correct: false,
          label:
            "Kualitas dosen yang baik dapat meningkatkan banyaknya mahasiswa baru yang mendaftar",
        },
        {
          correct: false,
          label:
            "Mahasiswa baru memilih perguruan tinggi swasta yang biayanya murah",
        },
        {
          correct: true,
          label:
            "Mahasiswa baru akan tetap memilih perguruan tinggi swasta yang baik meskipun biayanya mahal",
        },
        {
          correct: false,
          label:
            "Perguruan tinggi yang baik memiliki dosen yang baik dan fasilitas yang memadai",
        },
      ],
    },
  },
};

export default item;
