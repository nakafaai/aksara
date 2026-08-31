import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang pameran sains keliling untuk menyusun penjelasan yang final dan dianggap berlaku untuk semua masa.",
        },
        {
          isCorrect: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang pameran sains keliling untuk menyusun penjelasan yang yang menghapus perbedaan tujuan kedua sumber.",
        },
        {
          isCorrect: true,
          label:
            "Siswa membandingkan dua jenis sumber tentang pameran sains keliling untuk menyusun penjelasan yang terbatas dan dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang pameran sains keliling untuk menyusun penjelasan yang dengan mengikuti sumber yang lebih baru secara otomatis.",
        },
        {
          isCorrect: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang pameran sains keliling untuk menyusun penjelasan yang tanpa menilai asal serta tujuan tiap sumber.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
