interface ISessionConfig {
  secret: string | undefined;
  encodedKey: Uint8Array<ArrayBufferLike>;
}

const sessionSecret: string | undefined = process.env.SESSION_SECRET;

export const SESSION_CONFIG: ISessionConfig = {
  secret: sessionSecret,
  encodedKey: new TextEncoder().encode(sessionSecret),
};
