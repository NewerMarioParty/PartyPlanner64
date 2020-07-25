/**
 * Cache a set of <input> elements, one for each accept type so the last
 * accessed directory hopefully remains consistent between filetypes.
 */
let _inputs: { [acceptTypes: string]: HTMLInputElement };

/** Map of handlers, to detect/prevent double handlers. */
let _handlers: { [acceptTypes: string]: EventHandler } = {};

type EventHandler = (event: Event) => void;

export function openFile(acceptTypes: string = "", callback: EventHandler) {
  let inputs = _inputs;
  if (!inputs)
    inputs = _inputs = {};

  let typeKey = acceptTypes || "default";
  let inputEl = inputs[typeKey];
  if (!inputEl) {
    inputEl = inputs[typeKey] = document.createElement("input");
    inputEl.type = "file";
  }
  inputEl.accept = acceptTypes;

  // Handle cancellation, which gives us no notice.
  if (_handlers[typeKey]) {
    inputEl.removeEventListener("change", _handlers[typeKey]);
    delete _handlers[typeKey];
  }

  let closuredCallback = (event: Event) => {
    delete _handlers[typeKey];
    inputEl.removeEventListener("change", closuredCallback);

    callback(event);

    // Chrome won't fire the change event for the same file twice unless value is cleared.
    (inputEl as any).value = null;
  };

  _handlers[typeKey] = closuredCallback;
  inputEl.addEventListener("change", closuredCallback);

  inputEl.click();
}
