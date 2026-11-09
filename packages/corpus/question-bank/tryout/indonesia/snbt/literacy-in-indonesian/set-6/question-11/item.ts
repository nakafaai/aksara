import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pengelola menilai kartu tujuan melalui kelompok pembanding, catatan pertemuan, dan masukan peserta, lalu melanjutkan uji dengan revisi tanpa mengklaim perubahan nilai semester.",
        },
        {
          correct: false,
          label:
            "Pengelola program teman belajar menilai kartu tujuan untuk setiap pertemuan melalui masukan pihak terdampak saja, tanpa membandingkan hasil pengukuran.",
        },
        {
          correct: false,
          label:
            "Pengelola program teman belajar menilai kartu tujuan untuk setiap pertemuan melalui data pembanding saja, dengan pengalaman pihak terdampak ditempatkan di luar keputusan.",
        },
        {
          correct: false,
          label:
            "Pengelola program teman belajar menilai kartu tujuan untuk setiap pertemuan melalui data dan masukan pihak terdampak, lalu menjadikan uji singkat cukup untuk penerapan tetap.",
        },
        {
          correct: false,
          label:
            "Pengelola program teman belajar menilai kartu tujuan untuk setiap pertemuan terutama melalui definisi istilah, sedangkan perubahan yang diusulkan hanya menjadi latar bacaan.",
        },
      ],
    },
  },
};

export default item;
