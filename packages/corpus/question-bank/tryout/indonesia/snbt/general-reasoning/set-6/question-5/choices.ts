import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Basketball participation increases at every grade level",
      value: false,
    },
    {
      label: "Dance has fewer participants than singing in every grade",
      value: false,
    },
    {
      label: "Painting participation increases at every grade level",
      value: false,
    },
    {
      label: "In every grade level, singing is the least popular hobby",
      value: false,
    },
    {
      label:
        "Acting is the least popular among students because it always has the fewest participants at every level",
      value: true,
    },
  ],
  id: [
    {
      label: "Jumlah peminat basket meningkat pada setiap jenjang kelas",
      value: false,
    },
    {
      label:
        "Peminat seni tari lebih sedikit daripada menyanyi di setiap kelas",
      value: false,
    },
    {
      label: "Jumlah peminat melukis meningkat pada setiap jenjang kelas",
      value: false,
    },
    {
      label:
        "Di setiap jenjang kelas, menyanyi menjadi kegemaran yang paling sedikit peminatnya",
      value: false,
    },
    {
      label:
        "Seni peran paling tidak diminati siswa karena pesertanya selalu paling sedikit pada setiap jenjangnya",
      value: true,
    },
  ],
};

export default choices;
