import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "default-choice",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Karyawan itu tidak tahu bahwa mereka boleh mengubah iuran, karena perusahaan tidak memberitahukannya." },
        { correct: false, label: "Karyawan itu kehilangan minat menabung, karena program tabungan pensiun kini diikuti hampir semua orang." },
        { correct: false, label: "Karyawan itu lebih suka menabung di bank lain, karena bunga program perusahaan turun setelah pendaftaran otomatis." },
        { correct: true, label: "Karyawan itu mungkin membaca iuran $$3\\%$$ sebagai anjuran perusahaan, atau menunda usaha untuk mengubahnya." },
        { correct: false, label: "Karyawan itu dipaksa perusahaan menurunkan iuran menjadi $$3\\%$$, sehingga tidak ada yang dapat memilih $$6\\%$$." },
      ],
    },
  },
};

export default item;
