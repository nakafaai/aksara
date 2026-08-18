import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Students entering University $$P$$ belong to the withdrawal category",
      value: true,
    },
    {
      label: "Every student entering University $$P$$ completed school",
      value: false,
    },
    {
      label: "No withdrawn student enters University $$P$$ in the same intake",
      value: false,
    },
    {
      label: "Every withdrawn student joins the school's job-placement program",
      value: false,
    },
    {
      label: "The completed-school and withdrawal categories do not overlap",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Siswa yang masuk Universitas $$P$$ termasuk kategori mengundurkan diri",
      value: true,
    },
    {
      label: "Setiap siswa yang masuk Universitas $$P$$ telah lulus sekolah",
      value: false,
    },
    {
      label:
        "Tidak ada siswa yang mengundurkan diri lalu masuk Universitas $$P$$ pada angkatan yang sama",
      value: false,
    },
    {
      label:
        "Setiap siswa yang mengundurkan diri mengikuti program penempatan kerja sekolah",
      value: false,
    },
    {
      label:
        "Kategori lulus dan kategori mengundurkan diri tidak saling tumpang tindih",
      value: false,
    },
  ],
};

export default choices;
