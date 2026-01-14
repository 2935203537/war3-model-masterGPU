export {};

declare global {
  interface Window {
    war3Desktop: {
      selectFolder: () => Promise<null | {
        root: string;
        files: { abs: string; rel: string; ext: string; base: string }[];
        models: string[];
      }>;
      selectMap: () => Promise<null | {
        root: string;
        files: { abs: string; rel: string; ext: string; base: string }[];
        models: string[];
      }>;
      readFile: (absPath: string) => Promise<Uint8Array>;
      getWar3Dir: () => Promise<string>;
      setWar3Dir: (dir: string) => Promise<string>;
      selectExportFolder: () => Promise<string | null>;
      exportFiles: (outRoot: string, items: { src: string; rel: string }[]) => Promise<boolean>;
      writeFile: (absPath: string, data: Uint8Array) => Promise<boolean>;
    };
  }
}
