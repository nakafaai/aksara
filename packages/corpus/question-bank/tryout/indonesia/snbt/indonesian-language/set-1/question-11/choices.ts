import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label:
        "Berhenti sejenak dari kegiatan dan menyaksikan keindahan matahari terbenam",
      value: true,
    },
    {
      label: "Menghentikan seluruh pekerjaan untuk beristirahat sepanjang hari",
      value: false,
    },
    {
      label: "Mengabaikan keadaan sekitar agar dapat menikmati hidup",
      value: false,
    },
    {
      label: "Menjauhi semua kesibukan di kota secara permanen",
      value: false,
    },
    {
      label: "Menghitung waktu yang tersisa sebelum malam",
      value: false,
    },
  ],
};

export default choices;
