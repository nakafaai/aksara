import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Participants report that mentors provide useful career feedback.",
      value: false,
    },
    {
      label: "Enrollment in the mentoring program increased during the year.",
      value: false,
    },
    {
      label:
        "An independent audit confirms the reported contract-renewal rate.",
      value: false,
    },
    {
      label:
        "Contracts renew automatically unless employees submit an opt-out form.",
      value: true,
    },
    {
      label:
        "Several departments plan to offer more mentoring sessions next year.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Peserta menyatakan bahwa pendamping memberikan masukan karier yang berguna.",
      value: false,
    },
    {
      label: "Jumlah pendaftar program pendampingan meningkat sepanjang tahun.",
      value: false,
    },
    {
      label:
        "Audit independen membenarkan angka perpanjangan kontrak yang dilaporkan.",
      value: false,
    },
    {
      label:
        "Kontrak diperpanjang otomatis kecuali pekerja mengirim formulir penolakan.",
      value: true,
    },
    {
      label:
        "Beberapa departemen berencana menambah sesi pendampingan tahun depan.",
      value: false,
    },
  ],
};

export default choices;
