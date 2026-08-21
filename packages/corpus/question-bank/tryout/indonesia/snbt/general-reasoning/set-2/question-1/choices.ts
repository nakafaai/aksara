import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Neue Studierende suchen nach privaten Universitäten mit umfassender Ausstattung",
      value: false,
    },
    {
      label:
        "Eine gute Dozentenqualität kann die Zahl neuer Studierender erhöhen",
      value: false,
    },
    {
      label:
        "Neue Studierende entscheiden sich für private Universitäten mit geringen Kosten",
      value: false,
    },
    {
      label:
        "Eine gute Universität verfügt über gute Dozenten und angemessene Einrichtungen",
      value: false,
    },
    {
      label:
        "Neue Studierende werden sich dennoch für eine gute Privatuniversität entscheiden, auch wenn diese teuer ist",
      value: true,
    },
  ],
  en: [
    {
      label:
        "New students look for private universities with complete facilities",
      value: false,
    },
    {
      label:
        "Good lecturer quality can increase the number of new students enrolling",
      value: false,
    },
    {
      label: "New students choose private universities with low costs",
      value: false,
    },
    {
      label: "A good university has good lecturers and adequate facilities",
      value: false,
    },
    {
      label:
        "New students will still choose a good private university even if it is expensive",
      value: true,
    },
  ],
  id: [
    {
      label:
        "Mahasiswa baru mencari perguruan tinggi swasta dengan fasilitas yang lengkap",
      value: false,
    },
    {
      label:
        "Kualitas dosen yang baik dapat meningkatkan banyaknya mahasiswa baru yang mendaftar",
      value: false,
    },
    {
      label:
        "Mahasiswa baru memilih perguruan tinggi swasta yang biayanya murah",
      value: false,
    },
    {
      label:
        "Perguruan tinggi yang baik memiliki dosen yang baik dan fasilitas yang memadai",
      value: false,
    },
    {
      label:
        "Mahasiswa baru akan tetap memilih perguruan tinggi swasta yang baik meskipun biayanya mahal",
      value: true,
    },
  ],
};

export default choices;
