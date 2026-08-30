import { Effect, FileSystem, Path, Schema } from "effect";

const ManifestSchema = Schema.fromJsonString(
  Schema.Struct({
    license: Schema.String,
    name: Schema.String,
    version: Schema.String,
  })
);
const LICENSE_PATTERN = /^licen[cs]e(?:[.-]|$)/iu;

/** A bundled dependency cannot provide complete license evidence. */
export class NoticeError extends Schema.TaggedError<NoticeError>()(
  "NoticeError",
  {
    cause: Schema.Unknown,
    path: Schema.String,
    stage: Schema.Literals(["license", "manifest"]),
  }
) {}

interface PackageLocation {
  readonly name: string;
  readonly root: string;
}

/** Finds the closest installed package that owns one bundle input. */
const packageLocation = (input: string, root: string, path: Path.Path) => {
  const absolute = path.resolve(root, input);
  const matches = [
    ...absolute.matchAll(
      /[/\\]node_modules[/\\]((?:@[^/\\]+[/\\])?[^/\\]+)[/\\]/gu
    ),
  ];
  const match = matches.at(-1);
  const name = match?.[1]?.replaceAll("\\", "/");
  if (match === undefined || name === undefined) {
    return;
  }
  return {
    name,
    root: absolute.slice(0, (match.index ?? 0) + match[0].length - 1),
  } satisfies PackageLocation;
};

/** Reads one exact installed package manifest and all of its license files. */
const readNotice = Effect.fn("AksaraCliNotice.read")(function* (
  location: PackageLocation
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const manifestPath = path.join(location.root, "package.json");
  const manifestSource = yield* fileSystem
    .readFileString(manifestPath)
    .pipe(
      Effect.mapError(
        (cause) =>
          new NoticeError({ cause, path: manifestPath, stage: "manifest" })
      )
    );
  const manifest = yield* Schema.decodeEffect(ManifestSchema)(
    manifestSource
  ).pipe(
    Effect.mapError(
      (cause) =>
        new NoticeError({ cause, path: manifestPath, stage: "manifest" })
    )
  );
  if (manifest.name !== location.name) {
    return yield* new NoticeError({
      cause: `Expected ${location.name}, received ${manifest.name}`,
      path: manifestPath,
      stage: "manifest",
    });
  }
  const entries = yield* fileSystem
    .readDirectory(location.root)
    .pipe(
      Effect.mapError(
        (cause) =>
          new NoticeError({ cause, path: location.root, stage: "license" })
      )
    );
  const licenseFiles = entries
    .filter((entry) => LICENSE_PATTERN.test(entry))
    .sort();
  if (licenseFiles.length === 0) {
    return yield* new NoticeError({
      cause: "No license file found",
      path: location.root,
      stage: "license",
    });
  }
  const licenses = yield* Effect.forEach(licenseFiles, (entry) => {
    const licensePath = path.join(location.root, entry);
    return fileSystem
      .readFileString(licensePath)
      .pipe(
        Effect.mapError(
          (cause) =>
            new NoticeError({ cause, path: licensePath, stage: "license" })
        )
      );
  });
  return {
    license: manifest.license,
    licenses,
    name: manifest.name,
    version: manifest.version,
  };
});

/** Generates complete notices from the exact third-party bundle inputs. */
export const generateBundledNotice = Effect.fn("AksaraCliNotice.generate")(
  function* (inputs: readonly string[], root: string) {
    const path = yield* Path.Path;
    const locations = new Map<string, PackageLocation>();
    for (const input of inputs) {
      const location = packageLocation(input, root, path);
      if (location !== undefined) {
        locations.set(location.root, location);
      }
    }
    const notices = yield* Effect.forEach([...locations.values()], readNotice, {
      concurrency: "unbounded",
    });
    notices.sort((left, right) =>
      `${left.name}@${left.version}`.localeCompare(
        `${right.name}@${right.version}`
      )
    );
    const sections = notices.map(
      (notice) =>
        `${notice.name} ${notice.version}\nLicense: ${notice.license}\n\n${notice.licenses
          .map((license) => license.trim())
          .join("\n\n")}`
    );
    return `Bundled dependency notices\n\nThis file is generated from the exact esbuild bundle inputs.\n\n${sections.join(
      "\n\n================================================================\n\n"
    )}\n`;
  }
);
