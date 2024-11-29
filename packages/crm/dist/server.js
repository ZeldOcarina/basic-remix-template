var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// build/server/index.js
var server_exports = {};
__export(server_exports, {
  assets: () => serverManifest,
  assetsBuildDirectory: () => assetsBuildDirectory,
  basename: () => basename,
  entry: () => entry,
  future: () => future,
  isSpaMode: () => isSpaMode,
  mode: () => mode,
  publicPath: () => publicPath,
  routes: () => routes
});
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, Scripts } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function App() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "data:image/x-icon;base64,AA" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Hello world!" }),
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
var ABORT_DELAY, entryServer, route0, serverManifest, mode, assetsBuildDirectory, basename, future, isSpaMode, publicPath, entry, routes;
var init_server = __esm({
  "build/server/index.js"() {
    "use strict";
    ABORT_DELAY = 5e3;
    entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: handleRequest
    }, Symbol.toStringTag, { value: "Module" }));
    route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: App
    }, Symbol.toStringTag, { value: "Module" }));
    serverManifest = { "entry": { "module": "/assets/entry.client-CZMX6QFx.js", "imports": ["/assets/components-uAmwa0Ck.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-D-AeiLAo.js", "imports": ["/assets/components-uAmwa0Ck.js"], "css": [] } }, "url": "/assets/manifest-ff06f78a.js", "version": "ff06f78a" };
    mode = "production";
    assetsBuildDirectory = "build/client";
    basename = "/";
    future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false, "unstable_routeConfig": false };
    isSpaMode = false;
    publicPath = "/";
    entry = { module: entryServer };
    routes = {
      "root": {
        id: "root",
        parentId: void 0,
        path: "",
        index: void 0,
        caseSensitive: void 0,
        module: route0
      }
    };
  }
});

// server.ts
import { createRequestHandler } from "@remix-run/express";
import express from "express";
var viteDevServer = process.env.NODE_ENV === "production" ? null : await import("vite").then(
  (vite) => vite.createServer({
    server: { middlewareMode: true }
  })
);
var app = express();
app.use(
  viteDevServer ? viteDevServer.middlewares : express.static("build/client")
);
var build = viteDevServer ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build") : await Promise.resolve().then(() => (init_server(), server_exports));
app.all("*", createRequestHandler({ build }));
app.listen(3e3, () => {
  console.log("App listening on http://localhost:3000");
});
