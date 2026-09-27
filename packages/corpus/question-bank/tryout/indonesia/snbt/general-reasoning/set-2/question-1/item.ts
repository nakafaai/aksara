import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mahasiswa baru mencari perguruan tinggi swasta dengan fasilitas yang lengkap",
        },
        {
          isCorrect: false,
          label:
            "Kualitas dosen yang baik dapat meningkatkan banyaknya mahasiswa baru yang mendaftar",
        },
        {
          isCorrect: false,
          label:
            "Mahasiswa baru memilih perguruan tinggi swasta yang biayanya murah",
        },
        {
          isCorrect: true,
          label:
            "Mahasiswa baru akan tetap memilih perguruan tinggi swasta yang baik meskipun biayanya mahal",
        },
        {
          isCorrect: false,
          label:
            "Perguruan tinggi yang baik memiliki dosen yang baik dan fasilitas yang memadai",
        },
      ],
    },
  },
};

export default item;
