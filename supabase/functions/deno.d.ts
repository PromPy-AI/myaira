// Minimal declarations for checking this dependency-free Edge Function with tsc.
declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): unknown;
};
