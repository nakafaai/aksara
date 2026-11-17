import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/polymer",
  domain: "chemistry",
  key: "lesson.chemistry.polymer",
  kind: "lesson",
  routeSlugs: {
    en: "polymer",
    id: "polimer",
    de: "polymere",
    ms: "polimer",
  },
  sections: ["polymerisation"],
  slug: "polymer",
  translations: {
    en: {
      description: "Compare polymerisations and vulcanise rubber.",
      title: "Polymer",
    },
    id: {
      description: "Bandingkan jenis polimerisasi dan vulkanisasi karet.",
      title: "Polimer",
    },
    de: {
      description: "Unterscheide Polyreaktionen und vulkanisiere Kautschuk.",
      title: "Polymere",
    },
    ms: {
      description: "Bandingkan jenis pempolimeran dan pemvulkanan getah.",
      title: "Polimer",
    },
  },
};

export default lesson;
