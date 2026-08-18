import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Every school snack is unsafe", value: false },
    {
      label: "Children should replace their main meals with snacks",
      value: false,
    },
    {
      label:
        "Microbiological and chemical safety can be ignored when a snack provides enough energy",
      value: false,
    },
    {
      label:
        "Energy is the only nutritional consideration when choosing a snack",
      value: false,
    },
    {
      label:
        "Safe, nutritionally balanced school snacks can contribute to children's nutrient intake",
      value: true,
    },
  ],
  id: [
    { label: "Semua jajanan sekolah tidak aman", value: false },
    {
      label: "Anak sebaiknya mengganti makanan utama dengan jajanan",
      value: false,
    },
    {
      label:
        "Keamanan mikrobiologis dan kimia boleh diabaikan jika jajanan menyediakan cukup energi",
      value: false,
    },
    {
      label:
        "Energi merupakan satu-satunya pertimbangan gizi saat memilih makanan selingan",
      value: false,
    },
    {
      label:
        "Makanan selingan sekolah yang aman dan bergizi seimbang dapat membantu memenuhi asupan zat gizi anak",
      value: true,
    },
  ],
};

export default choices;
