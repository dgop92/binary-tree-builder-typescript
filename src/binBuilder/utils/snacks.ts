import * as Snackbar from "node-snackbar";

export function showErrorMessage({
  text,
  duration = 5000,
}: {
  text: string;
  duration?: number;
}) {
  Snackbar.show({
    text: text,
    backgroundColor: "#ef5350",
    textColor: "#fff",
    pos: "bottom-right",
    showAction: false,
    duration: duration,
  });
  (document.querySelector(
    ".snackbar-container p"
  ) as HTMLParagraphElement)!.style.fontWeight = "700";
}
